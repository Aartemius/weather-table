import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import styles from './SelectComponent.module.css';

export interface SelectComponentProps {
  options: string[] | number[];
  label: string;
  onChange: (value: any) => void;
  multiple?: boolean;
  defaultValue?: string | number | [] | string[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  label,
  onChange,
  multiple,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <FormControl
      fullWidth
      className={styles.formWrap}
      style={{
        minWidth: '160px',
        width: 'fit-content',
        marginTop: '0',
        marginRight: '10px',
      }}
    >
      <InputLabel style={{ color: 'rgba(255,255,255, .6)' }}>{label}</InputLabel>
      <Select
        value={ value }
        onChange={ handleChange }
        label={ label }
        multiple={ multiple }
        placeholder={ label }
        variant="outlined"
        style={{
          borderRadius: '20px',
          backgroundColor: '#515151',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={{color: '#515151'}}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;