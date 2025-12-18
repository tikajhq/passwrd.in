<template>
  <div class="space-y-4">
    <!-- Generated PIN -->
    <PasswordResult
      :value="pin"
      label="Generated PIN"
      description="Perfect for phone locks, bank cards, and security codes."
      variant="pin"
      save-type="pin"
    />

    <!-- Controls -->
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">
          PIN Length: {{ length }} digits
        </label>
        <input
          type="range"
          v-model.number="length"
          min="4"
          max="12"
          class="slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-muted-foreground mt-1">
          <span>4</span>
          <span>12</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <button
          @click="length = 4"
          class="py-2 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-all text-xs font-medium text-foreground"
        >
          4-digit PIN
        </button>
        <button
          @click="length = 6"
          class="py-2 border border-border rounded-lg hover:border-primary hover:bg-secondary/50 transition-all text-xs font-medium text-foreground"
        >
          6-digit PIN
        </button>
      </div>
    </div>

    <!-- Options -->
    <div class="space-y-2">
      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="noRepeats" class="w-3.5 h-3.5 accent-primary">
        <span class="text-xs text-foreground font-sans">Avoid repeating digits (e.g., no 1111 or 2222)</span>
      </label>
      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="noSequential" class="w-3.5 h-3.5 rounded accent-primary">
        <span class="text-xs text-foreground">Avoid sequential digits (e.g., no 1234 or 4321)</span>
      </label>
    </div>

    <!-- Generate Button -->
    <button
      @click="generatePin"
      class="btn-primary w-full text-base font-semibold"
    >
      Generate New PIN
    </button>

    <!-- Warning Box -->
    <div class="glass-card border border-amber-500/30 p-3 bg-amber-500/5">
      <h4 class="font-semibold text-amber-300 mb-1.5 flex items-center gap-2 text-sm">
        <Icon icon="lucide:alert-triangle" class="w-3.5 h-3.5" />
        Security Note
      </h4>
      <p class="text-xs text-amber-200/80">
        While convenient, PINs are less secure than passwords. Use them only where required (phone locks, cards). 
        Never use birthdays, anniversaries, or obvious patterns like 1234.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import PasswordResult from '@/components/ui/PasswordResult.vue';

export default {
  name: 'PinPassword',
  components: {
    Icon,
    PasswordResult
  },
  setup() {
    const pin = ref('');
    const length = ref(6);
    const noRepeats = ref(true);
    const noSequential = ref(true);
    const copied = ref(false);

    const hasRepeatingDigits = (pinStr) => {
      return /(.)\1{2,}/.test(pinStr);
    };

    const hasSequentialDigits = (pinStr) => {
      for (let i = 0; i < pinStr.length - 2; i++) {
        const a = parseInt(pinStr[i]);
        const b = parseInt(pinStr[i + 1]);
        const c = parseInt(pinStr[i + 2]);
        
        if (b === a + 1 && c === b + 1) return true; // ascending
        if (b === a - 1 && c === b - 1) return true; // descending
      }
      return false;
    };

    const generatePin = () => {
      let attempts = 0;
      let result = '';
      
      do {
        result = '';
        const array = new Uint32Array(length.value);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < length.value; i++) {
          result += array[i] % 10;
        }
        
        attempts++;
        if (attempts > 100) {
          // Fallback if we can't generate a valid PIN
          noRepeats.value = false;
          noSequential.value = false;
          break;
        }
      } while (
        (noRepeats.value && hasRepeatingDigits(result)) ||
        (noSequential.value && hasSequentialDigits(result))
      );
      
      pin.value = result;
    };

    const copyPin = async () => {
      try {
        await navigator.clipboard.writeText(pin.value);
        copied.value = true;
        setTimeout(() => copied.value = false, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    watch([length, noRepeats, noSequential], generatePin);
    onMounted(generatePin);

    return {
      pin,
      length,
      noRepeats,
      noSequential,
      generatePin
    };
  }
};
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0284c7;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0284c7;
  cursor: pointer;
  border: none;
}
</style>
