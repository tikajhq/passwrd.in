<template>
  <div class="space-y-4">
    <!-- Generated Password -->
    <PasswordResult
      :value="password"
      label="Generated Readable Password"
      description="Easy to read and type password using common words."
      save-type="readable"
    />

    <!-- Controls -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-1.5">
        Number of Words: {{ length }}
      </label>
      <input
        type="range"
        v-model.number="length"
        min="2"
        max="8"
        class="slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
      />
      <div class="flex justify-between text-xs text-muted-foreground mt-1">
        <span>2</span>
        <span>8</span>
      </div>
    </div>

    <!-- Generate Button -->
    <button
      @click="generatePassword"
      class="btn-primary w-full text-base font-semibold"
    >
      Generate New Password
    </button>

    <!-- Info Box -->
    <div class="glass-card border border-border/50 p-3">
      <h4 class="font-semibold text-foreground mb-1.5 text-sm">Readable Passwords</h4>
      <p class="text-xs text-muted-foreground">
        Uses common words separated by hyphens. Easy to remember and type!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import PasswordResult from '../../components/ui/PasswordResult.vue';
import WordsList from './words.json';

const password = ref('');
const length = ref(3);

const generatePassword = () => {
  const words = [];
  const array = new Uint32Array(length.value);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length.value; i++) {
    words.push(WordsList[array[i] % WordsList.length]);
  }
  
  password.value = words.join('-');
};

watch(length, generatePassword);
onMounted(generatePassword);
</script>
