
import { ChartContainer } from '@/components/chart';
import React, { useEffect } from 'react';

import Box from '@mui/material/Box';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export function ChartHolder(props: any) {

  return (
    <React.Fragment>
      <ChartContainer chartType={props.chartType} chartData={props.chartData} chartTitle={props.chartTitle} />
    </React.Fragment >
  );
}

export function LeftSectionForm(props: any) {
  const [age, setAge] = React.useState('');
  const [chartType, setchartType] = React.useState('LINE');

  const handleChangeChart = (event: SelectChangeEvent) => {
    setchartType(event.target.value);
    props.handleChange(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1">Report</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select"
          value={chartType}
          label="Age"
          onChange={handleChangeChart}
        >
          <MenuItem value={'PIE'}>PIE</MenuItem>
          <MenuItem value={'LINE'}>LINE</MenuItem>
          <MenuItem value={'BAR'}>BAR</MenuItem>
          <MenuItem value={'TABLE'}>TABLE</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2">Analysis</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label3">Column</InputLabel>
        <Select
          labelId="demo-simple-select-label3"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label4">Rows</InputLabel>
        <Select
          labelId="demo-simple-select-label4"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label5">Terms</InputLabel>
        <Select
          labelId="demo-simple-select-label5"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label6">Fliters</InputLabel>
        <Select
          labelId="demo-simple-select-label6"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        </Select>
      </FormControl>
    </Box>
  );
}
