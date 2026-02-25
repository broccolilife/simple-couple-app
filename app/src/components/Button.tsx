import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({ title, onPress, variant = 'primary', icon, disabled, loading }: ButtonProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ disabled: disabled || loading }}
    onPress={onPress}
    style={({ pressed }) => [
      styles.base,
      variant === 'secondary' && styles.secondary,
      (disabled || loading) && styles.disabled,
      pressed && styles.pressed,
    ]}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator size="small" color={variant === 'secondary' ? '#6C63FF' : '#FFFFFF'} />
    ) : (
      icon
    )}
    <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>
      {loading ? 'Loading…' : title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    gap: 8,
  },
  secondary: {
    backgroundColor: '#F3F1FF',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryLabel: {
    color: '#6C63FF',
  },
});
