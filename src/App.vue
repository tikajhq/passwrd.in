<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Header/>
    <main class="flex-grow">
      <router-view/>
    </main>
    <footer class="glass-section mt-12 py-8 border-t">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-base font-bold mb-2 text-foreground">passwrd.in</h3>
            <p class="text-muted-foreground text-xs leading-relaxed">Secure, private, and simple password generation. No ads, no tracking, no nonsense.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-2 text-foreground text-sm">Quick Links</h4>
            <ul class="space-y-1.5 text-xs text-muted-foreground">
              <li><router-link to="/" class="hover:text-primary transition-colors">Generate Password</router-link></li>
              <li><router-link to="/blog" class="hover:text-primary transition-colors">Security Blog</router-link></li>
              <li><router-link to="/why" class="hover:text-primary transition-colors">Why Use passwrd.in</router-link></li>
              <li><router-link to="/code" class="hover:text-primary transition-colors">Developer API</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-2 text-foreground text-sm">Open Source</h4>
            <p class="text-xs text-muted-foreground mb-2">100% open source and transparent</p>
            <a href="https://github.com/tikajhq/passwrd.in" target="_blank" class="text-primary hover:text-primary/80 text-xs transition-colors inline-flex items-center gap-1">
              View on GitHub →
            </a>
          </div>
        </div>
        <div class="border-t border-border/30 mt-6 pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {{ (new Date()).getFullYear() }} passwrd.in - All passwords generated client-side</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>
