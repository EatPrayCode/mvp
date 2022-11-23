import * as React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

export default function CustomerType() {

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <Typography id="non-linear-slider" gutterBottom>
        Customer Type
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="web">Family</ToggleButton>
        <ToggleButton value="android">Bachelor</ToggleButton>
        <ToggleButton value="ios">B2B</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

