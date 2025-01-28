import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(249, 249, 249, 0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 16,
        color: '#333',
    },
    noResults: {
        textAlign: 'center',
        color: '#999',
        marginTop: 16,
        fontStyle: 'italic',
    },
});