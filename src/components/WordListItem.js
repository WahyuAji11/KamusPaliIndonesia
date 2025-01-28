import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WordListItem = ({ item, onPress }) => (
    <TouchableOpacity
        style={styles.resultItem}
        onPress={() => onPress(item)}
    >
        <Text style={styles.paliWord}>{item.pali}</Text>
        <Text style={styles.translation}>{item.indonesia}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default WordListItem;