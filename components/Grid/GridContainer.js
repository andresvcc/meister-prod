/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    // margin: "0 -15px",
    // width: "100%",
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  },
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, className, dev, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className} alignItems="flex-start">
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  dev: PropTypes.bool,
};
