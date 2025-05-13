import React, { useState } from 'react';
import { Animated, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ value, onChangeText, onClear, isLoading = false }) => {
    const [scaleAnim] = useState(new Animated.Value(1));

    const handleFocus = () => {
        Animated.timing(scaleAnim, {
            toValue: 1.02,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleBlur = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.searchSection}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#3D5A80" style={styles.searchIcon} />
                ) : (
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                )}
                
                <TextInput
                    style={styles.input}
                    placeholder="Cari kata dalam bahasa Pali Indonesia"
                    value={value}
                    onChangeText={onChangeText}
                    clearButtonMode="never" // Changed to never since we have our own clear button
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                
                {value.length > 0 && !isLoading && (
                    <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                        <Icon name="times-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
                
                {isLoading && value.length > 0 && (
                    <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                        <Icon name="times-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    searchIcon: {
        marginRight: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        marginLeft: 10,
        padding: 5,
    },
});

export default SearchBar;