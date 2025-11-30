import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10; // how many products per page

  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(filteredData.slice(0, limit));

  // Update products whenever offset or filteredData changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  // Unified pagination function
  const handlePage = (direction) => {
    if (direction === 'prev') {
      if (offset === 0) return;
      setOffset(offset - limit);
    }

    if (direction === 'next') {
      if (offset + limit >= filteredData.length) return;
      setOffset(offset + limit);
    }
  };

  // Tag filtering / Search
  const filterTags = (value) => {
    const term = value.toLowerCase().trim();

    if (term === "") {
      setFilteredData(data);
      setOffset(0);
      return;
    }

    const result = data.filter((product) =>
      product.tags.some((tag) =>
        tag.toLowerCase().includes(term)
      )
    );

    setFilteredData(result);
    setOffset(0);
  };

  const isAtStart = offset === 0;
  const isAtEnd = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">

      {/* Search Bar */}
      <div className="mt2 mb3">
        <Search handleSearch={filterTags} />
      </div>

      {/* Cards */}
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePage('prev')}
          disabled={isAtStart}
        />

        <Button
          text="Next"
          handleClick={() => handlePage('next')}
          disabled={isAtEnd}
        />
      </div>
    </div>
  );
};

export default CardList;
