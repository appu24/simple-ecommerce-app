import React, { useState, useEffect } from 'react';
import {
  Button,
  ClickAwayListener,
  Container,
  Menu,
  MenuItem,
  MenuList,
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import {
  GrSort,
  GrFilter
} from 'react-icons/gr';
import { makeStyles } from '@material-ui/core/styles';

import _ from 'lodash';

const useStyles = makeStyles({
  "footer": {
    "position": "fixed",
    "zIndex": 1,
    "bottom": 0,
    "height": "50px",
    "background": "white",
    "width": "100%",
    "display": "flex",
    "boxShadow": "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
  },
  "btnActions": {
    "width": "100%",
    "borderRadius": "0px"
  }
});

const FilterItems = ({open, title, items, value, onClose, onAction, anchorEl}) => {

  const onSelect = (e, key) => {
    let v = e.target.value;
    let checked = e.target.checked;
    let filterValue = value;
    if(value && checked) {
      filterValue[key].push(v);
    } else {
      _.remove(filterValue[key], (fv) => (v === fv));
    }
    return onAction(filterValue);
  };

  return <>
    <Menu
      open={open}
      onClose={onClose}
      keepMounted
      anchorEl={anchorEl}
    >
      <Grid container spacing={2}>
        <FormControl component="fieldset">
          <FormGroup>
            {items.map((item, index) => {
              return <MenuItem>
                <Grid container item xs={12} md={3} justify="space-between" alignItems="center">
                  <FormLabel component="legend">
                    {item.icon} {item.title}
                  </FormLabel>
                  <Grid container xs={6}>
                    <MenuList>
                      {item.values && item.values.map((v, vIndex) => {
                        return <MenuItem>
                          <Grid item xs={12} justify="flex-start" alignItems="flex-start">
                            <FormControlLabel
                              control={<Checkbox
                                checked={(value[item.value].indexOf(v) !== -1)}
                                onChange={(e) => onSelect(e, item.value)}
                                value={v}
                                name={v}
                              />}
                              label={v}
                            />
                          </Grid>
                        </MenuItem>
                      })}
                    </MenuList>
                  </Grid>
                </Grid>
              </MenuItem>
            })}
          </FormGroup>
        </FormControl>
      </Grid>
    </Menu>
  </>
}

const SortItems = ({open, title, items, value, onClose, onAction, anchorEl}) => {

  const onSelect = (e, value) => {
    onAction(e.target.value);
  };

  return <>
    <Menu
      open={open}
      onClose={onClose}
      keepMounted
      anchorEl={anchorEl}
    >
      <Grid container spacing={2}>
        <FormControl component="fieldset">
          <RadioGroup aria-label={title} name={title} value={value} onChange={onSelect}>
            {items.map((item, index) => {
              return <MenuItem>
                <Grid container item xs={12} md={3} justify="space-between" alignItems="center">
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={<>
                        {item.icon} {item.title}
                      </>
                    }
                  />
                </Grid>
              </MenuItem>
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Menu>
  </>
}

export default ({sortValue, setSortValue, sortActionItems, filterActionItems, filterValue, setFilterValue, stateChange, setStateChage}) => {
  const classes = useStyles();

  const [showSortActions, setShowSortActions] = useState(false);
  const [showFilterActions, setShowFilterActions] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const sortActions = (event) => {
    setShowFilterActions(false);
    setShowSortActions(true);
    setAnchorEl(event.currentTarget);
  };

  const filterActions = (event) => {
    setShowSortActions(false);
    setShowFilterActions(true);
    setAnchorEl(event.currentTarget);
  }

  const onClose = () => {
    setShowSortActions(false);
    setShowFilterActions(false);
    setAnchorEl(null);
  }

  const onFilterChange = (value) => {
    setFilterValue(value);
    setStateChage(stateChange + 1);
  };

  useEffect(() => {
    console.log("values - ", sortValue, filterValue);
  }, [sortValue, filterValue]);

  return (
    <Container component="div" className={classes.footer}>
      <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2}>
        <Grid container item xs={6} justify="center">
          <Button className={classes.btnActions} onClick={sortActions}>
            <GrSort /> Sort
            <SortItems
              open={showSortActions}
              title={"Sort"}
              items={sortActionItems}
              value={sortValue}
              onClose={onClose}
              onAction={(value) => setSortValue(value)}
              anchorEl={anchorEl}
            />
          </Button>
        </Grid>
        <Grid container item xs={6} justify="center">
          <Button className={classes.btnActions} onClick={filterActions}>
            <GrFilter /> Filter
            <FilterItems
              open={showFilterActions}
              title={"Filter"}
              items={filterActionItems}
              value={filterValue}
              onClose={onClose}
              onAction={onFilterChange}
              anchorEl={anchorEl}
            />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
