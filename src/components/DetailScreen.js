import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const DetailScreen = ({ word, onClose }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{word.title}</Text>
                <Text style={styles.pageNumber}>1</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.paliTextContainer}>
                    <Text style={styles.paliText}>{word.paliText}</Text>
                </View>

                <View style={styles.translationContainer}>
                    <Text style={styles.translationText}>{word.translation}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 8,
    },
    backText: {
        fontSize: 24,
        color: '#666',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    pageNumber: {
        fontSize: 16,
        color: '#666',
        width: 30,
        textAlign: 'right',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    paliTextContainer: {
        marginBottom: 20,
    },
    paliText: {
        fontSize: 18,
        color: '#333',
        lineHeight: 28,
        fontStyle: 'italic',
    },
    translationContainer: {
        marginTop: 20,
    },
    translationText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
    },
});

export default DetailScreen;