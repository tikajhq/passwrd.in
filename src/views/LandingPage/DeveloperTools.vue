<template>
  <div class="space-y-4">
    <!-- Generated Result Display -->
    <PasswordResult
      :value="result"
      label="Generated Result"
      description="Cryptographically secure random generation. Client-side only."
      save-type="developer"
    />

    <!-- Developer Presets -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-2">Common Developer Tools</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          @click="generateApiKey"
          class="btn-secondary text-sm py-3 h-auto flex flex-col items-start"
        >
          <span class="font-semibold">API Key</span>
          <span class="text-xs text-muted-foreground">32 alphanumeric</span>
        </button>
        <button
          @click="generateUUID"
          class="btn-secondary text-sm py-3 h-auto flex flex-col items-start"
        >
          <span class="font-semibold">UUID v4</span>
          <span class="text-xs text-muted-foreground">RFC 4122</span>
        </button>
        <button
          @click="generateToken"
          class="btn-secondary text-sm py-3 h-auto flex flex-col items-start"
        >
          <span class="font-semibold">Token</span>
          <span class="text-xs text-muted-foreground">64 URL-safe</span>
        </button>
        <button
          @click="generateSecret"
          class="btn-secondary text-sm py-3 h-auto flex flex-col items-start"
        >
          <span class="font-semibold">Secret</span>
          <span class="text-xs text-muted-foreground">256 hex</span>
        </button>
        <button
          @click="generateJWT"
          class="btn-secondary text-sm py-3 h-auto flex flex-col items-start"
        >
          <span class="font-semibold">JWT Secret</span>
          <span class="text-xs text-muted-foreground">256-bit HS256</span>
        </button>
        <button
          @click="generateHash"
          class="btn-secondary text-sm py-3 h-auto flex flex-col items-start"
        >
          <span class="font-semibold">Random Hash</span>
          <span class="text-xs text-muted-foreground">SHA-256 like</span>
        </button>
      </div>
    </div>

    <!-- Custom Length Generator -->
    <div class="border border-border clip-corner p-4 bg-secondary/20">
      <label class="block text-xs font-medium text-muted-foreground mb-3">Custom Alphanumeric</label>
      <div class="flex gap-2 mb-3">
        <div class="flex-1">
          <label class="block text-xs text-muted-foreground mb-1">Length</label>
          <input
            type="number"
            v-model.number="customLength"
            min="1"
            max="512"
            class="input-field w-full"
          />
        </div>
        <div class="flex-1">
          <label class="block text-xs text-muted-foreground mb-1">Format</label>
          <select v-model="customFormat" class="input-field w-full">
            <option value="alphanumeric">Alphanumeric</option>
            <option value="hex">Hexadecimal</option>
            <option value="base64">Base64</option>
          </select>
        </div>
      </div>
      <button
        @click="generateCustom"
        class="btn-primary w-full"
      >
        Generate Custom
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import PasswordResult from '../../components/ui/PasswordResult.vue';

export default {
  name: 'DeveloperTools',
  components: {
    PasswordResult
  },
  setup() {
    const result = ref('');
    const customLength = ref(32);
    const customFormat = ref('alphanumeric');

    const generateApiKey = () => {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let output = '';
      const array = new Uint32Array(32);
      crypto.getRandomValues(array);
      for (let i = 0; i < 32; i++) {
        output += charset[array[i] % charset.length];
      }
      result.value = output;
    };

    const generateUUID = () => {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      array[6] = (array[6] & 0x0f) | 0x40;
      array[8] = (array[8] & 0x3f) | 0x80;
      const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      result.value = `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
    };

    const generateToken = () => {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      let output = '';
      const array = new Uint32Array(64);
      crypto.getRandomValues(array);
      for (let i = 0; i < 64; i++) {
        output += charset[array[i] % charset.length];
      }
      result.value = output;
    };

    const generateSecret = () => {
      const array = new Uint8Array(128);
      crypto.getRandomValues(array);
      result.value = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const generateJWT = () => {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      result.value = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const generateHash = () => {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      result.value = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const generateCustom = () => {
      const len = Math.min(Math.max(customLength.value, 1), 512);
      
      if (customFormat.value === 'hex') {
        const array = new Uint8Array(Math.ceil(len / 2));
        crypto.getRandomValues(array);
        result.value = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').slice(0, len);
      } else if (customFormat.value === 'base64') {
        const array = new Uint8Array(Math.ceil(len * 3 / 4));
        crypto.getRandomValues(array);
        result.value = btoa(String.fromCharCode.apply(null, array)).slice(0, len);
      } else {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let output = '';
        const array = new Uint32Array(len);
        crypto.getRandomValues(array);
        for (let i = 0; i < len; i++) {
          output += charset[array[i] % charset.length];
        }
        result.value = output;
      }
    };

    return {
      result,
      customLength,
      customFormat,
      generateApiKey,
      generateUUID,
      generateToken,
      generateSecret,
      generateJWT,
      generateHash,
      generateCustom
    };
  }
};
</script>
