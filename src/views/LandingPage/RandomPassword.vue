<template>
  <div class="space-y-4">
    <!-- Generated Password Display -->
    <PasswordResult
      :value="password"
      label="Generated Password"
      description="Password generated client-side. We never see or store it."
      save-type="random"
    />

    <!-- Password Strength Indicator -->
    <PasswordStrength
      :password="password"
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
    />

    <!-- Controls -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-2">
        Password Length
      </label>
      <div class="flex gap-2 items-center">
        <button
          @click="decrementLength"
          class="btn-secondary px-3 h-10 w-10 flex items-center justify-center"
          :disabled="length <= 8"
        >
          −
        </button>
        <input
          type="number"
          v-model.number="length"
          min="8"
          max="64"
          class="input-field text-center flex-1"
        />
        <button
          @click="incrementLength"
          class="btn-secondary px-3 h-10 w-10 flex items-center justify-center"
          :disabled="length >= 64"
        >
          +
        </button>
      </div>
      <div class="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Min: 8</span>
        <span>Max: 64</span>
      </div>
    </div>

    <!-- Character Options -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-2">Include Characters</label>
      <div class="grid grid-cols-2 gap-2">
        <label class="flex items-center gap-2 p-2 border border-border cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all clip-corner">
          <input type="checkbox" v-model="options.uppercase" class="w-3.5 h-3.5 accent-primary">
          <span class="text-xs text-foreground font-sans">Uppercase (A-Z)</span>
        </label>
        <label class="flex items-center gap-2 p-2 border border-border cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all clip-corner">
          <input type="checkbox" v-model="options.lowercase" class="w-3.5 h-3.5 accent-primary">
          <span class="text-xs text-foreground font-sans">Lowercase (a-z)</span>
        </label>
        <label class="flex items-center gap-2 p-2 border border-border cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all clip-corner">
          <input type="checkbox" v-model="options.numbers" class="w-3.5 h-3.5 accent-primary">
          <span class="text-xs text-foreground font-sans">Numbers (0-9)</span>
        </label>
        <label class="flex items-center gap-2 p-2 border border-border cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all clip-corner">
          <input type="checkbox" v-model="options.symbols" class="w-3.5 h-3.5 accent-primary">
          <span class="text-xs text-foreground">Symbols (!@#$%)</span>
        </label>
      </div>
    </div>

    <!-- Additional Options -->
    <div class="space-y-2">
      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all clip-corner">
        <input type="checkbox" v-model="options.noSimilar" class="w-3.5 h-3.5 accent-primary">
        <span class="text-xs text-foreground font-sans">Avoid similar characters (i, l, 1, L, o, 0, O)</span>
      </label>
      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-secondary/70 hover:border-foreground/20 transition-all clip-corner">
        <input type="checkbox" v-model="options.noAmbiguous" class="w-3.5 h-3.5 accent-primary">
        <span class="text-xs text-foreground">Avoid ambiguous symbols</span>
      </label>
    </div>

    <!-- Generate Button -->
    <button
      @click="generatePassword"
      class="btn-primary w-full text-base font-semibold"
    >
      Generate New Password
    </button>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import PasswordResult from '../../components/ui/PasswordResult.vue';
import PasswordStrength from '../../components/ui/PasswordStrength.vue';
import { usePasswordStrength } from '../../composables/usePasswordStrength';

export default {
  name: 'RandomPassword',
  components: {
    PasswordResult,
    PasswordStrength
  },
  setup() {
    const password = ref('');
    const length = ref(20);
    const options = ref({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      noSimilar: true,
      noAmbiguous: true
    });

    const getCharset = () => {
      let charset = '';
      if (options.value.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (options.value.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (options.value.numbers) charset += '0123456789';
      if (options.value.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      if (options.value.noSimilar) {
        charset = charset.replace(/[il1Lo0O]/g, '');
      }
      if (options.value.noAmbiguous) {
        charset = charset.replace(/[{}[\]()/\\'"`~,;:.<>]/g, '');
      }
      
      return charset;
    };

    const generatePassword = () => {
      const charset = getCharset();
      if (!charset) return;
      
      let result = '';
      const array = new Uint32Array(length.value);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < length.value; i++) {
        result += charset[array[i] % charset.length];
      }
      
      password.value = result;
    };

    const incrementLength = () => {
      if (length.value < 64) {
        length.value++;
      }
    };

    const decrementLength = () => {
      if (length.value > 8) {
        length.value--;
      }
    };

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

    watch([length, options], generatePassword, { deep: true });
    onMounted(generatePassword);

    return {
      password,
      length,
      options,
      generatePassword,
      incrementLength,
      decrementLength,
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
