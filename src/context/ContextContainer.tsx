import React, {
  createContext,
  FC,
  useEffect,
  useState
} from 'react';
import { City, Country } from '@/types/common';
import { useCountriesAndCities } from '@/hooks/useCountriesAndCities';
import { Typography } from '@mui/material';

interface ContextContainerProps {
  children: React.ReactNode;
}
interface ContextState {
  city: City;
  updateCity: (newValue: City) => void;
  tableState: {
    chosenCountries: Country[];
    cities: City[];
    minTemp: number;
    maxTemp: number;
  };
  updateTableState: (newValue: any) => void;
  cities: City[];
}

export const Context = createContext<ContextState | null>(null);

const ContextContainer: FC<ContextContainerProps> = ({ children }) => {
  const [city, setCity] = useState<City>();
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { cities: defaultCities } = useCountriesAndCities();
  const [tableState, setTableState] = useState({
    chosenCountries: [],
    cities: defaultCities,
    minTemp: -80,
    maxTemp: 80,
  });

  const updateCity = (newValue: City) => {
    setCity(newValue);
  };

  const updateTableState = (newValue: any) => {
    setTableState(newValue);
  };

  useEffect(() => {
    const filteredCities = cities.filter((city: City) => {
      return Math.round(city.minTemperature) >= tableState.minTemp
      && Math.round(city.maxTemperature) <= tableState.maxTemp
      && (tableState.chosenCountries.length ? tableState.chosenCountries.includes(city.country as never) : true)
    })
    setTableState({...tableState, cities: filteredCities});
  }, [
    tableState.chosenCountries,
    tableState.maxTemp,
    tableState.minTemp
  ])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();

        const ct: City[] = [];
        const cn: Country[] = [];

        data.countries.forEach((country: Country) => {
          cn.push(country);
          ct.push(...country.cities);
        });

        const updatedCities: City[] = [];
        await Promise.all(
          ct.map(async (city) => {
            const apiResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true&timezone=GMT`
            );
            const apiData = await apiResponse.json();

            const updatedCity: City = {
              ...city,
              minTemperature: Math.round(apiData.current_weather.temperature) - 2,
              maxTemperature: Math.round(apiData.current_weather.temperature) + 2,
              windDirection: apiData.current_weather.winddirection,
            };
            updatedCities.push(updatedCity);
          })
        );

        setCities(updatedCities);

        const temperatures = updatedCities.reduce((acc, { minTemperature, maxTemperature }) => {
          acc.push(minTemperature as never, maxTemperature as never);
          return acc;
        }, []);

        const minInitialTemperature = Math.min(...temperatures);
        const maxInitialTemperature = Math.max(...temperatures);
        const temperatureRanges = Array.from(
          { length: maxInitialTemperature - minInitialTemperature + 1 },
          (_, index) => index + minInitialTemperature
        );

        setTableState({
          ...tableState,
          cities: updatedCities,
          // comment these lines to toggle initial ranges: static( from -80 to 80 ) or dynamic from api
          minTemp: temperatureRanges[0],
          maxTemp: temperatureRanges[temperatureRanges.length - 1]
          // end of comment
        });


        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  if (isLoading) {
    return(
      <Typography
        variant="h6"
        component="h3"
        style={{
          textAlign: 'center',
          padding: '15px 0',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Context.Provider
      value={{
        city,
        updateCity,
        tableState,
        updateTableState,
        cities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextContainer;
