import React, { useState, useEffect } from 'react';
import {
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import _ from 'lodash';

const useStyles = makeStyles({
  "header": {
    "minHeight": 120,
    "padding": "10px 0 10px 0"
  },
});

export default (props) => {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Container fixed component="div" className={classes.header}>
      <img src="https://stylishop.com/media/logo/stores/1/logo_3x.png" height="100" />
      {props.children}
    </Container>
  );
}
