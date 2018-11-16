import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {compose} from 'redux';
import ReactJson from 'react-json-view';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Replay from 'components/Replay';
import Uploader from 'containers/Uploader';
import LoadingIndicator from 'components/LoadingIndicator';

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

const styles = (theme) => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(850 + theme.spacing.unit * 3 * 2)]: {
      width: 850,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  jsonPaper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'user'};
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes, upload} = this.props;
    const {value} = this.state;
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>{upload.uploading ? <LoadingIndicator /> : <Uploader />}</Paper>
        {upload.replay && (
          <Paper className={classes.jsonPaper}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab value="user" label="User View" />
              <Tab value="json" label="JSON" />
              <Tab value="errors" label="Errors" />
            </Tabs>
            {value === 'user' && (
              <TabContainer>
                <Replay replay={upload.replay} />{' '}
              </TabContainer>
            )}
            {value === 'json' && (
              <TabContainer>
                <ReactJson src={upload.replay} />
              </TabContainer>
            )}
            {value === 'errors' && <TabContainer>{upload.error && <span>{upload.error}</span>}</TabContainer>}
          </Paper>
        )}
      </main>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

function mapStateToProps(state) {
  return {upload: state.upload};
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(HomeLayout);
