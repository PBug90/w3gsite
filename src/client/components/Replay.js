import React from 'react';
import Player from './Player';

export default function Replay(props) {
  const {replay} = props;

  return (
    <div>
      {replay.players.map((player) => (
        <Player key={player.id} player={player} />
      ))}
    </div>
  );
}
