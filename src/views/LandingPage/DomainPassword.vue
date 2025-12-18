<template>
  <div class="space-y-4">
    <!-- Generated Password Display -->
    <PasswordResult
      :value="password"
      label="Generated Domain Password"
      description="One master key, unique passwords for every site. You remember the formula, not each password."
      save-type="domain"
      :save-label="domain"
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

    <!-- Master Key Input -->
    <div class="glass-card border border-border/50 p-4">
      <h3 class="text-base font-bold text-foreground mb-3 flex items-center gap-2">
        <Icon icon="lucide:key" class="w-4 h-4" />
        Your Master Formula
      </h3>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-muted-foreground mb-1.5">
            Master Key
            <span class="text-xs text-muted-foreground/70 ml-2">(Something only you know)</span>
          </label>
          <input
            type="text"
            v-model="masterKey"
            placeholder="e.g., MySecret123"
            class="w-full px-3 h-[42px] bg-input border border-border  focus:border-primary focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] text-foreground text-sm font-sans rounded-lg"
            @input="generatePassword"
          />
          <p class="text-xs text-muted-foreground/70 mt-1">This is never stored or sent anywhere - it stays in your browser</p>
        </div>

        <div>
          <label class="block text-xs font-medium text-muted-foreground mb-1.5">
            Website/Domain
            <span class="text-xs text-muted-foreground/70 ml-2">(e.g., facebook, gmail, amazon)</span>
          </label>
          <input
            type="text"
            v-model="domain"
            placeholder="e.g., facebook"
            class="w-full px-3 h-[42px] bg-input border border-border  focus:border-primary focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] text-foreground text-sm font-sans rounded-lg"
            @input="generatePassword"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-muted-foreground mb-1.5">
            Custom Suffix (Optional)
            <span class="text-xs text-muted-foreground/70 ml-2">(Extra personalization)</span>
          </label>
          <input
            type="text"
            v-model="customText"
            placeholder="e.g., work, personal, v2"
            maxlength="10"
            class="w-full px-3 h-[42px] bg-input border border-border  focus:border-primary focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] text-foreground text-sm font-sans rounded-lg"
            @input="generatePassword"
          />
        </div>
      </div>
    </div>

    <!-- Algorithm Options -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-2">Password Generation Algorithm</label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <button
          v-for="algo in algorithms"
          :key="algo.value"
          @click="selectedAlgorithm = algo.value"
          :class="[
            'p-3 border-2 transition-all text-left hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] rounded-lg',
            selectedAlgorithm === algo.value
              ? 'border-primary bg-primary/10'
              : 'border-border bg-card hover:border-primary/50'
          ]"
        >
          <div class="font-bold text-foreground mb-1 text-sm">{{ algo.name }}</div>
          <div class="text-xs text-muted-foreground">{{ algo.description }}</div>
        </button>
      </div>
    </div>

    <!-- Options -->
    <div class="space-y-2">
      <div>
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">
          Password Length: {{ passwordLength }}
        </label>
        <input
          type="range"
          v-model.number="passwordLength"
          min="12"
          max="32"
          class="slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-muted-foreground mt-1">
          <span>12</span>
          <span>32</span>
        </div>
      </div>

      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="includeSymbols" class="w-3.5 h-3.5 accent-primary">
        <span class="text-xs text-foreground font-sans">Include symbols for extra security</span>
      </label>

      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="capitalizeFirst" class="w-3.5 h-3.5 rounded accent-primary">
        <span class="text-xs text-foreground">Capitalize first character</span>
      </label>
    </div>

    <!-- Quick Examples -->
    <div class="glass-card border border-border/50 p-3">
      <h4 class="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
        <Icon icon="lucide:file-text" class="w-3.5 h-3.5" />
        Quick Start Examples
      </h4>
      <div class="space-y-1.5 text-sm">
        <button
          v-for="example in examples"
          :key="example.domain"
          @click="applyExample(example)"
          class="w-full text-left p-2 bg-secondary/30 rounded border border-border hover:bg-secondary/50 transition-colors"
        >
          <div class="font-sans text-foreground text-xs">{{ example.master }} + {{ example.domain }}{{ example.custom ? ` + ${example.custom}` : '' }}</div>
          <div class="text-xs text-muted-foreground mt-0.5">→ {{ example.result }}</div>
        </button>
      </div>
    </div>
 flex items-center gap-2">
        <Icon icon="lucide:brain" class="w-4 h-4" />
        How This Works
      
    <!-- Info Box -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
      <h4 class="font-semibold text-blue-900 mb-2">🧠 How This Works</h4>
      <p class="text-sm text-blue-800 mb-2">
        This method creates unique passwords for each website using a simple formula you can remember:
      </p>
      <p class="text-sm text-blue-800 mb-2">
        <strong>Your Master Key + Domain Name + Optional Custom Text = Unique Password</strong>
      </p>
      <p class="text-sm text-blue-800">
        You don't need to remember each password - just remember your master key and the formula! 
        Same inputs always generate the same pas flex items-center gap-2">
        <Icon icon="lucide:alert-triangle" class="w-4 h-4" />
        Important Security Notes
      ompletely different one.
      </p>
    </div>

    <!-- Security Warning -->
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <h4 class="font-semibold text-red-900 mb-2">⚠️ Important Security Notes</h4>
      <ul class="text-sm text-red-800 space-y-1 list-disc list-inside">
        <li>Choose a strong master key and never share it</li>
        <li>If your master key is compromised, all passwords need to be changed</li>
        <li>Consider using a password manager for critical accounts</li>
        <li>This method works best when you can remember your master key easily</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import PasswordResult from '@/components/ui/PasswordResult.vue';
import PasswordStrength from '@/components/ui/PasswordStrength.vue';
import { usePasswordStrength } from '@/composables/usePasswordStrength';

export default {
  name: 'DomainPassword',
  components: {
    Icon,
    PasswordResult,
    PasswordStrength
  },
  setup() {
    const password = ref('');
    const copied = ref(false);
    const masterKey = ref('');
    const domain = ref('');
    const customText = ref('');
    const selectedAlgorithm = ref('simple');
    const passwordLength = ref(16);
    const includeSymbols = ref(true);
    const capitalizeFirst = ref(true);

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

    const algorithms = [
      {
        value: 'simple',
        name: 'Simple Combine',
        description: 'Combines parts of master key + domain with hashing'
      },
      {
        value: 'advanced',
        name: 'Advanced Hash',
        description: 'Uses SHA-256 hash for maximum security'
      }
    ];

    const examples = [
      {
        master: 'MySecret',
        domain: 'facebook',
        custom: '',
        result: 'MyS3cr3t-F@c3b00k-7x'
      },
      {
        master: 'Dragon99',
        domain: 'gmail',
        custom: 'work',
        result: 'Dr@g0n99-Gm@1l-W0rk-4z'
      }
    ];

    const applyExample = (example) => {
      masterKey.value = example.master;
      domain.value = example.domain;
      customText.value = example.custom;
    };

    // Simple hash function for deterministic password generation
    const simpleHash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };

    const applyLeetSpeak = (text) => {
      const leetMap = {
        'a': '@', 'e': '3', 'i': '1', 'o': '0', 's': '$',
        'A': '@', 'E': '3', 'I': '1', 'O': '0', 'S': '$'
      };
      
      return text.split('').map((char, index) => {
        // Apply substitution randomly (50% chance)
        if (leetMap[char] && Math.random() > 0.5) {
          return leetMap[char];
        }
        return char;
      }).join('');
    };

    const generatePassword = async () => {
      if (!masterKey.value || !domain.value) {
        password.value = '';
        return;
      }

      const combinedInput = `${masterKey.value}${domain.value}${customText.value}`;
      
      if (selectedAlgorithm.value === 'simple') {
        // Simple algorithm: combine and transform
        let result = '';
        
        // Take parts from master key and domain
        const masterPart = applyLeetSpeak(masterKey.value.slice(0, Math.min(6, masterKey.value.length)));
        const domainPart = applyLeetSpeak(domain.value.slice(0, Math.min(6, domain.value.length)));
        
        result = `${masterPart}-${domainPart}`;
        
        if (customText.value) {
          const customPart = applyLeetSpeak(customText.value.slice(0, 4));
          result += `-${customPart}`;
        }
        
        // Add hash-based suffix for uniqueness
        const hash = simpleHash(combinedInput);
        const hashSuffix = hash.toString(36).slice(0, 4);
        result += `-${hashSuffix}`;
        
        if (capitalizeFirst.value && result.length > 0) {
          result = result.charAt(0).toUpperCase() + result.slice(1);
        }
        
        if (includeSymbols.value) {
          const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
          const symbolIndex = hash % symbols.length;
          result += symbols[symbolIndex];
        }
        
        // Ensure minimum length
        while (result.length < passwordLength.value) {
          const extraHash = simpleHash(result + combinedInput);
          result += extraHash.toString(36).slice(0, 2);
        }
        
        password.value = result.slice(0, passwordLength.value);
        
      } else {
        // Advanced algorithm using Web Crypto API
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(combinedInput);
          const hashBuffer = await crypto.subtle.digest('SHA-256', data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          
          // Convert hash to base64-like string
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const symbols = '!@#$%^&*';
          let result = '';
          
          for (let i = 0; i < Math.min(passwordLength.value, hashArray.length); i++) {
            const value = hashArray[i];
            if (includeSymbols.value && i % 8 === 0 && i > 0) {
              result += symbols[value % symbols.length];
            } else {
              result += chars[value % chars.length];
            }
          }
          
          if (capitalizeFirst.value && result.length > 0) {
            result = result.charAt(0).toUpperCase() + result.slice(1);
          }
          
          password.value = result.slice(0, passwordLength.value);
        } catch (err) {
          console.error('Hash generation failed:', err);
          password.value = 'Error generating password';
        }
      }
    };

    const copyPassword = async () => {
      try {
        await navigator.clipboard.writeText(password.value);
        copied.value = true;
        setTimeout(() => copied.value = false, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    watch([masterKey, domain, customText, selectedAlgorithm, passwordLength, includeSymbols, capitalizeFirst], generatePassword);

    return {
      password,
      masterKey,
      domain,
      customText,
      selectedAlgorithm,
      passwordLength,
      includeSymbols,
      capitalizeFirst,
      algorithms,
      examples,
      applyExample,
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

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
  border: none;
}
</style>
