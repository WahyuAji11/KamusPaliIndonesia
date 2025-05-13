import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WordListItem from './WordListItem';

const Favorites = ({ favorites, onWordPress, onToggleFavorite }) => {
    const [sortedData, setSortedData] = useState(favorites);
    const [isAlphabetical, setIsAlphabetical] = useState(false);

    useEffect(() => {
        if (isAlphabetical) {
            // Sort alphabetically by pali word
            const sorted = [...favorites].sort((a, b) => 
                a.pali.localeCompare(b.pali)
            );
            setSortedData(sorted);
        } else {
            // Use original order
            setSortedData(favorites);
        }
    }, [favorites, isAlphabetical]);

    const toggleSort = () => {
        setIsAlphabetical(!isAlphabetical);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorit</Text>
                {favorites.length > 0 && (
                    <TouchableOpacity onPress={toggleSort} style={styles.filterButton}>
                        <Text style={styles.filterText}>
                            {isAlphabetical ? "Urutan Asli" : "Urut A-Z"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={sortedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <WordListItem
                        item={{
                            id: item.id,
                            pali: item.pali,
                            indonesia: item.indonesia,
                            paliVerse: item.paliVerse,
                            detailedIndonesia: item.detailedIndonesia
                        }}
                        onPress={() => onWordPress({
                            id: item.id,
                            pali: item.pali,
                            indonesia: item.indonesia,
                            paliVerse: item.paliVerse,
                            detailedIndonesia: item.detailedIndonesia
                        })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Belum ada kata favorit</Text>
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
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    filterButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    filterText: {
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

export default Favorites;