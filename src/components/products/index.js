import React, { useState, useEffect } from 'react';
import _ from "lodash";

import {
  AiOutlineStar,
  AiOutlinePercentage
} from 'react-icons/ai';
import {
  GiHanger
} from 'react-icons/gi';
import {
  BiSortDown,
  BiSortUp
} from 'react-icons/bi';

import Header from '../header'
import Footer from '../footer'
import List from '../list'

import data from '../../data'

export default (props) => {
  const pageLength = 12;
  const dataItems = data.hits;

  const sortActionItems = [
    {
      title: "Popularity",
      value: "popularity",
      icon: <AiOutlineStar />
    }, {
      title: "New Arrival",
      value: "new",
      icon: <GiHanger />
    }, {
      title: "Discount",
      value: "discount",
      icon: <AiOutlinePercentage />
    }, {
      title: "Price - Low to High",
      value: "lowToHigh",
      icon: <BiSortUp />
    }, {
      title: "Price - High to Low",
      value: "highToLow",
      icon: <BiSortDown />
    }
  ];

  const filterActionItems = [
    {
      title: "Color",
      value: "color",
      values: ["Multi", "Purple", "Black", "Grey"]
    }, {
      title: "Brand",
      value: "brand_name",
      values: ["Closet", "Max", "Dillinger", "SunBurn", "Blue Saint", "FreeRun", "Difference of Opinion", "Rena Love", "Campus Sutra", "Realm", "Red Tape", "Boston Club", "Miss Chase", "Young Trendz", "Skult", "Shoexpress", "PAUSE", "Xoyo", "Ngal", "Athena", "XYXX"]
    }
  ];

  const [stateChange, setStateChage] = useState(0);
  const [items, setItems] = useState(dataItems);
  const [sortValue, setSortValue] = useState(_.first(sortActionItems).value);
  const [filterValue, setFilterValue] = useState({
    color: [],
    brand_name: []
  });

  const sort = () => {
    let p = items;

    switch(sortValue) {
      case "new":
        p = _.orderBy(p, (item, index) => {
          return new Date(item.enabled_at).getTime();
        }, "desc");
        break;
      case "discount":
        p = _.orderBy(p, (item, index) => {
          return item.discount_percentage || 0;
        }, "desc");
        break;
      case "lowToHigh":
        p = _.orderBy(p, (item, index) => {
          return (item.price && item.price["AED"] && item.price["AED"].default) || 0;
        });
        break;
      case "highToLow":
        p = _.orderBy(p, (item, index) => {
          return (item.price && item.price["AED"] && item.price["AED"].default) || 0;
        }, "desc");
        break;
      case "popularity":
      default:
        p = _.orderBy(p, "ranking", "desc");
    }
    setItems(p);
  };

  const filter = () => {
    const filterItems = _.map(filterActionItems, "value");
    let applyFilter = false;
    _.forEach(filterItems, (filter, index) => {
      applyFilter = (filterValue[filter].length) || applyFilter;
    });

    if(!applyFilter) {
      setItems(dataItems);
      return
    };

    let filteredData = items;

    filteredData = _.filter(filteredData, (d, i) => {
      let filterColor = [];
      let brandNameFlag = false, colorFlag = false;

      // Checking for items based on color
      if(d["color"] && filterValue.color && filterValue.color.length) {
        filterColor = _.filter(d.color, (color) => filterValue.color.indexOf(color) !== -1);
        colorFlag = (filterColor.length !== 0);
      }

      // Checking for items based on brand
      if(d["brand_name"] && filterValue.brand_name && filterValue.brand_name.length) {
        brandNameFlag = (filterValue.brand_name.indexOf(d.brand_name) !== -1);
      }

      if(filterValue.color.length && filterValue.brand_name.length) {
        return (colorFlag && brandNameFlag);
      }
      return (colorFlag || brandNameFlag);
    });
    console.log("filter items - ", filteredData);

    setItems(filteredData);
  };

  useEffect(() => {
    sort();
  }, [sortValue]);

  useEffect(() => {
    filter();
  }, [filterValue, stateChange])

  return (
    <>
      <Header />
      <List
        items={items}
        pageLength={pageLength}
      />
      <Footer
        sortActionItems={sortActionItems}
        filterActionItems={filterActionItems}
        sortValue={sortValue}
        setSortValue={setSortValue}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        stateChange={stateChange}
        setStateChage={setStateChage}
      />
    </>
  );
};
