import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    width: "30vw",
    margin: "auto"
  },
  slider: {
    padding: "22px 0px"
  }
};

class Distance extends React.Component {
  // state = {
  //   miles: 25
  // };

  // handleChange = (event, miles) => {
  //   this.setState({ miles });
  // };

  render() {
    const { classes, miles, distanceChange } = this.props;

    return (
      <div className={classes.root}>
        <Typography id="label">Maximum distance: {miles} miles</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={miles}
          min={1}
          max={50}
          step={1}
          aria-labelledby="label"
          onChange={distanceChange}
        />
      </div>
    );
  }
}

Distance.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Distance);
