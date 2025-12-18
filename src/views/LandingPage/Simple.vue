<template>
  <div class="space-y-4">
    <!-- Generated Password -->
    <PasswordResult
      :value="password"
      label="Generated Simple Password"
      description="Straightforward random character password."
      save-type="simple"
    />

    <!-- Controls -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-1.5">
        Password Length: {{ length }}
      </label>
      <input
        type="range"
        v-model.number="length"
        min="4"
        max="40"
        class="slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
      />
      <div class="flex justify-between text-xs text-muted-foreground mt-1">
        <span>4</span>
        <span>40</span>
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
      <h4 class="font-semibold text-foreground mb-1.5 text-sm">Simple Passwords</h4>
      <p class="text-xs text-muted-foreground">
        Random mix of letters, numbers, and special characters. Quick and secure!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import PasswordResult from '../../components/ui/PasswordResult.vue';

const password = ref('');
const length = ref(10);

const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*^%?';

const generatePassword = () => {
  const array = new Uint32Array(length.value);
  crypto.getRandomValues(array);
  
  let result = '';
  for (let i = 0; i < length.value; i++) {
    result += charset.charAt(array[i] % charset.length);
  }
  
  password.value = result;
};

watch(length, generatePassword);
onMounted(generatePassword);
</script>
