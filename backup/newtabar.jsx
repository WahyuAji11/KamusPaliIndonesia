import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBar = ({ activeTab, onTabChange }) => {
    const handleSearchPress = useCallback(() => onTabChange('search'), [onTabChange]);
    const handleHistoryPress = useCallback(() => onTabChange('history'), [onTabChange]);
    const handleFavoritesPress = useCallback(() => onTabChange('favorites'), [onTabChange]);
    const handleSettingsPress = useCallback(() => onTabChange('settings'), [onTabChange]);

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TabItem
                    isActive={activeTab === 'search'}
                    onPress={handleSearchPress}
                    icon="search"
                    label="Cari"
                />
                <TabItem
                    isActive={activeTab === 'history'}
                    onPress={handleHistoryPress}
                    icon="history"
                    label="Riwayat"
                />
                <TabItem
                    isActive={activeTab === 'favorites'}
                    onPress={handleFavoritesPress}
                    icon="star"
                    label="Favorit"
                />
                <TabItem
                    isActive={activeTab === 'settings'}
                    onPress={handleSettingsPress}
                    icon="users"
                    label="Customers"
                />
            </View>
        </View>
    );
};

const TabItem = memo(({ isActive, onPress, icon, label }) => (
    <TouchableOpacity
        style={styles.tab}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
            <Icon
                name={icon}
                size={20}
                color={isActive ? '#FFFFFF' : '#8E8E93'}
            />
        </View>
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
            {label}
        </Text>
        {isActive && <View style={styles.indicator} />}
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    tab: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        position: 'relative',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    activeIconContainer: {
        backgroundColor: '#3D5A80',
    },
    tabText: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    activeTabText: {
        color: '#3D5A80',
        fontWeight: '600',
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        width: '50%',
        backgroundColor: '#3D5A80',
        borderRadius: 1.5,
    }
});

export default TabBar;