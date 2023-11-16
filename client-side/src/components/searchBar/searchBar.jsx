import React, { useState } from 'react';

function SearchBar({ cards, setFilteredCards }) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const input = search.toLowerCase();
    const filteredData = cards.filter((card) => {
      return card.nama_barang.toLowerCase().includes(input);
    });
    setFilteredCards(filteredData);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    handleSearch();
  };

  return (
    <div>
      <input
        size={27}
        className="rounded-pill border-0 p-2"
        name="search"
        type="text"
        placeholder="&ensp;Search..."
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
