import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../styles/AppStyles';
import { data } from '../data/dictionary'; // Adjust the import based on your project structure

const Recommended = ({ item, onPress, isFavorite, onToggleFavorite }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
    >
        <View style={styles.card}>
            {/* Recommendation badge */}
            <View style={styles.recommendBadge}>
                <Icon name="compass" size={12} color="#FFFFFF" />
                <Text style={styles.recommendText}>Rekomendasi</Text>
            </View>

            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.paliWord}>{item.pali}</Text>
                    <Text style={styles.translation}>{item.indonesia}</Text>
                </View>
                {onToggleFavorite && (
                    <TouchableOpacity
                        onPress={() => onToggleFavorite(item)}
                        style={styles.favoriteButton}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                        <Icon
                            name={isFavorite ? "star" : "star-o"}
                            size={20}
                            color={isFavorite ? "#FFD700" : theme.textLight}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {(item.paliVerse || item.detailedIndonesia || item.recommendReason) && (
                <View style={styles.divider} />
            )}

            {/* Recommendation reason */}
            {item.recommendReason && (
                <View style={styles.reasonContainer}>
                    <Icon name="lightbulb-o" size={14} color="#3D5A80" style={styles.reasonIcon} />
                    <Text style={styles.recommendReason}>{item.recommendReason}</Text>
                </View>
            )}

            {item.paliVerse && (
                <Text style={styles.paliVerse} numberOfLines={2}>
                    {item.paliVerse}
                </Text>
            )}

            {item.detailedIndonesia && (
                <Text style={styles.detailedTranslation} numberOfLines={2}>
                    {item.detailedIndonesia}
                </Text>
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        position: 'relative',
    },
    recommendBadge: {
        position: 'absolute',
        top: 0,
        right: 16,
        backgroundColor: '#3D5A80',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recommendText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
        marginLeft: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    titleContainer: {
        flex: 1,
        marginRight: 12,
    },
    paliWord: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3D5A80',
        marginBottom: 4,
    },
    translation: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 10,
    },
    reasonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F0F7FF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    reasonIcon: {
        marginRight: 8,
        marginTop: 2,
    },
    recommendReason: {
        fontSize: 14,
        color: '#3D5A80',
        flex: 1,
        lineHeight: 20,
    },
    paliVerse: {
        fontSize: 14,
        color: '#666666',
        fontStyle: 'italic',
        marginBottom: 6,
        lineHeight: 20,
    },
    detailedTranslation: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    favoriteButton: {
        padding: 4,
    }
});

export default Recommended;