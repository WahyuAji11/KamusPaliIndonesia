import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../styles/AppStyles';

const WordListItem = ({ item, onPress, isFavorite, onToggleFavorite }) => (
    <TouchableOpacity
        style={styles.resultItem}
        onPress={() => onPress(item)}
    >
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <Text style={styles.paliWord}>{item.pali}</Text>
                <Text style={styles.translation}>{item.indonesia}</Text>
            </View>
            {onToggleFavorite && (
                <TouchableOpacity
                    onPress={() => onToggleFavorite(item)}
                    style={styles.favoriteButton}
                >
                    <Icon
                        name={isFavorite ? "star" : "star-o"}
                        size={20}
                        color={isFavorite ? theme.primary : theme.textLight}
                    />
                </TouchableOpacity>
            )}
        </View>
        {item.paliVerse && (
            <Text style={styles.paliVerse} numberOfLines={2}>{item.paliVerse}</Text>
        )}
        {item.detailedIndonesia && (
            <Text style={styles.detailedTranslation} numberOfLines={2}>
                {item.detailedIndonesia}
            </Text>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    resultItem: {
        padding: 16,
        backgroundColor: theme.background,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: theme.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        marginRight: 8,
    },
    paliWord: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.primary,
        marginBottom: 4,
    },
    translation: {
        fontSize: 16,
        color: theme.text,
        marginBottom: 8,
    },
    paliVerse: {
        fontSize: 14,
        color: theme.textLight,
        fontStyle: 'italic',
        marginBottom: 4,
        lineHeight: 20,
    },
    detailedTranslation: {
        fontSize: 14,
        color: theme.textLight,
        lineHeight: 20,
    },
    favoriteButton: {
        padding: 4,
    }
});

export default WordListItem;