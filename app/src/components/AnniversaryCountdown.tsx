import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { useAppStore } from '../state/store';

function getNextAnniversary(dateStr: string): Date {
  const origin = new Date(dateStr);
  const now = new Date();
  const thisYear = new Date(now.getFullYear(), origin.getMonth(), origin.getDate());
  if (thisYear.getTime() > now.getTime()) return thisYear;
  return new Date(now.getFullYear() + 1, origin.getMonth(), origin.getDate());
}

function daysBetween(a: Date, b: Date): number {
  const diff = b.getTime() - a.getTime();
  return Math.ceil(diff / 86400000);
}

function formatDuration(totalDays: number): { years: number; months: number; days: number } {
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  return { years, months, days };
}

export const AnniversaryCountdown = () => {
  const anniversaryDate = useAppStore((state) => state.anniversaryDate);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    if (!anniversaryDate) return null;
    const origin = new Date(anniversaryDate);
    const totalDays = daysBetween(origin, now);
    const nextAnni = getNextAnniversary(anniversaryDate);
    const daysUntil = daysBetween(now, nextAnni);
    const duration = formatDuration(totalDays);
    const nextYear = Math.floor(totalDays / 365) + 1;
    return { totalDays, daysUntil, duration, nextYear };
  }, [anniversaryDate, now]);

  if (!anniversaryDate || !data) {
    return (
      <Card>
        <Text style={styles.title}>Anniversary Countdown 💕</Text>
        <Text style={styles.subtitle}>
          Set your anniversary date in Settings to see the countdown!
        </Text>
      </Card>
    );
  }

  return (
    <Card>
      <Text style={styles.title}>Anniversary Countdown 💕</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{data.totalDays.toLocaleString()}</Text>
          <Text style={styles.statLabel}>days together</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{data.daysUntil}</Text>
          <Text style={styles.statLabel}>until #{data.nextYear}</Text>
        </View>
      </View>
      <View style={styles.durationRow}>
        {data.duration.years > 0 ? (
          <View style={styles.durationChip}>
            <Text style={styles.chipNumber}>{data.duration.years}</Text>
            <Text style={styles.chipLabel}>{data.duration.years === 1 ? 'year' : 'years'}</Text>
          </View>
        ) : null}
        <View style={styles.durationChip}>
          <Text style={styles.chipNumber}>{data.duration.months}</Text>
          <Text style={styles.chipLabel}>{data.duration.months === 1 ? 'month' : 'months'}</Text>
        </View>
        <View style={styles.durationChip}>
          <Text style={styles.chipNumber}>{data.duration.days}</Text>
          <Text style={styles.chipLabel}>{data.duration.days === 1 ? 'day' : 'days'}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#312E81',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6366F1',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  durationChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  chipNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },
  chipLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
});
