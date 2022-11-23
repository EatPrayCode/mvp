import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';

import FolderIcon from '@mui/icons-material/Folder';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Button, Divider } from '@mui/material';
import { ChartHolder } from './build';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const PreviewReport = (props: any) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        {(props?.reportData?.chartsList || []).map((item: any) => (
          <ChartHolder chartType={item.chartType} chartData={item.chartData} chartTitle={item.chartTitle} />
        ))}
      </Container>
    </React.Fragment>
  )
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BasicTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const [selectedDashboard, setSelectedDashboard] = React.useState(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dashboards: any = props.payload.dashboards;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (evt: any, item: any) => {
    setSelectedDashboard(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dashboardsLength = dashboards.length;


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dashboards" {...a11yProps(0)} />
          <Tab label="Reports" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {dashboardsLength}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Your Dashboards
            </Typography>
            <List dense={true}>
              {dashboards?.map((item: any, i: any) => (

                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <VisibilityIcon onClick={(e) => handleClickOpen(e, item)} />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={'Charts/Tables: ' + item.chartsList.length}
                  />
                </ListItem>

              ))}

            </List>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>

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
              {selectedDashboard?.title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <PreviewReport reportData={selectedDashboard} />
      </Dialog>

    </Box>
  );
}
