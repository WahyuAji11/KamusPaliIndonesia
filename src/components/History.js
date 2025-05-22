import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import WordListItem from './WordListItem';

const History = ({ history, onWordPress, onClear }) => {
  const handleClearPress = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all search history?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear", 
          onPress: onClear,
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Riwayat</Text>
        {history.length > 0 && (
          <TouchableOpacity 
            onPress={handleClearPress}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Hapus</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WordListItem item={item} onPress={onWordPress} />
        )}
        contentContainerStyle={history.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada riwayat pencarian</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF3B30',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 15,
    textAlign: 'center',
  }
});

export default History;