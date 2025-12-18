<template>
  <section class="py-8">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl font-bold text-center text-foreground mb-6">{{ heading }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoSection',
  props: {
    heading: String
  }
};
</script>
