import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';

function getFormattedTimeByMS(ms) {
  const minutes = ms / 1000 / 60;
  const seconds = (ms / 1000) % 60;
  return `${minutes}:${seconds < 9 ? `0${seconds}` : seconds}`;
}

export default function(props) {
  let {players, apminfo} = props;
  const actionData = [];
  const bars = [];
  let first = true;
  players.forEach((p) => {
    if (first) {
      first = false;
      p.actions.timed.forEach((action, index) => {
        const obj = {};
        players.forEach((pl) => {
          obj[pl.name] = pl.actions.timed[index];
        });
        obj.name = getFormattedTimeByMS(apminfo.trackingInterval * index).toString();
        actionData.push(obj);
      });
    }

    bars.push(<Line dataKey={p.name} stroke={p.color} />);
  });
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={actionData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {bars}
      </LineChart>
    </ResponsiveContainer>
  );
}
