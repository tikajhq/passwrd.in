<template>
  <div v-if="savedPasswords.length > 0" class="mt-8 bg-card border border-border rounded-lg p-6">
    <h3 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <Icon icon="lucide:save" class="w-5 h-5" />
      Saved Passwords (24h)
    </h3>
    <div class="space-y-3">
      <div v-for="item in savedPasswords" :key="item.id" class="flex items-center justify-between p-3 bg-muted clip-corner">
        <div class="flex-1 min-w-0 mr-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-semibold text-primary ">{{ item.type }}</span>
            <span class="text-xs text-muted-foreground">{{ formatTime(item.timestamp) }}</span>
          </div>
          <div class="font-sans text-sm truncate select-all">{{ item.password }}</div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="copy(item.password)" class="p-2 text-muted-foreground hover:text-primary transition-colors" title="Copy">
            <Icon icon="lucide:copy" class="w-4 h-4" />
          </button>
          <button @click="removePassword(item.id)" class="p-2 text-muted-foreground hover:text-destructive transition-colors" title="Remove">
            <Icon icon="lucide:trash-2" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import { useSavedPasswords } from '@/composables/useSavedPasswords';

export default {
  name: 'SavedPasswords',
  components: { Icon },
  setup() {
    const { savedPasswords, removePassword } = useSavedPasswords();

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const copy = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return {
      savedPasswords,
      removePassword,
      formatTime,
      copy
    };
  }
};
</script>