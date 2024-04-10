// Import React and useState from 'react'
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchComponent = ({ setSelectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    // Notify parent component about the selected category
    setSelectedCategory(query);
  };

  return (
    <Searchbar
      placeholder="Search Categories"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{ width: '90%', marginTop: 20, marginBottom: 20 }}
    />
  );
};

export default SearchComponent;
