import React from 'react';
import mapInformation from '../mapinformation';

/*
WC3 coordinates grid has (0,0) in the center of the map, while
the canvas used here has (0,0) in the top left corner. 
We have to convert the coordinates in order to draw the heatmap properly.
This consists of three steps:
1) Determining the factor that the heatmap image is smaller than the actual ingame playable map
2) Use that ratio to convert the ingame-points of variable range that depends on map size to a point that can be placed on the heatmap
  e.g. heatmap resides in a 500x500 container and map is 8192x8192 units, so coordinates have to be divided by the result of 8192/500
3) Convert the scaled coordinate values to fit into the left top origin based grid used by the heatmap lib
This component allows user input to select a specific time range to display actions that took place in that time frame.
User input is in seconds, while actions will be filtered with millisecond precision.
*/

export default class TimelineMinimap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: null,
      validMap: !!mapInformation.hasOwnProperty(props.map),
      startTime: 0,
      endTime: 20,
      playerIdToColor: this.props.players.reduce((prev, current, index) =>{
        prev[current.id] = current.color
        return prev
    } , {})}
    this.handleChange = this.handleChange.bind(this);
  }

  convertActionCoordinates(xScale, yScale, actions) {
    return actions.map((action) => {
      const x = action.targetX || action.targetAX || action.targetBX;
      const y = action.targetY || action.targetAY || action.targetBY;
      let targetX = x / xScale + this.props.width / 2;
      let targetY = y / yScale;

      if (targetY > 0) {
        targetY = this.props.height / 2 - targetY;
      } else {
        targetY = this.props.height / 2 + -1 * targetY;
      }
      return {x: targetX, y: targetY, playerId: action.playerId, value: 99, radius: 1000};
    });
  }

  componentDidMount() {
    this.updateHeatmap();
  }

  componentDidUpdate() {
    this.updateHeatmap();
  }

  updateHeatmap() {
    if (this.canvas) {
      const actions = this.props.actions.filter(
        (action) =>
          (action.hasOwnProperty('targetX') || action.hasOwnProperty('targetAX')) &&
          action.time >= this.state.startTime * 1000 &&
          action.time <= this.state.endTime * 1000
      );
      const {width, height, image} = mapInformation[this.props.map];
      const xScale = width / this.props.width;
      const yScale = height / this.props.height;
      const convertedActions = this.convertActionCoordinates(xScale, yScale, actions);
      const canvasContext = this.canvas.getContext('2d');

      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      convertedActions.forEach((a2) => {
        canvasContext.fillStyle = this.state.playerIdToColor[a2.playerId];
        canvasContext.fillRect(a2.x, a2.y, 5, 5);
      });
      if (this.state.backgroundImage !== image) {
        this.setState({backgroundImage: image});
      }
    }
  }

  handleChange(e) {
    if (e.target.value === 'advance time by 10 seconds') {
      const {startTime, endTime} = this.state;
      this.setState({
        startTime: startTime + 10,
        endTime: endTime + 10
      });
    } else {
      this.setState({
        [e.target.name]: parseInt(e.target.value, 10)
      });
    }
  }

  render() {
    if (this.state.validMap === false) {
      return <span>Cannot generate heatmap.</span>;
    }

    if(this.props.actions.length === 0){
        return <span>No actions for this replay available.</span>
    }
    const {width, height} = this.props;
    let mapImageSRC = '';
    if (this.state.backgroundImage) {
      mapImageSRC = `${this.state.backgroundImage}`;
    }
    return (
      <div
        style={{
          width,
          height: height + 50,
          position: 'relative'
        }}
      >
        <img style={{width, height}} src={mapImageSRC} />
        <canvas
          ref={(el) => (this.canvas = el)}
          style={{left: 0, top: 0, position: 'absolute'}}
          width={width}
          height={height}
        />
        <input type="hidden" step="10" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
        <input type="hidden" step="10" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
        <input type="button" onClick={this.handleChange} value="advance time by 10 seconds" />
      </div>
    );
  }
}

TimelineMinimap.defaultProps = {
  width: 500,
  height: 500,
  actions: [],
  players: []
};