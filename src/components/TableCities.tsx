'use client';
import React, {
  FC,
  useContext,
  useState
} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import TableFilters from './TableFilters';
import styles from './TableCities.module.css';
import { City } from '@/types/common';
import { Context } from '@/context/ContextContainer';

const TableCities: FC = () => {
  const context = useContext(Context);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleRowClick = (city: City) => {
    if (selectedCity?.name !== city.name) {
      setSelectedCity(city);
      context?.updateCity({
        ...city,
        lat: city.lat,
        lng: city.lng,
      });
    } else {
      setSelectedCity(null);
      context?.updateCity({} as City);
    }
  };

  return (
    <div
      className={styles.tableWrap}
      style={{ width: Object.keys(context?.city as {}).length === 0 ? '100%' : '60%' }}
    >
      <TableFilters />
      <TableContainer component={Paper} sx={{borderRadius: '20px'}}>
        <Table>
          <TableHead sx={{ background: '#030303', color: '#fff' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: '600' }}>City</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: '600' }}>Temperature Max</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: '600' }}>Temperature Min</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: '600' }}>Wind Direction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {context?.tableState.cities.map((city: City, index: number) => (
              <TableRow
                key={city.name}
                onClick={() => handleRowClick(city)}
                selected={city === selectedCity}
                hover
                sx={{
                  color: '#fff',
                  background: index % 2 ? '#515151' : '#313131',
                  cursor: 'pointer',
                }}
              >
                <TableCell>{city.name}</TableCell>
                <TableCell>{Math.round(city.maxTemperature)}</TableCell>
                <TableCell>{Math.round(city.minTemperature)}</TableCell>
                <TableCell>{city.windDirection}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCities;