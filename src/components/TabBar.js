import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../styles/AppStyles';

const TabBar = ({ activeTab, onTabChange }) => (
    <View style={styles.tabContainer}>
        <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => onTabChange('search')}
        >
            <Icon
                name="search"
                size={20}
                color={activeTab === 'search' ? theme.primary : theme.textLight}
            />
            <Text style={[
                styles.tabText,
                activeTab === 'search' && styles.activeTabText
            ]}>
                Cari
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => onTabChange('history')}
        >
            <Icon
                name="history"
                size={20}
                color={activeTab === 'history' ? theme.primary : theme.textLight}
            />
            <Text style={[
                styles.tabText,
                activeTab === 'history' && styles.activeTabText
            ]}>
                Riwayat
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
            onPress={() => onTabChange('favorites')}
        >
            <Icon
                name="star"
                size={20}
                color={activeTab === 'favorites' ? theme.primary : theme.textLight}
            />
            <Text style={[
                styles.tabText,
                activeTab === 'favorites' && styles.activeTabText
            ]}>
                Favorit
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: theme.primaryLight,
    },
    tabText: {
        marginLeft: 8,
        fontSize: 14,
        color: theme.textLight,
        fontWeight: '500',
    },
    activeTabText: {
        color: theme.primary,
        fontWeight: '600',
    },
});

export default TabBar;