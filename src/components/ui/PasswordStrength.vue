<template>
  <div v-if="password" class="border border-border clip-corner p-4 bg-secondary/20">
    <div class="flex items-center justify-between mb-2">
      <label class="block text-xs font-medium text-foreground">Password Strength</label>
      <span class="text-2xl">{{ strengthEmoji }}</span>
    </div>
    <div class="flex items-center gap-3 mb-2">
      <div class="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
        <div
          :class="strengthColor"
          :style="{width: `${strengthPercent}%`}"
          class="h-full transition-all duration-500"
        ></div>
      </div>
      <span :class="strengthTextColor" class="font-bold text-sm min-w-[80px]">
        {{ strengthText }}
      </span>
    </div>
    <p class="text-xs text-muted-foreground leading-relaxed">{{ strengthMessage }}</p>
    <div class="flex gap-2 mt-2 flex-wrap">
      <span v-if="hasUppercase" class="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">ABC</span>
      <span v-if="hasLowercase" class="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">abc</span>
      <span v-if="hasNumbers" class="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">123</span>
      <span v-if="hasSymbols" class="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">!@#</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordStrength',
  props: {
    password: {
      type: String,
      required: true
    },
    strengthPercent: {
      type: Number,
      required: true
    },
    strengthText: {
      type: String,
      required: true
    },
    strengthColor: {
      type: String,
      required: true
    },
    strengthTextColor: {
      type: String,
      required: true
    },
    strengthEmoji: {
      type: String,
      required: true
    },
    strengthMessage: {
      type: String,
      required: true
    },
    hasUppercase: {
      type: Boolean,
      required: true
    },
    hasLowercase: {
      type: Boolean,
      required: true
    },
    hasNumbers: {
      type: Boolean,
      required: true
    },
    hasSymbols: {
      type: Boolean,
      required: true
    }
  }
};
</script>
