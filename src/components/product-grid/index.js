import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import _ from 'lodash';

const useStyles = makeStyles({
  "cardContentHeight": {
    "minHeight": 120,
  },
  "cardImage": {
    "objectFit": "contain"
  }
});

export default ({items}) => {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2}>
      {items.map((item, index) => {
        return <>
          <Grid key={index} item xs={6} md={4}>
            <Card key={`card-${index}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="400"
                  image={item.image_url}
                  title={item.name}
                  className={classes.cardImage}
                />
                <CardContent className={classes.cardContentHeight} key={`card-content-${index}`}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.price["AED"].default_formated}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </>
      })}
    </Grid>
  );
}
