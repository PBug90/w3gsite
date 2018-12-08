import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

function GameEntityIcon(props) {
  const {classes} = props;
  return (
    <Badge className={classes.margin} badgeContent={props.number} color="primary">
      <img src={props.iconpath} width="30px" height="30px" />
    </Badge>
  );
}

GameEntityIcon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameEntityIcon);
