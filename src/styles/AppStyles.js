import { StyleSheet, Platform, StatusBar } from 'react-native';

// Define theme colors
const theme = {
    primary: 'blue',
    primaryLight: '#FFE4DC',
    primaryDark: '#E66C44',
    text: '#2D3436',
    textLight: '#636E72',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    border: '#FFE4DC',
};

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
    },
    headerContainer: {
        paddingTop: Platform.OS === 'ios' ? 20 : 40,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: theme.primary,
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: theme.textLight,
        textAlign: 'center',
        opacity: 0.8,
    },
    noResults: {
        textAlign: 'center',
        color: theme.textLight,
        marginTop: 24,
        fontSize: 16,
        fontStyle: 'italic',
    },
    hint: {
        textAlign: 'center',
        color: theme.textLight,
        marginTop: 24,
        fontSize: 15,
        lineHeight: 22,
        paddingHorizontal: 20,
    }
});

export { theme };