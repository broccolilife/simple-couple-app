import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

export type SkeletonProps = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export const Skeleton = ({ width = '100%', height = 16, borderRadius = 8, style }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.base,
        { width: width as number, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

export const CardSkeleton = () => (
  <View style={styles.card}>
    <Skeleton width="60%" height={20} />
    <Skeleton width="100%" height={14} style={{ marginTop: 12 }} />
    <Skeleton width="80%" height={14} style={{ marginTop: 6 }} />
    <Skeleton width="40%" height={32} borderRadius={12} style={{ marginTop: 16 }} />
  </View>
);

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#E5E7EB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});
