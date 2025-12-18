<template>
  <div v-if="savedPasswords.length > 0" class="mt-8">
    <!-- Header with Count Badge -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
        <Icon icon="lucide:clock" class="w-5 h-5 text-primary" />
        Quick Access
        <span class="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-semibold">
          {{ savedPasswords.length }}
        </span>
      </h3>
      <span class="text-xs text-muted-foreground">Expires in 24h</span>
    </div>

    <!-- Saved Passwords Grid -->
    <div class="grid grid-cols-1 gap-3">
      <div 
        v-for="item in savedPasswords" 
        :key="item.id" 
        class="bg-card border border-border clip-corner p-4 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(138,43,226,0.1)] transition-all group"
      >
        <div class="flex items-start justify-between gap-4">
          <!-- Password Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-semibold uppercase">
                {{ item.type }}
              </span>
              <span class="text-xs text-muted-foreground">
                <Icon icon="lucide:clock" class="w-3 h-3 inline mr-1" />
                {{ formatTime(item.timestamp) }}
              </span>
            </div>
            <div class="font-mono text-sm text-foreground truncate select-all bg-secondary/30 px-3 py-2 rounded border border-border/50">
              {{ item.password }}
            </div>
            <div v-if="item.label && item.label !== item.type" class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Icon icon="lucide:tag" class="w-3 h-3" />
              {{ item.label }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-2">
            <button 
              @click="copyPassword(item.password)" 
              :class="[
                'p-2 rounded transition-all',
                copiedId === item.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-primary'
              ]"
              :title="copiedId === item.id ? 'Copied!' : 'Copy password'"
            >
              <Icon :icon="copiedId === item.id ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
            </button>
            <button 
              @click="removePassword(item.id)" 
              class="p-2 bg-secondary/50 text-muted-foreground hover:bg-destructive/20 hover:text-destructive rounded transition-all"
              title="Remove from quick access"
            >
              <Icon icon="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Footer -->
    <div class="mt-4 p-3 bg-secondary/20 border border-border/50 rounded-lg">
      <p class="text-xs text-muted-foreground flex items-center gap-2">
        <Icon icon="lucide:info" class="w-3.5 h-3.5" />
        Passwords are stored locally in your browser and automatically expire after 24 hours
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useSavedPasswords } from '@/composables/useSavedPasswords';

export default {
  name: 'SavedPasswords',
  components: { Icon },
  setup() {
    const { savedPasswords, removePassword } = useSavedPasswords();
    const copiedId = ref(null);

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const copyPassword = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        const id = Date.now();
        copiedId.value = id;
        setTimeout(() => {
          if (copiedId.value === id) copiedId.value = null;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return {
      savedPasswords,
      removePassword,
      formatTime,
      copyPassword,
      copiedId
    };
  }
};
</script>