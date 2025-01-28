import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ value, onChangeText, onClear }) => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Cari kata dalam bahasa Pali atau Indonesia"
            value={value}
            onChangeText={onChangeText}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={false}
        />
        {value.length > 0 && (
            <Icon
                name="times"
                size={20}
                color="#ccc"
                style={styles.clearIcon}
                onPress={onClear}
            />
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingRight: 40,
    },
    clearIcon: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -16 }],
    }
});

export default SearchBar;
