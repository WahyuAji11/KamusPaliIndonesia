import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WordListItem from './WordListItem';

const History = ({ history, onWordPress, onClear }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Riwayat</Text>
      {history.length > 0 && (
        <TouchableOpacity onPress={onClear}>
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
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada riwayat pencarian</Text>
        </View>
      }
    />
  </View>
);

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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  clearText: {
    fontSize: 14,
    color: '#007AFF',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
  }
});

export default History;