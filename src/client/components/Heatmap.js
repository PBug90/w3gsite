import React from 'react';
import heatmap from 'heatmap.js';
import mapInformation from '../mapInformation';
import PropTypes from 'prop-types';

export default class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: null,
      validMap: false,
      heatmapData: null,
      currentMap: null
    };
  }

  componentDidUpdate() {
    console.log('HI', this.el);
    if (this.el) {
      const config = {
        container: this.el,
        radius: 10,
        maxOpacity: 0.5,
        minOpacity: 0,
        blur: 0.75,
        gradient: {
          '.5': 'blue',
          '.8': 'red',
          '.95': 'white'
        }
      };
      this.heatmapInstance = heatmap.create(config);
    }

    const actions = this.props.actions.filter((action) => action.hasOwnProperty('targetX'));
    console.log(this.state.currentMap, this.props.map, this.state.heatmapData);
    if (mapInformation.hasOwnProperty(this.props.map) && this.state.currentMap !== this.props.map) {
      const {width, height, image} = mapInformation[this.props.map];
      const xScale = width / this.props.width;
      const yScale = height / this.props.height;

      const heatmapData = {
        data: [
          ...actions.map((action) => {
            let targetX = action.targetX / xScale;
            let targetY = action.targetY / yScale;
            if (targetX > 0) {
              targetX += 500 / 2;
            } else {
              targetX = 500 / 2 + targetX;
            }

            if (targetY > 0) {
              targetY = 500 / 2 - targetY;
            } else {
              targetY = 500 / 2 + -1 * targetY;
            }
            return {x: targetX, y: targetY, value: 100};
          })
        ],
        min: 0,
        max: 100
      };
      this.setState({backgroundImage: image, validMap: true, heatmapData, currentMap: this.props.map});
    }
    if (this.state.heatmapData) {
      console.log('updated heatmaInstance!');
      this.heatmapInstance.setData({...this.state.heatmapData});
    }
  }

  componentWillUnmount() {}

  render() {
    if (this.state.validMap === false) {
      return <span>Cannot generate heatmap.</span>;
    }

    return (
      <div
        ref={(el) => (this.el = el)}
        style={{
          width: 500,
          height: 500
        }}
      >
        <img style={{width: 500, height: 500}} src={`${this.state.backgroundImage}`} />
      </div>
    );
  }
}

Heatmap.defaultProps = {
  width: 500,
  height: 500,
  actions: []
};
