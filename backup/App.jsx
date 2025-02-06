import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailScreen from './src/components/DetailScreen';
import SearchBar from './src/components/SearchBar';
import WordListItem from './src/components/WordListItem';
import History from './src/components/History';
import Favorites from './src/components/Favorites';
import TabBar from './src/components/TabBar';
import dictionary from './src/data/dictionary';
import { styles } from './src/styles/AppStyles';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    loadFavorites();
    loadHistory();
    StatusBar.setBarStyle('dark-content');
    if(Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    const backAction = () => {
      if(selectedWord) {
        setSelectedWord(null);
        return true;
      }
      if(searchTerm) {
        setSearchTerm('');
        setResults([]);
        Keyboard.dismiss();
        return true;
      }
      if(activeTab !== 'search') {
        setActiveTab('search');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Keyboard.dismiss();
      }
    );

    return () => {
      backHandler.remove();
      keyboardDidHideListener.remove();
    };
  }, [selectedWord, searchTerm, activeTab]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if(storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch(error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if(storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch(error) {
      console.error('Error loading history:', error);
    }
  };

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

  const handleWordPress = useCallback(async (word) => {
    Keyboard.dismiss();
    const newHistory = [word, ...searchHistory.filter(item => item.id !== word.id)].slice(0, 20);
    setSearchHistory(newHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));

    setSelectedWord({
      id: word.id,
      pali: word.pali,
      paliText: word.paliVerse,
      translation: word.detailedIndonesia
    });
  }, [searchHistory]);

  const toggleFavorite = async (word) => {
    let newFavorites;
    if(favorites.some(fav => fav.id === word.id)) {
      newFavorites = favorites.filter(fav => fav.id !== word.id);
    } else {
      const wordToSave = {
        id: word.id,
        pali: word.pali,
        indonesia: word.indonesia,
        paliVerse: word.paliText || word.paliVerse,
        detailedIndonesia: word.translation || word.detailedIndonesia
      };
      newFavorites = [...favorites, wordToSave];
    }
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    Keyboard.dismiss();
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  if(selectedWord) {
    return (
      <DetailScreen
        word={selectedWord}
        onClose={() => {
          setSelectedWord(null);
          Keyboard.dismiss();
        }}
        isFavorite={favorites.some(fav => fav.id === selectedWord.id)}
        onToggleFavorite={() => toggleFavorite(selectedWord)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/sangha.png')}
        style={styles.backgroundImage}
        resizeMode="center"
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Kamus Pali - Indonesia</Text>
            <Text style={styles.subtitle}>Pencarian kata dalam Bahasa Pali</Text>
          </View>

          <View style={styles.contentContainer}>
            <SearchBar
              value={searchTerm}
              onChangeText={handleSearch}
              onClear={handleClear}
            />

            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'search' && (
              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <WordListItem
                    item={item}
                    onPress={handleWordPress}
                    isFavorite={favorites.some(fav => fav.id === item.id)}
                    onToggleFavorite={() => toggleFavorite(item)}
                  />
                )}
                ListEmptyComponent={
                  searchTerm ? (
                    <Text style={styles.noResults}>Tidak ada hasil ditemukan</Text>
                  ) : (
                    <Text style={styles.hint}>Ketik kata dalam bahasa Pali atau Indonesia</Text>
                  )
                }
              />
            )}

            {activeTab === 'history' && (
              <History
                history={searchHistory}
                onWordPress={handleWordPress}
                onClear={clearHistory}
              />
            )}

            {activeTab === 'favorites' && (
              <Favorites
                favorites={favorites}
                onWordPress={handleWordPress}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;