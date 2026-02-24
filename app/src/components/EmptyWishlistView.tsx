import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface EmptyWishlistViewProps {
  onAddWish?: () => void;
}

/**
 * Empty state for the couple's shared wishlist.
 */
export const EmptyWishlistView: React.FC<EmptyWishlistViewProps> = ({ onAddWish }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💝</Text>
      <Text style={styles.title}>Your Wishlist is Empty</Text>
      <Text style={styles.subtitle}>
        Add things you'd love to do together —{'\n'}
        dates, trips, gifts, or bucket list dreams!
      </Text>
      {onAddWish && (
        <TouchableOpacity style={styles.button} onPress={onAddWish} activeOpacity={0.8}>
          <Text style={styles.buttonText}>+ Add First Wish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FF6B8A',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
