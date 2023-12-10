'use client';

import { Stack } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import SelectComponent from "./SelectComponent";
import { useCountriesAndCities } from "@/hooks/useCountriesAndCities";
import { Context } from "@/context/ContextContainer";

const TableFilters: FC = () => {
  const context = useContext(Context);
  const { countriesNames } = useCountriesAndCities();

  const [initialRange, setInitialRange] = useState<number[]>([]);
  const [minTempRange, setMinTempRange] = useState<number[]>(initialRange);
  const [maxTempRange, setMaxTempRange] = useState<number[]>(initialRange);

  useEffect(() => {
    const minTemperature = context?.tableState.minTemp || -80;
    const maxTemperature = context?.tableState.maxTemp || 80;
    const range = [...Array.from(
      { length: maxTemperature - minTemperature + 1 },
      (_, index) => index + minTemperature
    )];
    setInitialRange(range);
    setMinTempRange(range);
    setMaxTempRange(range);
  }, []);

  const handleCountryChange = (value: string[]) => {
    context?.updateTableState({
      ...context.tableState,
      chosenCountries: value,
    });
  };

  const handleMinTemperatureChange = (value: string) => {
    const currentIndex = initialRange.indexOf(Number(value));
    setMaxTempRange(initialRange.slice(currentIndex + 1));
    context?.updateTableState({
      ...context.tableState,
      minTemp: Number(value),
    });
  };

  const handleMaxTemperatureChange = (value: string) => {
    const currentIndex = initialRange.indexOf(Number(value));
    setMinTempRange(initialRange.slice(0, currentIndex));
    context?.updateTableState({
      ...context.tableState,
      maxTemp: Number(value),
    });
  };

  return (
    <Stack
      spacing={2}
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        alignSelf: 'flex-start',
        marginBottom: '30px'
      }}
    >
      <SelectComponent
        options={countriesNames}
        label="Select Country"
        onChange={handleCountryChange}
        multiple
        defaultValue={countriesNames}
      />
      <SelectComponent
        options={minTempRange}
        defaultValue={context?.tableState.minTemp}
        label="Min"
        onChange={handleMinTemperatureChange}
      />
      <SelectComponent
        options={maxTempRange}
        defaultValue={context?.tableState.maxTemp}
        label="Max"
        onChange={handleMaxTemperatureChange}
      />
    </Stack>
  );
};

export default TableFilters;
