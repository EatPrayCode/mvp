import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Container } from '@mui/material';

export default function MyFoodTypes() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      <Box sx={{ pb: 0, pt: 0 }} ref={ref}>
        <Container maxWidth="xl">
          <Box sx={{ width: '100%' }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Food</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="vegatarian" control={<Radio />} label="Veg" />
                <FormControlLabel value="non-vegatarian" control={<Radio />} label="Non-Veg" />
                <FormControlLabel value="vegan" control={<Radio />} label="Vegan" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}
