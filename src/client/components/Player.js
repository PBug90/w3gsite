import React from 'react';
import {getRace, getUnit, getBuilding, getItem, getUpgrade} from '../mappings';
import GameEntityIcon from 'components/GameEntityIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
export default function Player(props) {
  const {player} = props;
  const units = Object.keys(player.units.summary).map((unitId) => (
    <GameEntityIcon number="3" iconpath={`/static/acidbomb.png`} />
  ));
  const buildings = Object.keys(player.buildings.summary).map((buildingId) => (
    <GameEntityIcon number="3" iconpath={`/static/acidbomb.png`} />
  ));
  const items = Object.keys(player.items.summary).map((itemId) => (
    <GameEntityIcon number="3" iconpath={`/static/acidbomb.png`} />
  ));
  const upgrades = Object.keys(player.upgrades.summary).map((upgradeId) => (
    <GameEntityIcon number="3" iconpath={`/static/acidbomb.png`} />
  ));
  return (
    <ListItem>
      <Avatar>{getRace(player.raceDetected)}</Avatar>
      <ListItemText primary={player.name} secondary={`${player.apm} apm`} />
    </ListItem>
  );
}
