import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailScreen = ({ word, onClose }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose();
            return true;
        });

        return () => backHandler.remove();
    }, [onClose]);

    return (
        <ImageBackground
            source={require('../../assets/SAGIN.png')}
            style={styles.backgroundImage}
            resizeMode="center"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <View style={styles.backButtonContent}>
                            <Icon name="arrow-back" size={24} color="#333" />
                            <Text style={styles.backText}>Kembali</Text>
                        </View>
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        padding: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    backButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginLeft: 8,
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