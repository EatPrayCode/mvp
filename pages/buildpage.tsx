import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LeftSectionForm, ChartHolder } from './build';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { DefaultLayout } from '../layouts';
import Button from '@mui/material/Button';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { mockEntry } from '@/mocks/mockpacks';


const drawerWidth = 240;

export default function BuildPage() {

  const [chartType, setchartType] = React.useState('LINE');

  const currentChartData: any = {
    labels: ['Boston', 'Worcester', 'Springfield', 'Lowel', 'Cambridge', 'New Bedford'],
    datasets: [
      {
        label: 'Population',
        data: [
          617594,
          18045,
          153060,
          106519,
          105162,
          95072
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }

    ]
  }

  const parentHandleChange = (e: any) => {
    console.log(e);
    setchartType(e);
  };

  const handleAddTo = (e: any) => {
    addChartToDashboard(e, { chartType, chartData: currentChartData, chartTitle });

  };

  const addChartToDashboard = (dashboard: any, chart: any) => {

    const storageEntry: any = localStorage.getItem('assetMVP');

    let entry: any = storageEntry ? JSON.parse(storageEntry) : mockEntry;

    const dashboardId = dashboard.id;

    let myArray = [...entry.dashboards];

    const objIndex = myArray.findIndex(((obj: any) => obj.id == dashboardId));

    //Log object to Console.
    console.log("Before update: ", myArray[objIndex])

    myArray[objIndex].chartsList.push(chart);

    //Log object to console again.
    console.log("After update: ", myArray[objIndex]);

    const dummy = myArray.map((ele: any) => {
      const obj = {
        chartsList: ele.chartsList,
        id: ele.id,
        title: ele.title,
      }
      return { ...obj };
    });

    const newEntry = { dashboards: dummy, reports: [] };

    // localStorage.setItem('assetMVP', JSON.stringify(mockEntry));
  };

  const [chartTitle, setChartTitle] = React.useState('DEFAULT');

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setChartTitle(event.target.value);
  };

  return (
    <DefaultLayout>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mt: 10 }}>
          <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ToolBarItem>
                  <BasicBreadcrumbs />
                </ToolBarItem>
              </Grid>
              <Grid item xs={8}>
                <ToolBarItem>
                  <div>
                    <TextField
                      label="Name"
                      id="outlined-size-small"
                      size="small"
                      value={chartTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <BasicMenu handleChange={handleAddTo} />
                </ToolBarItem>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>
                  <LeftSectionForm handleChange={parentHandleChange} />
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <ChartHolder chartType={chartType} chartData={currentChartData} chartTitle={chartTitle} />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ToolBarItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export function BasicBreadcrumbs() {
  const router = useRouter();
  const gotoHome = () => {
    router.push(`/`);
  };
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={gotoHome}>
          Home
        </Link>
        <Typography color="text.primary">Build Page</Typography>
      </Breadcrumbs>
    </div>
  );
}

export function BasicMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (e: any, item: any) => {
    setAnchorEl(null);
    props.handleChange(item);
  };


  const entry = mockEntry;
  const dashboardItems = entry.dashboards.map(ele => {
    return ele;
  });
  const reportItems = entry.reports.map(ele => {
    return ele;
  });

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add to Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {dashboardItems?.map((item: any, i: any) => (
          <MenuItem onClick={(e: any) => handleSelect(e, item)}>{item.title}</MenuItem>
        ))}
      </Menu>
    </React.Fragment >
  );
}
