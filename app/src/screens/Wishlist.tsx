import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAppStore } from '../state/store';
import { track } from '../lib/analytics';

export type WishlistItem = {
  id: string;
  title: string;
  note?: string;
  addedBy: string;
  addedAt: string;
  completed: boolean;
};

export const WishlistScreen = () => {
  const profileId = useAppStore((state) => state.profileId);
  const wishlist = useAppStore((state) => state.wishlist);
  const addWish = useAppStore((state) => state.addWish);
  const toggleWish = useAppStore((state) => state.toggleWish);
  const removeWish = useAppStore((state) => state.removeWish);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleAdd = useCallback(() => {
    const trimmed = title.trim();
    if (!trimmed) return;
    addWish({
      id: `wish-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: trimmed,
      note: note.trim() || undefined,
      addedBy: profileId ?? 'me',
      addedAt: new Date().toISOString(),
      completed: false,
    });
    track('wishlist_add', { title: trimmed });
    setTitle('');
    setNote('');
  }, [title, note, profileId, addWish]);

  const handleToggle = useCallback(
    (id: string) => {
      toggleWish(id);
      track('wishlist_toggle', { id });
    },
    [toggleWish],
  );

  const handleRemove = useCallback(
    (item: WishlistItem) => {
      Alert.alert('Remove wish', `Delete "${item.title}"?`, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeWish(item.id);
            track('wishlist_remove', { id: item.id });
          },
        },
      ]);
    },
    [removeWish],
  );

  const pending = wishlist.filter((w) => !w.completed);
  const done = wishlist.filter((w) => w.completed);

  const renderItem = ({ item }: { item: WishlistItem }) => (
    <TouchableOpacity
      onPress={() => handleToggle(item.id)}
      onLongPress={() => handleRemove(item)}
      activeOpacity={0.7}
    >
      <Card>
        <View style={styles.itemRow}>
          <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
            {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
          </View>
          <View style={styles.itemContent}>
            <Text style={[styles.itemTitle, item.completed && styles.itemTitleDone]}>
              {item.title}
            </Text>
            {item.note ? <Text style={styles.itemNote}>{item.note}</Text> : null}
            <Text style={styles.itemMeta}>
              Added by {item.addedBy === profileId ? 'you' : 'partner'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shared Wishlist 💫</Text>
      <Text style={styles.subtext}>Things you want to do, buy, or experience together.</Text>

      <Card>
        <TextInput
          style={styles.input}
          placeholder="Add a wish..."
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Note (optional)"
          value={note}
          onChangeText={setNote}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
        />
        <Button title="Add wish ✨" onPress={handleAdd} disabled={!title.trim()} />
      </Card>

      {pending.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Wishes ({pending.length})</Text>
          <FlatList
            data={pending}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </>
      ) : (
        <Card>
          <Text style={styles.emptyText}>No wishes yet — add your first one above! 🌟</Text>
        </Card>
      )}

      {done.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Fulfilled ({done.length})</Text>
          <FlatList
            data={done}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
    padding: 16,
    gap: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#312E81',
  },
  subtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: -4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  noteInput: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemTitleDone: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  itemNote: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  itemMeta: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
