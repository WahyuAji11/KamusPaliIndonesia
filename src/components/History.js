import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WordListItem from './WordListItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const History = ({ history, onWordPress, onClear }) => (
    <View style={styles.container}>
        {history.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                <Icon name="trash" size={16} color="#666" />
                <Text style={styles.clearText}>Hapus Riwayat</Text>
            </TouchableOpacity>
        )}
        <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <WordListItem item={item} onPress={onWordPress} />
            )}
            ListEmptyComponent={
                <Text style={styles.emptyText}>Belum ada riwayat pencarian</Text>
            }
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    clearText: {
        marginLeft: 8,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
    }
});

export default History;