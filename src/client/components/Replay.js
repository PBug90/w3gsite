import React from 'react';
import Player from './Player';
import Team from './Team';
import APMTimed from './APMTimed';

export default function Replay(props) {
  const {replay} = props;
  let currentTeam = -1;
  let teams = [];
  let currentPlayers = [];
  replay.players.forEach((player) => {
    if (player.teamid !== currentTeam) {
      if (currentPlayers.length > 0) {
        teams.push(<Team teamid={currentTeam}>{currentPlayers}</Team>);
        currentPlayers = [];
      }
      currentTeam = player.teamid;
    }

    currentPlayers.push(<Player player={player} />);
  });
  if (currentPlayers.length > 0) {
    teams.push(<Team teamid={currentTeam}>{currentPlayers}</Team>);
  }

  return (
    <div>
      {teams}
      <h3>Actions per Minute</h3>
      <APMTimed players={replay.players} apminfo={replay.apm} />
    </div>
  );
}
