<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :readonly="readonly"
        :class="inputClasses"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <slot name="suffix"></slot>
    </div>
    <p v-if="helperText" class="text-sm text-gray-500">{{ helperText }}</p>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    placeholder: String,
    helperText: String,
    error: String,
    readonly: Boolean
  },
  computed: {
    inputClasses() {
      const base = 'w-full px-4 py-3 rounded-lg border transition-all outline-none';
      const error = this.error 
        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
        : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent';
      const readonly = this.readonly ? 'bg-gray-50 cursor-default' : '';
      
      return `${base} ${error} ${readonly}`;
    }
  }
};
</script>
