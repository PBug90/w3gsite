import React from 'react';

export default function Team(props) {
  const {teamid} = props;
  return (
    <div>
      <h2>Team {teamid}</h2>
      {props.children}
    </div>
  );
}
