<template>
  <header class="glass-header sticky top-0 z-50 border-b border-border/50">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 group">
          <Icon icon="lucide:lock" class="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
          <span class="text-xl font-bold text-foreground">passwrd<span class="text-primary">.in</span></span>
        </router-link>
        
        <div class="hidden md:flex items-center gap-6">
          <router-link to="/" class="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">Generate</router-link>
          <router-link to="/blog" class="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">Blog</router-link>
          <router-link to="/why" class="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">Why</router-link>
        </div>
        
        <button @click="toggleMenu" class="md:hidden text-foreground">
          <Icon :icon="menuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
        </button>
      </div>
      
      <div v-if="menuOpen" class="md:hidden mt-3 pb-3 space-y-1">
        <router-link to="/" class="block py-1.5 text-sm text-muted-foreground hover:text-foreground font-medium" @click="menuOpen = false">Generate</router-link>
        <router-link to="/blog" class="block py-1.5 text-sm text-muted-foreground hover:text-foreground font-medium" @click="menuOpen = false">Blog</router-link>
        <router-link to="/why" class="block py-1.5 text-sm text-muted-foreground hover:text-foreground font-medium" @click="menuOpen = false">Why</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'Header',
  components: {
    Icon
  },
  setup() {
    const menuOpen = ref(false);
    
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    
    return {
      menuOpen,
      toggleMenu
    };
  }
};
</script>

<style scoped>
.router-link-active {
  @apply text-primary;
}
</style>
