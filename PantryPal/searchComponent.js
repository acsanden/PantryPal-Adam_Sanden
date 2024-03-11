import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const searchComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search Categories"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default searchComponent;
