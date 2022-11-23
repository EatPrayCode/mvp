import React from 'react'


import MyBudget from './MyBudget'
import MyFoodTypes from './MyFoodType'
import MyVehicle from './MyVehicle'
import MyInterests from './MyInterests'
import CustomerType from './CustomerType'
import MyPets from './MyPets'
import MyFamilySize from './MyFamilySize'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent } from '@mui/material'

export default function Home() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>

      <Box sx={{ pb: 5, pt: 5 }} ref={ref}>

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          // justifyContent="center"

          style={{ minHeight: '' }}
        >

          <Grid item xs={3}>

            <CustomerType />

            <MyBudget />

            <MyFamilySize />

            <Button size="small" onClick={handleClickOpen}>Extra Info</Button>

          </Grid>

        </Grid>

        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Extra Info</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>

              <MyFoodTypes />

              <MyVehicle />

              <MyPets />

              <MyInterests />

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>

      </Box>

    </React.Fragment>
  )
}
