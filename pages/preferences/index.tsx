import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

import { ThreeCircles } from 'react-loader-spinner'

import { mockGoodsList, mockServicesList, mockFinancesList } from 'mocks/mockpacks';
import PacksList from 'components/packs-list';
import AccountSelect from 'components/account';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useList from '@/hooks/useList';
import useAuth from '@/hooks/AuthContext';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';

const steps = [
  {
    label: 'Enter Basic Info',
    id: '0',
    description: 'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Choose Goods',
    id: '1',
    description: `Try out different ad text to see what brings in the most customers.`,
  },
  {
    label: 'Choose Services',
    id: '2',
    description: `For each ad campaign that you create, you can control how.`,
  },
  {
    label: 'Set Finances',
    id: '3',
    description: 'An ad group contains one or more ads which target a shared set of keywords.',
  },
];

const Preferences = (props: any) => {

  const [goodsList, setGoodsList] = React.useState([]);
  const [servicesList, setServicesList] = React.useState([]);
  const [financesList, setFinancesList] = React.useState([]);

  React.useEffect(() => {
    if (props.netflixOriginals) {
      // const transformedList = netflixOriginals.map(ele => {
      //     return { ...ele, selected: true };
      // });
      // const temp1 = [...netflixOriginals];
      // setGoodsList(temp1);
    }

    // Assigning data (Mock or Real)
    const tempGoods = mockGoodsList;
    const tempServices = mockServicesList;
    const tempFinances = mockFinancesList;

    setGoodsList(tempGoods);
    setServicesList(tempServices);
    setFinancesList(tempFinances);
  }, [props.netflixOriginals]);

  const selectGood = (value: any, item: any) => {
    const newData: any = goodsList.map((ele: any) => {
      if (item.packId === ele?.packId) {
        const packSelected = !ele.selected;
        return { ...ele, selected: packSelected };
      }
      else {
        return { ...ele };
      }
    });
    setGoodsList(newData);
  };

  const selectService = (value: any, item: any) => {
    const newData: any = servicesList.map((ele: any) => {
      if (item.packId === ele?.packId) {
        const packSelected = !ele.selected;
        return { ...ele, selected: packSelected };
      }
      else {
        return { ...ele };
      }
    });
    setServicesList(newData);
  };

  const selectFinance = (value: any, item: any) => {
    const newData: any = financesList.map((ele: any) => {
      if (item.packId === ele?.packId) {
        const packSelected = !ele.selected;
        return { ...ele, selected: packSelected };
      }
      else {
        return { ...ele };
      }
    });
    setFinancesList(newData);
  };

  const selectAllPacks = () => {
    console.log("Not Implemented");
  };

  const router = useRouter();
  const ContinueToFeed = () => {
    router.push(`/home`);
  };
  const HandleStepButtons = (event: any, newValue: any) => {
    setValue(newValue);
    if (newValue === 0) {
      router.push(`/home`);
    }
    else if (newValue === 1) {
      handleBack();
    }
    else if (newValue === 2) {
      handleNext();
    }
  };

  const { loading, user, updateUserPreferences } = useAuth();
  const list = useList(user?.uid)

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ThreeCircles color="red" height={110} width={110} />
      </div>
    )
  }

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      console.log("Save data");
      const Preferences = {
        userGoods: goodsList,
        userServices: servicesList,
        userFinances: financesList,
        userAccount: {}
      };
      localStorage.setItem('mrshop', JSON.stringify(Preferences));
      ContinueToFeed();
      updateUserPreferences('', Preferences);
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [value, setValue] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const [allPacksSelected, setAllPacksSelected] = React.useState(false);
  const goTo = (idx: any) => {
    setActiveStep((prevActiveStep) => idx);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    goTo(newValue);
  };

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <React.Fragment>
      <Box sx={{ pb: 5, pt: 8, bgcolor: 'background.paper' }} ref={ref}>

        <AppBar position="fixed" enableColorOnDark={true}>
          <Container maxWidth="xl">
            <Box sx={{ width: '100%' }}>
              <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                scrollButtons={true}
                allowScrollButtonsMobile
              >
                <Tab label="Account" />
                <Tab label="Goods" />
                <Tab label="Services" />
                <Tab label="Finances" />
              </Tabs>
            </Box>
          </Container>
        </AppBar>

        <React.Fragment>

          <Container maxWidth="xl">
            <Box sx={{ width: '100%' }}>
              {activeStep == 0 && (
                <React.Fragment>
                  <AccountSelect />
                </React.Fragment>
              )}
              {activeStep == 1 && (
                <React.Fragment>
                  <PacksList allPacks={goodsList} userPreferences={props.netflixOriginals} selectItem={selectGood} selectAll={selectAllPacks} />
                </React.Fragment>
              )}
              {activeStep == 2 && (
                <React.Fragment>
                  <PacksList allPacks={servicesList} userPreferences={props.netflixOriginals} selectItem={selectService} selectAll={selectAllPacks} />
                </React.Fragment>
              )}
              {activeStep == 3 && (
                <React.Fragment>
                  {/* <div>Finances</div> */}
                  <PacksList allPacks={financesList} userPreferences={props.netflixOriginals} selectItem={selectFinance} selectAll={selectAllPacks} />
                </React.Fragment>
              )}
            </Box>
          </Container>

        </React.Fragment>

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              HandleStepButtons(event, newValue)
            }}
          >
            <BottomNavigationAction label="Cancel" icon={<ClearIcon />} />
            <BottomNavigationAction label="Back" icon={<ChevronLeftIcon />} />
            <BottomNavigationAction label="Next" icon={<ChevronRightIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </React.Fragment>
  );
}

export default Preferences
