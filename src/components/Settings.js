import React from 'react';
import { StyleSheet, Switch, Text, useColorScheme, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
    const colorScheme = useColorScheme(); // Detect system dark/light mode
    const theme = useTheme(); // Use theme from react-native-paper

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>            
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {}} />
                <Appbar.Content title="Settings" />
            </Appbar.Header>
            
            <View style={styles.content}>
                <View style={styles.settingItem}>
                    <FontAwesome5 name="moon" size={24} color={theme.colors.text} solid />
                    <Text style={[styles.settingText, { color: theme.colors.text }]}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        thumbColor={isDarkMode ? theme.colors.primary : theme.colors.accent}
                        trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
                    />
                </View>
                <Text style={[styles.infoText, { color: theme.colors.text }]}>Dark mode will follow your system preference.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    settingText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
    infoText: {
        fontSize: 14,
        marginTop: 8,
        fontStyle: 'italic',
    },
});

export default Settings;