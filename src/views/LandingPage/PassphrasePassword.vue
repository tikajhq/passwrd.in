<template>
  <div class="space-y-3">
    <!-- Generated Passphrase -->
    <PasswordResult
      :value="passphrase"
      label="Generated Passphrase"
      save-type="passphrase"
    />

    <!-- Controls -->
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">
          Number of Words: {{ wordCount }}
        </label>
        <input
          type="range"
          v-model.number="wordCount"
          min="3"
          max="8"
          class="slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-muted-foreground mt-1">
          <span>3</span>
          <span>8</span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">Separator</label>
        <select
          v-model="separator"
          class="w-full px-3 h-[42px] bg-input border border-border  focus:border-primary focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] text-foreground text-sm font-sans rounded-lg"
        >
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
          <option value=".">Period (.)</option>
          <option value=" ">Space ( )</option>
          <option value="">No separator</option>
        </select>
      </div>
    </div>

    <!-- Options -->
    <div class="space-y-2">
      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="capitalize" class="w-3.5 h-3.5 accent-primary">
        <span class="text-xs text-foreground font-sans">Capitalize each word</span>
      </label>
      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="includeNumber" class="w-3.5 h-3.5 rounded accent-primary">
        <span class="text-xs text-foreground">Add a number at the end</span>
      </label>
    </div>

    <!-- Generate Button -->
    <button
      @click="generatePassphrase"
      class="btn-primary w-full text-base font-semibold"
    >
      Generate New Passphrase
    </button>

    <!-- Info Box -->
    <div class="glass-card border border-border/50 p-3">
      <h4 class="font-semibold text-foreground mb-1.5 text-sm">Why Use Passphrases?</h4>
      <p class="text-xs text-muted-foreground">
        Passphrases are easier to remember than random characters, yet highly secure when using 4+ random words. 
        A 4-word passphrase has over 1 million possible combinations!
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import PasswordResult from '../../components/ui/PasswordResult.vue';
import WordsList from './words.json';

export default {
  name: 'PassphrasePassword',
  components: {
    PasswordResult
  },
  setup() {
    const passphrase = ref('');
    const wordCount = ref(4);
    const separator = ref('-');
    const capitalize = ref(true);
    const includeNumber = ref(false);


    const generatePassphrase = () => {
      const words = [];
      const array = new Uint32Array(wordCount.value);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < wordCount.value; i++) {
        let word = WordsList[array[i] % WordsList.length];
        if (capitalize.value) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        words.push(word);
      }
      
      let result = words.join(separator.value);
      
      if (includeNumber.value) {
        const num = Math.floor(Math.random() * 9999);
        result += (separator.value || '') + num;
      }
      
      passphrase.value = result;
    };

    watch([wordCount, separator, capitalize, includeNumber], generatePassphrase);
    onMounted(generatePassphrase);

    return {
      passphrase,
      wordCount,
      separator,
      capitalize,
      includeNumber,
      generatePassphrase
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
