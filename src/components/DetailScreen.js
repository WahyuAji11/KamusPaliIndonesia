import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, StatusBar, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailScreen = ({ word, onClose, isFavorite, onToggleFavorite }) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0.9],
        extrapolate: 'clamp',
    });
    
    const handleShare = async () => {
        try {
            await Share.share({
                message: `${word.pali}\n\n${word.translation}`,
                title: 'Bagikan kata',
            });
        } catch(error) {
            console.error('Error sharing:', error) || alert('Gagal membagikan kata');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                    <Icon name="arrow-left" size={22} color="#555" />
                </TouchableOpacity>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                        <Icon name="share-alt" size={20} color="#555"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
                        <Icon 
                            name={isFavorite ? "star" : "star-o"} 
                            size={22} 
                            color={isFavorite ? "#FFD700" : "#555"} 
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            
            {/* Content */}
            <Animated.ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.wordContainer}>
                    <Text style={styles.paliWord}>{word.pali}</Text>
                    {word.paliText && (
                        <View style={styles.paliTextContainer}>
                            <Text style={styles.paliText}>{word.paliText}</Text>
                        </View>
                    )}
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.translationContainer}>
                    <Text style={styles.translationLabel}>Translation</Text>
                    <Text style={styles.translation}>{word.translation}</Text>
                </View>
                
                {/* Add some bottom padding for better scrolling experience */}
                <View style={{ height: 40 }} />
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        zIndex: 10,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 12,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    favoriteButton: {
        marginLeft: 12,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    wordContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    paliWord: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    paliTextContainer: {
        backgroundColor: '#f9f7f0',
        borderRadius: 12,
        padding: 16,
        marginTop: 10,
    },
    paliText: {
        fontSize: 18,
        color: '#666',
        fontStyle: 'italic',
        lineHeight: 26,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    translationContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 20,
    },
    translationLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    translation: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
    },
});

export default DetailScreen;