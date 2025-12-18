<template>
  <div class="glass-card hover-lift group">
    <div class="flex items-start mb-3">
      <div class="flex-shrink-0">
        <Icon :icon="icon" class="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
      </div>
    </div>
    <h4 class="text-lg font-bold text-foreground mb-2">
      {{ splitHeading[0] }}
      <span class="text-primary">{{ splitHeading[1] }}</span>
    </h4>
    <p class="text-sm text-muted-foreground leading-relaxed" v-html="body"></p>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'InfoCard',
  components: { Icon },
  props: {
    heading: String,
    body: String,
    icon: String
  },
  computed: {
    splitHeading() {
      const splitHeading = this.heading.split(' ');
      const finalWord = splitHeading.pop();
      return [splitHeading.join(' '), finalWord];
    }
  }
};
</script>
