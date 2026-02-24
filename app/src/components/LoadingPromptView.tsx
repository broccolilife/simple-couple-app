import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

/**
 * Loading state while the daily prompt is being fetched.
 * Pulsing heart animation with gentle shimmer.
 */
export const LoadingPromptView: React.FC = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const shimmer = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.6, duration: 1000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [scale, shimmer]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.heart, { transform: [{ scale }] }]}>
        💕
      </Animated.Text>
      <Text style={styles.title}>Loading today's prompt...</Text>

      <View style={styles.skeleton}>
        <Animated.View style={[styles.line, styles.lineLong, { opacity: shimmer }]} />
        <Animated.View style={[styles.line, styles.lineShort, { opacity: shimmer }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  heart: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 24,
  },
  skeleton: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD6E0',
  },
  lineLong: {
    width: '80%',
  },
  lineShort: {
    width: '55%',
  },
});
