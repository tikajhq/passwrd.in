<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <label v-if="label" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <span class="text-sm font-medium text-primary-600">{{ value }}</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="value"
      :step="step"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      class="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <div class="flex justify-between text-xs text-gray-500">
      <span>{{ minLabel }}</span>
      <span>{{ maxLabel }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSlider',
  props: {
    label: String,
    value: [Number, String],
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    minLabel: String,
    maxLabel: String
  }
};
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
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

.slider::-webkit-slider-thumb:hover {
  background: #0369a1;
}

.slider::-moz-range-thumb:hover {
  background: #0369a1;
}
</style>
