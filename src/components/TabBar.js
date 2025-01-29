import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBar = ({ activeTab, onTabChange }) => (
    <View style={styles.tabContainer}>
        <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => onTabChange('search')}
        >
            <Icon name="search" size={20} color={activeTab === 'search' ? '#2196F3' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>Cari</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => onTabChange('history')}
        >
            <Icon name="history" size={20} color={activeTab === 'history' ? '#2196F3' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
            onPress={() => onTabChange('favorites')}
        >
            <Icon name="star" size={20} color={activeTab === 'favorites' ? '#2196F3' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>Favorit</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#E3F2FD',
    },
    tabText: {
        marginLeft: 4,
        color: '#666',
    },
    activeTabText: {
        color: '#2196F3',
    },
});

export default TabBar;