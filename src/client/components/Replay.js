import React from 'react';
import Player from './Player';
import Team from './Team';
import APMTimed from './APMTimed';
import GeneralGameInfo from './GeneralGameInfo';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
export default function Replay(props) {
  const {replay} = props;
  let currentTeam = -1;
  let teams = [];
  let currentPlayers = [];
  replay.players.forEach((player) => {
    if (player.teamid !== currentTeam) {
      if (currentPlayers.length > 0) {
        if (teams.length > 0) {
          teams.push(
            <div>
              <Divider />
              <Team teamid={currentTeam}>{currentPlayers}</Team>
            </div>
          );
        } else {
          teams.push(
            <div>
              <Team teamid={currentTeam}>{currentPlayers}</Team>
            </div>
          );
        }
        currentPlayers = [];
      }
      currentTeam = player.teamid;
    }

    currentPlayers.push(<Player player={player} />);
  });
  if (currentPlayers.length > 0) {
    teams.push(
      <div>
        <Divider />
        <Team teamid={currentTeam}>{currentPlayers}</Team>
      </div>
    );
  }

  return (
    <div>
      <h3>General</h3>
      <GeneralGameInfo replay={replay} />
      <h3>Players</h3>
      <List component="nav">{teams}</List>
      <h3>Actions per Minute</h3>
      <APMTimed players={replay.players} apminfo={replay.apm} />
    </div>
  );
}
