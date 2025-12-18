<template>
  <div class="space-y-3">
    <!-- Generated Password Display -->
    <PasswordResult
      :value="password"
      label="Generated Memorable Password"
      save-type="memorable"
    />

    <!-- Personalization Options -->
    <div class="glass-card border border-border/50 p-4">
      <h3 class="text-base font-bold text-foreground mb-3 flex items-center gap-2">
        <Icon icon="lucide:target" class="w-4 h-4" />
        Personalize Your Password
      </h3>
      
      <!-- Region Selection -->
      <div class="mb-3">
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">Select Your Region</label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            v-for="(region, key) in regions"
            :key="key"
            @click="selectedRegion = key"
            :class="[
              'px-3 py-2 border-2 transition-all text-xs font-medium font-sans  rounded-lg',
              selectedRegion === key
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-foreground hover:border-primary/50'
            ]"
          >
            {{ region.name }}
          </button>
        </div>
      </div>

      <!-- Interest Selection -->
      <div>
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">Select Your Interests</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            v-for="(interest, key) in interests"
            :key="key"
            @click="toggleInterest(key)"
            :class="[
              'px-2 py-1.5 border-2 transition-all text-xs font-medium font-sans  rounded-lg',
              selectedInterests.includes(key)
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-border bg-card text-foreground hover:border-green-500/50'
            ]"
          >
            {{ interest.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Hacker Substitution Options -->
    <div>
      <label class="block text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
        <Icon icon="lucide:wrench" class="w-3.5 h-3.5" />
        Hacker Substitution Level
      </label>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <button
          v-for="level in substitutionLevels"
          :key="level.value"
          @click="substitutionLevel = level.value"
          :class="[
            'p-3 border-2 transition-all text-left hover:shadow-[0_0_15px_rgba(138,43,226,0.2)] rounded-lg',
            substitutionLevel === level.value
              ? 'border-primary bg-primary/10'
              : 'border-border bg-card hover:border-primary/50'
          ]"
        >
          <div class="font-bold text-foreground mb-1 text-sm">{{ level.name }}</div>
          <div class="text-xs text-muted-foreground">{{ level.description }}</div>
          <div class="text-xs text-primary mt-1.5 font-sans">{{ level.example }}</div>
        </button>
      </div>
    </div>

    <!-- Additional Options -->
    <div class="space-y-2">
      <div>
        <label class="block text-xs font-medium text-muted-foreground mb-1.5">
          Number of Words: {{ wordCount }}
        </label>
        <input
          type="range"
          v-model.number="wordCount"
          min="2"
          max="5"
          class="slider w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-muted-foreground mt-1">
          <span>2</span>
          <span>5</span>
        </div>
      </div>

      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="addNumbers" class="w-3.5 h-3.5 accent-primary">
        <span class="text-xs text-foreground font-sans">Add numbers at the end</span>
      </label>

      <label class="flex items-center gap-2 p-2 bg-secondary/50 border border-border cursor-pointer hover:bg-gradient-to-br hover:bg-secondary/70 hover:border-border transition-all rounded-lg">
        <input type="checkbox" v-model="capitalizeFirst" class="w-3.5 h-3.5 rounded accent-primary">
        <span class="text-xs text-foreground">Capitalize first letter of each word</span>
      </label>
    </div>

    <!-- Generate Button -->
    <button
      @click="generatePassword"
      class="btn-primary w-full text-base font-semibold flex items-center justify-center gap-2"
    >
      <Icon icon="lucide:dices" class="w-5 h-5" />
      Generate Memorable Password
    </button>

    <!-- Info Box -->
    <div class="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
      <h4 class="font-semibold text-purple-900 mb-2 flex items-center gap-2">
        <Icon icon="lucide:lightbulb" class="w-4 h-4" />
        How This Works
      </h4>
      <p class="text-sm text-purple-800 mb-2">
        This generator creates passwords from words you're familiar with (based on your region and interests), 
        then applies hacker-style character substitutions to make them secure.
      </p>
      <p class="text-sm text-purple-800">
        <strong>Example:</strong> "Coffee" + "Mountain" → "C0ff3e-M0unt@1n" - Easy to remember, hard to crack!
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { dictionaries, leetSubstitutions } from '@/data/dictionaries.js';
import { Icon } from '@iconify/vue';
import PasswordResult from '@/components/ui/PasswordResult.vue';

export default {
  name: 'MemorablePassword',
  components: {
    Icon,
    PasswordResult
  },
  setup() {
    const password = ref('');
    const selectedRegion = ref('usa');
    const selectedInterests = ref(['tech', 'nature']);
    const substitutionLevel = ref('medium');
    const wordCount = ref(3);
    const addNumbers = ref(true);
    const capitalizeFirst = ref(true);

    const regions = computed(() => dictionaries.regions);
    const interests = computed(() => dictionaries.interests);

    const substitutionLevels = [
      {
        value: 'none',
        name: 'None',
        description: 'Just words',
        example: 'Coffee-Mountain'
      },
      {
        value: 'light',
        name: 'Light',
        description: 'Basic substitutions',
        example: 'Coff3e-Mount@in'
      },
      {
        value: 'medium',
        name: 'Medium',
        description: 'More substitutions',
        example: 'C0ff3e-M0unt@1n'
      },
      {
        value: 'heavy',
        name: 'Heavy',
        description: 'Maximum substitutions',
        example: 'C0ff€3-M0un†@1n'
      }
    ];

    const toggleInterest = (key) => {
      const index = selectedInterests.value.indexOf(key);
      if (index > -1) {
        if (selectedInterests.value.length > 1) {
          selectedInterests.value.splice(index, 1);
        }
      } else {
        selectedInterests.value.push(key);
      }
    };

    const getRandomWords = () => {
      const allWords = [];
      
      // Add region words
      if (regions.value[selectedRegion.value]) {
        allWords.push(...regions.value[selectedRegion.value].words);
      }
      
      // Add interest words
      selectedInterests.value.forEach(interest => {
        if (interests.value[interest]) {
          allWords.push(...interests.value[interest].words);
        }
      });

      // Select random words
      const selectedWords = [];
      const array = new Uint32Array(wordCount.value);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < wordCount.value; i++) {
        const word = allWords[array[i] % allWords.length];
        selectedWords.push(word);
      }
      
      return selectedWords;
    };

    const applyLeetSubstitutions = (text, level) => {
      if (level === 'none') return text;
      
      let result = text;
      const chars = result.split('');
      
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i].toLowerCase();
        const substitutions = leetSubstitutions[char];
        
        if (substitutions) {
          let shouldSubstitute = false;
          
          if (level === 'light') {
            shouldSubstitute = Math.random() < 0.3;
          } else if (level === 'medium') {
            shouldSubstitute = Math.random() < 0.5;
          } else if (level === 'heavy') {
            shouldSubstitute = Math.random() < 0.8;
          }
          
          if (shouldSubstitute) {
            const subIndex = Math.floor(Math.random() * substitutions.length);
            chars[i] = substitutions[subIndex];
          }
        }
      }
      
      return chars.join('');
    };

    const generatePassword = () => {
      const words = getRandomWords();
      
      let processedWords = words.map(word => {
        let processed = word;
        
        // Capitalize first letter if option is enabled
        if (capitalizeFirst.value) {
          processed = processed.charAt(0).toUpperCase() + processed.slice(1);
        }
        
        // Apply leet substitutions
        processed = applyLeetSubstitutions(processed, substitutionLevel.value);
        
        return processed;
      });
      
      let result = processedWords.join('-');
      
      // Add numbers if enabled
      if (addNumbers.value) {
        const num = Math.floor(Math.random() * 999) + 1;
        result += num;
      }
      
      password.value = result;
    };

    watch([selectedRegion, selectedInterests, substitutionLevel, wordCount, addNumbers, capitalizeFirst], generatePassword, { deep: true });
    onMounted(generatePassword);

    return {
      password,
      selectedRegion,
      selectedInterests,
      substitutionLevel,
      wordCount,
      addNumbers,
      capitalizeFirst,
      regions,
      interests,
      substitutionLevels,
      toggleInterest,
      generatePassword
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
  background: #9333ea;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9333ea;
  cursor: pointer;
  border: none;
}
</style>
