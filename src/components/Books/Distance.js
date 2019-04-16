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
  state = {
    value: 25
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label">
          Maximum distance: {this.state.value} miles
        </Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          min={1}
          max={50}
          step={1}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Distance.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Distance);
