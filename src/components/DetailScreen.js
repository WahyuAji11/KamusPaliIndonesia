import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';

const DetailScreen = ({ word, onClose }) => {
    return (
        <ImageBackground
            source={require('../../assets/SAGIN.png')}
            style={styles.backgroundImage}
            resizeMode="center"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.paliWord}>{word.pali}</Text>
                    <Text style={styles.basicTranslation}>{word.translation}</Text>

                    <Text style={styles.paliVerse}>{word.paliText}</Text>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(249, 249, 249, 0.5)',
    },
    header: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    backText: {
        fontSize: 24,
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    paliWord: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    basicTranslation: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    paliVerse: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
});

export default DetailScreen;
