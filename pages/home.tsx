import { ThreeCircles } from 'react-loader-spinner'
import useAuth from '../hooks/AuthContext'
// components
import { Player } from '@lottiefiles/react-lottie-player';
import PacksCategories from '../components/PacksCategories'

import { useRouter } from 'next/router';
import { withTranslation } from 'react-i18next';
import { DefaultLayout } from '../layouts';
import MyPacksAccordion from '@/components/my-packs-accordion';
import MyDashboardSummary from '@/components/my-dashboard-summary';
import MyAccountStatus from '@/components/my-account-status';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 120,
  lineHeight: '60px',
}));

const HomePage = () => {
  // https://letsrevolutionizetesting.com/challenge
  const { loading } = useAuth()
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ThreeCircles color="red" height={110} width={110} />
      </div>
    )
  }

  // React.useEffect(() => {
  //   fetch("https://letsrevolutionizetesting.com/challenge")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         console.log(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }, [])

  const storageEntry = localStorage.getItem('mrshop');
  const preferences = storageEntry ? JSON.parse(storageEntry) : null;

  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);
  const classNormal = `border-0 border-transparent-100`;
  const classBorder = `border-0 bg-green-100 border-green-300`;
  const classStatusActive = `border-0 bg-green-100 border-green-300`;
  const classStatusInActive = `border-0 bg-red-100 border-red-300`;
  const classSavings = `border-0 bg-green-100 border-green-300`;
  const classSpendings = `border-0 bg-orange-100 border-green-300`;

  if (preferences) {
    return (
      <DefaultLayout>

        <React.Fragment>

          <Grid sx={{ pb: 5, pt: 10, mb: 10 }} container spacing={2}>

            <Grid item xs={12}>
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                }}
              >
                <h2 className="mb-2 font-bold">Welcome User,</h2>
                <Item elevation={2} className={classStatusInActive}>
                  Activate
                </Item>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                  // gap: 2,
                }}
              >
                <Item elevation={2} className={classSavings}>
                  1000 Rs
                </Item>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                  // gap: 2,
                }}
              >
                <Item elevation={2} className={classSpendings}>
                  10000 Rs
                </Item>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                }}
              >
                <MyPacksAccordion preferences={preferences} />
              </Box>
            </Grid>
          </Grid>

        </React.Fragment>

      </DefaultLayout>
    )
  }

  else return (
    <DefaultLayout>
      <div className="flex flex-col h-full items-center justify-center">
        <p className="font-normal text-3xl mt-10">Home</p>
        <h1>Not Set</h1>
      </div>
    </DefaultLayout>
  )
}

export default withTranslation()(HomePage);
