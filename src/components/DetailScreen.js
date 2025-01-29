import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailScreen = ({ word, onClose, isFavorite, onToggleFavorite }) => {
    const handleShare = async () => {
        try {
            await Share.share({
                message: `${word.pali}\n\n${word.translation}`,
                title: 'Bagikan kata',
            });
        } catch(error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                        <Icon name="share" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onToggleFavorite} style={styles.actionButton}>
                        <Icon name={isFavorite ? "star" : "star-o"} size={24} color={isFavorite ? "#FFD700" : "#333"} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.paliWord}>{word.pali}</Text>
                {word.paliText && <Text style={styles.paliText}>{word.paliText}</Text>}
                <Text style={styles.translation}>{word.translation}</Text>
            </ScrollView>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 16,
        padding: 4,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    paliWord: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    paliText: {
        fontSize: 18,
        marginBottom: 16,
        color: '#666',
        fontStyle: 'italic',
    },
    translation: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
});

export default DetailScreen;