'use client';
import { Context } from '@/context/ContextContainer';
import { City } from '@/types/common';
import { BarChart } from '@mui/x-charts';
import {
  FC,
  useContext,
  useEffect,
  useState
} from 'react';

const TemperatureGraphics: FC = () => {
  const context = useContext(Context);
  const [chosenCity, setChosenCity] = useState<object | null>(null);

  useEffect(() => {
    if (Object.keys(context?.city as City | {} || {}).length !== 0) {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${context?.city.lat}&longitude=${context?.city.lng}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=GMT`)
      .then(response => response.json())
      .then(data => {
        const weekAvgTemperatures = [0,0,0,0,0,0,0];
        weekAvgTemperatures.forEach((day, i) => {
          weekAvgTemperatures[i] = (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2;
        })
        setChosenCity(weekAvgTemperatures);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }, [context?.city])

  return (
    <>
      {chosenCity && Object.keys(context?.city as City).length !== 0 &&
        <div style={{
          width: '38%',
          marginRight: '2%',
          height: 'fit-content',
          boxSizing: 'border-box',
          padding: '20px',
          borderRadius: '30px',
          background: 'rgba(0,0,0, .55)',
        }}>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }]}
            series={[{ data: chosenCity as number[], label: 'Degrees Celsius' }]}
            height={300}
          />
        </div>
      }
    </>
  );
};

export default TemperatureGraphics;
