import { ReactNode } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export type CardProps = {
  children: ReactNode;
  elevated?: boolean;
  compact?: boolean;
};

export const Card = ({ children, elevated = true, compact }: CardProps) => {
  const { width } = useWindowDimensions();
  const isSmall = width < 375;

  return (
    <View
      style={[
        styles.base,
        elevated && styles.shadow,
        isSmall && styles.compact,
        compact && styles.compact,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  compact: {
    padding: 12,
    borderRadius: 12,
  },
});
