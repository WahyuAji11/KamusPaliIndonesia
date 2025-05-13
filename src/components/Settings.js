import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Surface, useTheme } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Settings = () => {
    const theme = useTheme();
    const [language, setLanguage] = useState('id');

    const ContactItem = ({ icon, text, url }) => (
        <Surface style={styles.contactSurface} elevation={1}>
            <View style={styles.contactItem}>
                <FontAwesome5 name={icon} size={24} color={theme.colors.primary} solid />
                <Text
                    style={[styles.contactText, { color: theme.colors.primary }]}
                    onPress={() => url && Linking.openURL(url)}
                >
                    {text}
                </Text>
            </View>
        </Surface>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>            
            <Appbar.Header>
                {/* <Appbar.BackAction onPress={() => {}} />
                <Appbar.Content title="Dukungan" /> */}
                <TouchableOpacity 
                    onPress={() => setLanguage(language === 'id' ? 'en' : 'id')}
                    style={styles.languageButton}
                >
                    <Text style={[styles.languageButtonText, { color: theme.colors.primary }]}>
                        {language === 'id' ? '🇬🇧' : '🇮🇩'}
                    </Text>
                </TouchableOpacity>
            </Appbar.Header>
            
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Surface style={styles.headerSection} elevation={2}>
                    <Text style={[styles.welcomeText, { color: theme.colors.text }]}> 
                        {language === 'id' ? "Selamat datang di Pusat Dukungan" : "Welcome to Support Center"}
                    </Text>
                    <Text style={[styles.infoText, { color: theme.colors.text }]}> 
                        {language === 'id' ? 
                            "Jika ada pertanyaan, silakan hubungi salah satu pembuat melalui Instagram atau email. Terima kasih atas pengertiannya. Mohon maaf atas keterlambatan." : 
                            "If you have any questions, feel free to contact one of the creators via Instagram or email. Thank you for your understanding. We apologize for any delays."}
                    </Text>
                </Surface>

                <View style={styles.contactsContainer}>
                    <ContactItem 
                        icon="phone" 
                        text="0813-5971-9288" 
                        url="tel:0813-5971-9288"
                    />
                    <ContactItem 
                        icon="envelope" 
                        text="Email kami" 
                        url="mailto:rtxalham@gmail.com"
                    />
                    <ContactItem 
                        icon="instagram" 
                        text="Instagram(@w.aji_666)" 
                        url="https://www.instagram.com/w.aji_666/"
                    />
                    <ContactItem 
                        icon="instagram" 
                        text="Instagram(@nitrogen7_)" 
                        url="https://www.instagram.com/nitrogen7_/"
                    />
                </View>
            </ScrollView>
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
    headerSection: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 16,
        lineHeight: 24,
    },
    contactsContainer: {
        gap: 12,
        marginBottom: 16,
    },
    contactSurface: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    contactText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        fontWeight: '500',
    },
    languageButton: {
        padding: 8,
        marginRight: 8,
    },
    languageButtonText: {
        fontSize: 20,
    }
});

export default Settings;