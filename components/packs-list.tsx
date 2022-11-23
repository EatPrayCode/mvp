import * as React from 'react';

import Box from '@mui/material/Box';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Button, Paper, Typography } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EnhancedTable from './PackEdit';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));

export default function PacksList(props: any) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const classNormal = `border-2 border-transparent-100`;
  const classBorder = `border-2 bg-green-100 border-green-300`;
  const { item, deleteItem, selectItem, selectAll } = props;
  const packs = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},];
  const [activeStep, setActiveStep] = React.useState(1);

  const [secondary, setSecondary] = React.useState(true);
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  const url = `https://nextbootstrap.netlify.app/assets/images/profiles/3.jpg`;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pack = {
    title: 'Groceries',
    packId: 'Groceries',
    description: '',
    imageUrl: 'https://freepngimg.com/thumb/grocery/41637-4-groceries-free-hd-image.png',
    periodicity: 'Monthly',
    categories: [],
    items: [],
    type: [],
    templates: []
  };

  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5" component="div">
          List
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={(event) => setSecondary(event.target.checked)}
              />
            }
            label="Show All"
          />
        </FormGroup>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, elevation: 3 }}>
          {props?.allPacks?.map((item: any, i: any) => (

            <Grid item sm={6} xs={12} key={i}>
              <Paper elevation={3} >
                <ListItem alignItems="flex-start"
                  className={item?.selected ? classBorder : classNormal}
                  secondaryAction={
                    <GreenSwitch {...label}
                      onChange={(event) => selectItem(event.target.checked, item)}
                    />
                  }>
                  <ListItemAvatar>
                    <Avatar src={url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item?.title || 'TITLE'}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Description
                        </Typography>
                        <br />
                        <Stack direction="row" spacing={0}>
                          <IconButton color="secondary" onClick={handleClickOpen} aria-label="add an alarm">
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="primary" aria-label="add to shopping cart">
                            <ReadMoreIcon />
                          </IconButton>
                          <Button size="small">Default</Button>
                        </Stack>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Paper>
            </Grid>

          ))}
        </Grid>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {pack.title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <EnhancedTable pack={pack} />
      </Dialog>
    </React.Fragment>
  );
}

