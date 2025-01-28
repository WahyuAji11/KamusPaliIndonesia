import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import DetailScreen from './src/components/DetailScreen';
import dictionary from './src/data/dictionary';

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
        <TextInput
          style={styles.input}
          placeholder="Cari kata dalam bahasa Pali atau Indonesia"
          value={searchTerm}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleWordPress(item)}
            >
              <Text style={styles.paliWord}>{item.pali}</Text>
              <Text style={styles.translation}>{item.indonesia}</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(249, 249, 249, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  resultItem: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  paliWord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  translation: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default App;