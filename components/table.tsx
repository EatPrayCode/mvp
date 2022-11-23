import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Boston', 617594, 6.0, 24, 4.0),
  createData('Worcester', 18045, 9.0, 37, 4.3),
  createData('Springfield', 153060, 16.0, 24, 6.0),
  createData('Lowel', 106519, 3.7, 67, 4.3),
  createData('Cambridge', 105162, 16.0, 49, 3.9),
  createData('New Bedford', 95072, 16.0, 49, 3.9),
];

export default function BasicTable(props: any) {
  const chartTitle = props.chartTitle;
  return (
    <React.Fragment>
      {chartTitle}
      <TableContainer>
        <Table sx={{}} aria-label="Simple Table">
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell align="right">Population</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
