import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { DefaultLayout } from '../layouts';
import { BasicTabs } from '../components/dashboard';
import { mockEntry } from '@/mocks/mockpacks';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  height: 100,
  lineHeight: '100px',
}));

export default function Elevation() {
  const storageEntry = localStorage.getItem('assetMVP');
  const entry = storageEntry ? JSON.parse(storageEntry) : mockEntry;

  // const entry = mockEntry;

  return (
    <DefaultLayout>
      <Box sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr' },
                gap: 2,
              }}
            >
              <Item elevation={12}>
                {`${mockEntry.dashboards.length} Dashboards`}
              </Item>
              <Item elevation={12}>
                {`${mockEntry.reports.length} Reports`}
              </Item>
            </Box>
          </Grid>
        </Grid>
        <BasicTabs payload={entry} />
      </Box>
    </DefaultLayout >
  );
}
