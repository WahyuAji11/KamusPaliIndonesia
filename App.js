import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import DetailScreen from './src/components/DetailScreen';
import SearchBar from './src/components/SearchBar';
import WordListItem from './src/components/WordListItem';
import dictionary from './src/data/dictionary';
import { styles } from './src/styles/AppStyles';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  const handleSearch = useCallback((text) => {
    setSearchTerm(text);
    const trimmedText = text.trim().toLowerCase();

    if(trimmedText === '') {
      setResults([]);
    } else {
      const filteredResults = dictionary.filter((entry) =>
        entry.pali.toLowerCase().includes(trimmedText) ||
        entry.indonesia.toLowerCase().includes(trimmedText)
      );
      setResults(filteredResults);
    }
  }, []);

  const handleWordPress = useCallback((word) => {
    setSelectedWord({
      pali: word.pali,
      paliText: word.paliVerse,
      translation: word.detailedIndonesia
    });
  }, []);

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
  };

  if(selectedWord) {
    return <DetailScreen word={selectedWord} onClose={() => setSelectedWord(null)} />;
  }

  return (
    <ImageBackground
      source={require('./assets/SAGIN.png')}
      style={styles.backgroundImage}
      resizeMode="center"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Kamus Pali - Indonesia (beta version)</Text>
        <SearchBar
          value={searchTerm}
          onChangeText={handleSearch}
          onClear={handleClear}
        />
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WordListItem item={item} onPress={handleWordPress} />
          )}
          ListEmptyComponent={
            searchTerm ? (
              <Text style={styles.noResults}>Tidak ada hasil ditemukan</Text>
            ) : null
          }
        />
      </View>
    </ImageBackground>
  );
};

export default App;
