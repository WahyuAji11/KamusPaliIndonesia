import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import WordListItem from './WordListItem';

const Favorites = ({ favorites, onWordPress, onToggleFavorite }) => (
    <View style={styles.container}>
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <WordListItem
                    item={item}
                    onPress={onWordPress}
                    isFavorite={true}
                    onToggleFavorite={() => onToggleFavorite(item)}
                />
            )}
            ListEmptyComponent={
                <Text style={styles.emptyText}>Belum ada kata favorit</Text>
            }
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
    }
});

export default Favorites;