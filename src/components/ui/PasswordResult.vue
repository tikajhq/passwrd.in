<template>
  <div class="relative">
    <label v-if="label" class="block text-xs font-sans font-bold text-foreground mb-1.5  tracking-wider">{{ label }}</label>
    <div class="flex gap-2">
      <input
        type="text"
        :value="value"
        readonly
        :class="[
          'flex-1 px-3 h-[42px] font-sans transition-all text-foreground rounded-lg',
          'bg-input',
          'border border-border ',
          'focus:border-border focus:shadow-[0_0_0_3px_rgba(88,28,135,0.15)]',
          variant === 'pin' ? 'text-2xl text-center tracking-widest' : 'text-base'
        ]"
      />
      <div class="flex items-center gap-1 px-3 bg-secondary/50 border border-border clip-corner text-muted-foreground text-xs font-medium min-w-[50px] justify-center">
        <Icon icon="lucide:ruler" class="w-3.5 h-3.5" />
        <span>{{ value.length }}</span>
      </div>
      <button
        @click="copy"
        class="btn-primary flex items-center gap-2 group whitespace-nowrap"
      >
        <Icon v-if="!copied" icon="lucide:copy" class="w-4 h-4" />
        <Icon v-else icon="lucide:check" class="w-4 h-4" />
        <span class="text-xs">{{ copied ? 'COPIED' : 'COPY' }}</span>
      </button>
      <button
        @click="save"
        class="btn-secondary flex items-center gap-1.5 px-3"
        title="Save for 24h"
      >
        <Icon icon="lucide:save" class="w-4 h-4" />
      </button>
    </div>
    <p v-if="description" class="text-xs text-muted-foreground mt-1.5 font-sans">{{ description }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useSavedPasswords } from '@/composables/useSavedPasswords';

export default {
  name: 'PasswordResult',
  components: {
    Icon
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Generated Password'
    },
    description: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'pin'].includes(value)
    },
    saveType: {
      type: String,
      required: true
    },
    saveLabel: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const copied = ref(false);
    const { addPassword } = useSavedPasswords();

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(props.value);
        copied.value = true;
        setTimeout(() => copied.value = false, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const save = () => {
      addPassword(props.value, props.saveType, props.saveLabel);
    };

    return {
      copied,
      copy,
      save
    };
  }
};
</script>
