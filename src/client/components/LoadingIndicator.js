import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
const styles = (theme) => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const LoadingIndicator = function({classes}) {
  return <CircularProgress className={classes.progress} size={50} />;
};

export default withStyles(styles)(LoadingIndicator);
