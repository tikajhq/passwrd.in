<template>
  <div class="space-y-4">
    <!-- Generated Password -->
    <PasswordResult
      :value="password"
      label="Generated Password"
      description="Create passwords from your own pattern or template."
      save-type="custom"
    />

    <!-- Password Strength Indicator -->
    <PasswordStrength
      :strengthPercent="strengthPercent"
      :strengthText="strengthText"
      :strengthColor="strengthColor"
      :strengthTextColor="strengthTextColor"
      :strengthEmoji="strengthEmoji"
      :strengthMessage="strengthMessage"
      :hasUppercase="hasUppercase"
      :hasLowercase="hasLowercase"
      :hasNumbers="hasNumbers"
      :hasSymbols="hasSymbols"
      :password="password"
    />

    <!-- Pattern Input -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-1.5">Password Pattern</label>
      <input
        type="text"
        v-model="pattern"
        placeholder="e.g., LLLL-dddd-SSSS"
        class="w-full px-3 h-[42px] bg-input border border-border  focus:border-primary focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] font-sans text-foreground text-sm rounded-lg"
      />
      <p class="text-xs text-muted-foreground mt-1.5">
        Use: <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">L</code> = , 
        <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">l</code> = lowercase, 
        <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">d</code> = digit, 
        <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">S</code> = symbol
      </p>
    </div>

    <!-- Pattern Examples -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-2">Quick Patterns</label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <button
          v-for="example in examples"
          :key="example.pattern"
          @click="pattern = example.pattern"
          class="text-left p-2.5 border border-border hover:border-primary hover:bg-secondary/50 hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] transition-all rounded-lg"
        >
          <div class="font-sans text-xs font-semibold text-primary">{{ example.pattern }}</div>
          <div class="text-xs text-muted-foreground mt-0.5">{{ example.description }}</div>
        </button>
      </div>
    </div>

    <!-- Generate Button -->
    <button
      @click="generatePassword"
      :disabled="!pattern"
      class="btn-primary w-full text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate from Pattern
    </button>

    <!-- Info Box -->
    <div class="glass-card border border-border/50 p-3">
      <h4 class="font-semibold text-foreground mb-1.5 text-sm">Custom Patterns</h4>
      <p class="text-xs text-muted-foreground">
        Perfect for websites with specific password requirements. Define your own structure and let us fill in the random characters!
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import PasswordResult from '../../components/ui/PasswordResult.vue';
import PasswordStrength from '../../components/ui/PasswordStrength.vue';
import { usePasswordStrength } from '../../composables/usePasswordStrength';

export default {
  name: 'CustomPassword',
  components: {
    PasswordResult,
    PasswordStrength
  },
  setup() {
    const password = ref('');
    const pattern = ref('LLLLddddSSS');

    // Password strength calculation
    const {
      strengthPercent,
      strengthText,
      strengthColor,
      strengthTextColor,
      strengthEmoji,
      strengthMessage,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols
    } = usePasswordStrength(password);

    const examples = [
      { pattern: 'LLLLddddSSS', description: '4  + 4 digits + 3 symbols' },
      { pattern: 'lllllldddd', description: '6 lowercase + 4 digits' },
      { pattern: 'LLdd-LLdd-LLdd', description: 'Format: XX00-XX00-XX00' },
      { pattern: 'Lllllldd!', description: 'Capital + 6 lowercase + 2 digits + !' }
    ];

    const charsets = {
      'L': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'l': 'abcdefghijklmnopqrstuvwxyz',
      'd': '0123456789',
      'S': '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const generatePassword = () => {
      if (!pattern.value) return;
      
      let result = '';
      const array = new Uint32Array(pattern.value.length);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < pattern.value.length; i++) {
        const char = pattern.value[i];
        const charset = charsets[char];
        
        if (charset) {
          result += charset[array[i] % charset.length];
        } else {
          result += char; // Keep literal characters like hyphens
        }
      }
      
      password.value = result;
    };

    watch(pattern, generatePassword);
    generatePassword();

    return {
      password,
      pattern,
      examples,
      generatePassword,
      strengthPercent,
      strengthText,
      strengthColor,
      strengthTextColor,
      strengthEmoji,
      strengthMessage,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols
    };
  }
};
</script>
