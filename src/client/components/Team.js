import React from 'react';

export default function Team(props) {
  const {teamid} = props;
  return <div>{props.children}</div>;
}
