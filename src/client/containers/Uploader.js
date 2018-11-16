import React from 'react';
import uploadReplay from '../actions/uploadReplay';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'user'};
    this.simulateClick = this.simulateClick.bind(this);
    this.uploadReplay = this.uploadReplay.bind(this);
  }

  uploadReplay(e) {
    e.preventDefault();
    if (e.target.files.length <= 0) {
      return;
    }
    const formData = new FormData();
    formData.append('replay', e.target.files[0]);
    this.props.dispatch(uploadReplay(formData));
  }

  simulateClick() {
    this.fileField.click();
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    return (
      <div>
        <Typography variant="display1" gutterBottom>
          Parse a Warcraft III replay file!
        </Typography>
        <Typography variant="headline" gutterBottom>
          Both vanilla w3g and Netease nwg files are supported.
        </Typography>
        <Button variant="contained" color="primary" onClick={this.simulateClick}>
          choose a file
        </Button>
        <input
          hidden
          ref={(c) => {
            this.fileField = c;
          }}
          type="file"
          onChange={this.uploadReplay}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(
  null,
  mapDispatchToProps
)(Uploader);
