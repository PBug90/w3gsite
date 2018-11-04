import React from 'react';

export default function Player(props) {
  const {player} = props;
  return (
    <h1>
      {player.name} <small>{player.detectedRace}</small>
    </h1>
  );
}
