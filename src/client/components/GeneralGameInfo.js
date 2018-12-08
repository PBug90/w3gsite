import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const convertTime = (time) => { //eslint-disable-line
  const seconds = time / 1000;
  const minutes = Math.round(seconds / 60);
  const secondsPart = Math.floor(((seconds / 60.0) % 1) * 60);
  return `${minutes}:${secondsPart < 10 ? `0${secondsPart}` : secondsPart}`;
};

export default function GeneralGameInfo({replay}) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row">
            Matchup
          </TableCell>
          <TableCell>{replay.matchup}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Game Type
          </TableCell>
          <TableCell>{replay.type}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Version
          </TableCell>
          <TableCell>{replay.version}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            TFT
          </TableCell>
          <TableCell>{replay.expansion === true ? 'yes' : 'no'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Game length
          </TableCell>
          <TableCell>{convertTime(replay.duration)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Map
          </TableCell>
          <TableCell>{replay.map.file}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
