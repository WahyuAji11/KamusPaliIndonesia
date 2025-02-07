import React, { useState, useEffect } from 'react';
import { View, Switch, Text, StyleSheet, useColorScheme } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const colorScheme = useColorScheme(); // Mendeteksi mode sistem (dark/light)
    const theme = useTheme(); // Menggunakan tema dari react-native-paper

    // Setel mode dark/light sesuai preferensi sistem saat pertama kali membuka halaman
    useEffect(() => {
        setIsDarkMode(colorScheme === 'dark');
    }, [colorScheme]);

    // Fungsi untuk mengubah mode dark/light
    const toggleDarkMode = async () => {
      setIsDarkMode((prev) => !prev);
      storage.setItem('isDarkMode', !isDarkMode);
      const savedMode = await storage.getItem('isDarkMode');
      if (savedMode!== null) setIsDarkMode(JSON.parse(savedMode));
      // Update mode di storage (disini hanya sebagai contoh)
      // Ambil data yang tersimpan di storage (disini hanya sebagai contoh)
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {}} />
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            {/* Konten Settings */}
            <View style={styles.content}>
                {/* Toggle Dark/Light Mode */}
                <View style={styles.settingItem}>
                    <Icon name="moon" size={24} color={theme.colors.text} />
                    <Text style={[styles.settingText, { color: theme.colors.text }]}>
                        Mode Gelap
                    </Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        thumbColor={isDarkMode ? theme.colors.primary : theme.colors.accent}
                        trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
                    />
                </View>

                {/* Informasi Tambahan */}
                <Text style={[styles.infoText, { color: theme.colors.text }]}>
                    Mode gelap akan menyesuaikan dengan preferensi sistem Anda.
                </Text>
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