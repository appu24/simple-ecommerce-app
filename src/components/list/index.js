import React, { useState, useEffect } from 'react';
import {
  Container
} from '@material-ui/core';

import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash'

import ItemGrid from '../product-grid'

export default ({items, pageLength}) => {

  const [paginationItems, setPaginationItems] = useState([]);

  useEffect(() => {
    let firstPage = _.slice(items, 0, pageLength);
    setPaginationItems(firstPage);
  }, [items]);

  const fetchItems = () => {
    if(items.length === paginationItems.length) return false;
    const lowerLimitIndex = paginationItems.length;
    const upperLimitIndex = lowerLimitIndex + pageLength;
    const concatItems = _.slice(items, lowerLimitIndex, upperLimitIndex);
    let pageItems = _.concat(paginationItems, concatItems);
    setPaginationItems(pageItems);
  };

  return (
    <Container maxWidth="lg" component="div">
      <InfiniteScroll
        dataLength={paginationItems.length}
        next={fetchItems}
        hasMore={items.length !== paginationItems.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ItemGrid items={paginationItems} />
      </InfiniteScroll>
    </Container>
  );
}
