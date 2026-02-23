import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAppStore } from '../state/store';

const PROMPTS: Array<{ category: string; text: string }> = [
  { category: 'fun', text: 'If we could teleport anywhere right now, where would you take me?' },
  { category: 'deep', text: 'What is one thing I do that makes you feel most loved?' },
  { category: 'memories', text: 'What is your favorite memory of us from this past month?' },
  { category: 'dreams', text: 'If we had a whole week off together, what would the perfect day look like?' },
  { category: 'fun', text: 'What song reminds you of us and why?' },
  { category: 'deep', text: 'Is there anything you wish we talked about more?' },
  { category: 'gratitude', text: 'What is something small I did recently that meant a lot to you?' },
  { category: 'dreams', text: 'Where do you see us in five years?' },
  { category: 'fun', text: 'If we were characters in a movie, what genre would it be?' },
  { category: 'deep', text: 'What is your love language today — words, touch, time, gifts, or acts?' },
  { category: 'memories', text: 'What was the first thing you noticed about me?' },
  { category: 'gratitude', text: 'Name three things about our relationship you are grateful for.' },
  { category: 'fun', text: 'If we opened a shop together, what would we sell?' },
  { category: 'deep', text: 'What is one fear you want to overcome together?' },
  { category: 'dreams', text: 'What is one new hobby you would love for us to try?' },
  { category: 'fun', text: 'Describe me in three emojis. Why those?' },
  { category: 'deep', text: 'When do you feel closest to me?' },
  { category: 'memories', text: 'What is the funniest thing that has happened to us?' },
  { category: 'gratitude', text: 'What is something I did for you that you never properly thanked me for?' },
  { category: 'dreams', text: 'What is a tradition you want us to start?' },
  { category: 'fun', text: 'If we had superpowers, what would yours be and what would mine be?' },
  { category: 'deep', text: 'What does home feel like to you?' },
  { category: 'memories', text: 'Describe our best date ever in one sentence.' },
  { category: 'gratitude', text: 'What part of our routine brings you the most joy?' },
  { category: 'dreams', text: 'What country should we visit next and why?' },
  { category: 'fun', text: 'Invent a couple handshake right now. Go!' },
  { category: 'deep', text: 'What is one thing you want to get better at as a partner?' },
  { category: 'memories', text: 'What is something we used to do that you miss?' },
  { category: 'gratitude', text: 'Write a one-line love note to me.' },
  { category: 'dreams', text: 'If money were no object, what would our dream home look like?' },
  { category: 'fun', text: 'Would you rather have breakfast in bed or a surprise dinner out?' },
];

const CATEGORY_COLORS: Record<string, string> = {
  fun: '#F59E0B',
  deep: '#6366F1',
  memories: '#EC4899',
  dreams: '#10B981',
  gratitude: '#F97316',
};

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export const DailyPromptScreen = () => {
  const coupleId = useAppStore((state) => state.coupleId);
  const [revealed, setRevealed] = useState(false);

  const todayPrompt = useMemo(() => {
    // Deterministic daily prompt based on day-of-year and coupleId hash
    const seed = getDayOfYear() + (coupleId?.length ?? 0);
    return PROMPTS[seed % PROMPTS.length];
  }, [coupleId]);

  const categoryColor = CATEGORY_COLORS[todayPrompt.category] ?? '#6366F1';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Daily Prompt</Text>
      <Text style={styles.subtext}>A conversation starter, just for the two of you.</Text>

      <Card>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {todayPrompt.category.toUpperCase()}
          </Text>
        </View>
        {revealed ? (
          <Text style={styles.prompt}>{todayPrompt.text}</Text>
        ) : (
          <View style={styles.hiddenPrompt}>
            <Text style={styles.hiddenText}>Tap to reveal today's prompt ✨</Text>
          </View>
        )}
      </Card>

      {!revealed ? (
        <Button title="Reveal Prompt" onPress={() => setRevealed(true)} />
      ) : (
        <View style={styles.actions}>
          <Button
            title="Share with partner 💌"
            onPress={() => {
              // In a full implementation this would use Supabase realtime
              // or share via the couple's channel
            }}
          />
          <Button title="Show next" variant="secondary" onPress={() => setRevealed(false)} />
        </View>
      )}

      <Card>
        <Text style={styles.tipTitle}>💡 How to use</Text>
        <Text style={styles.tipText}>
          A new prompt appears every day. Reveal it together or save it for your next date night.
          Answer honestly — there are no wrong answers, only deeper connections.
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#312E81',
  },
  subtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: -8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  prompt: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 32,
  },
  hiddenPrompt: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  hiddenText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  actions: {
    gap: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});
