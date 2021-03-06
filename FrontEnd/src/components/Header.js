import React from "react";
import PropTypes from "prop-types";
import LocationSearchInput from "./LocationSearchInput";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  searchButton: {
    marginLeft: 20,
    marginRight: -10
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { origin: "test" };
    this.handleAddressChangeOrigin = this.handleAddressChangeOrigin.bind(this);
    this.handleCoordsChangeOrigin = this.handleCoordsChangeOrigin.bind(this);
    this.handleAddressChangeDest = this.handleAddressChangeDest.bind(this);
    this.handleCoordsChangeDest = this.handleCoordsChangeDest.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleMakeRide = this.handleMakeRide.bind(this);
  }

  handleAddressChangeOrigin(origin) {
    this.setState({ origin: origin });
    this.props.onAddressChangeOrigin(origin);
  }

  handleCoordsChangeOrigin(originCoords) {
    this.setState({ originCoords: originCoords });
    this.props.onCoordsChangeOrigin(origin);
  }

  handleAddressChangeDest(dest) {
    this.setState({ dest: dest });
    this.props.onAddressChangeDest(dest);
  }

  handleCoordsChangeDest(destCoords) {
    this.setState({ destCoords: destCoords });
    this.props.onCoordsChangeDest(destCoords);
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
    this.props.onDateChange(event.target.value);
  }

  handleTimeChange(time) {
    this.setState({ time: time.target.value });
    this.props.onTimeChange(time.target.value);
  }

  handleMakeRide() {
    console.log(this.state.origin);
    this.props.handleMakeRide(
      this.state.origin,
      this.state.dest,
      this.state.time,
      this.state.date
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h4"
              color="inherit"
              noWrap
            >
              <b>HitchRide</b>
            </Typography>

            <div className={classes.grow} />
            <div>
              <LocationSearchInput
                onAddressChange={this.handleAddressChangeOrigin}
                onCoordsChange={this.handleCoordsChangeOrigin}
              />
            </div>
            <div>
              <LocationSearchInput
                onAddressChange={this.handleAddressChangeDest}
                onCoordsChange={this.handleCoordsChangeDest}
              />
            </div>
            <div className={classes.search}>
              <InputBase
                id="Date"
                placeholder="Departure Date"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                type="date"
                required={true}
                onChange={this.handleDateChange}
              />
            </div>
            <div className={classes.search}>
              <InputBase
                id="Time"
                placeholder="Departure Time"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                type="time"
                required={true}
                onChange={this.handleTimeChange}
              />
            </div>
            <button
              className={classes.searchButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.onSearch}
            >
              <img src={require("./icons/search.svg")} />
            </button>
            <button
              className={classes.makeRide}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.makeRide}
            >
              <img src={require("./icons/plus.svg")} />
            </button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
