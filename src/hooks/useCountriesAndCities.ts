import { City, Country } from '@/types/common';
import { useEffect, useState } from 'react';

export const useCountriesAndCities = (countryName?: string) => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesNames, setCountriesNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();

        const ct: City[] = [];
        const cn: Country[] = [];
        setCountriesNames(data.countries.map((country: Country) => country.name));

        data.countries.forEach((country: Country) => {
          if (!countryName || (countryName && countryName === country.name)) {
            cn.push(country);
            country.cities.forEach((city: City) => {
              ct.push(city);
            });
          }
        });

        setCities(ct);
        setCountries(cn);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [countryName]);

  return {cities, countries, countriesNames};
};
