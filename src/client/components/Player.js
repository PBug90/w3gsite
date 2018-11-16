import React from 'react';
import {getRace, getUnit, getBuilding, getItem, getUpgrade} from '../mappings';

export default function Player(props) {
  const {player} = props;
  const units = Object.keys(player.units.summary).map((unitId) => (
    <li>
      {getUnit(unitId)} {player.units.summary[unitId]}
    </li>
  ));
  const buildings = Object.keys(player.buildings.summary).map((buildingId) => (
    <li>
      {getBuilding(buildingId)} {player.buildings.summary[buildingId]}
    </li>
  ));
  const items = Object.keys(player.items.summary).map((itemId) => (
    <li>
      {getItem(itemId)} {player.items.summary[itemId]}
    </li>
  ));
  const upgrades = Object.keys(player.upgrades.summary).map((upgradeId) => (
    <li>
      {getUpgrade(upgradeId)} {player.upgrades.summary[upgradeId]}
    </li>
  ));
  return (
    <h3>
      <small>{getRace(player.detectedRace)} </small>
      {player.name}
      <ul>{units}</ul>
      <ul>{buildings}</ul>
      <ul>{items}</ul>
      <ul>{upgrades}</ul>
    </h3>
  );
}
