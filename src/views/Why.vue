<template>
  <div class="why-page">
    <!-- Hero Section -->
    <section class="glass-section py-16 border-b border-border/50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-foreground">Why passwrd.in?</h1>
          <p class="text-lg text-muted-foreground">Because password generation should be simple, secure, and respect your privacy.</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Problem Statement -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-6">The Problem with Other Password Generators</h2>
          <div class="space-y-3 text-base text-muted-foreground">
            <div class="flex items-start glass-card p-4 hover-lift">
              <svg class="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Most password generators are cluttered with ads, popups, and promotional content</p>
            </div>
            <div class="flex items-start glass-card p-4 hover-lift">
              <svg class="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Some collect your generated passwords for "analytics" - a massive security risk</p>
            </div>
            <div class="flex items-start glass-card p-4 hover-lift">
              <svg class="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Browser password generators sometimes fail or don't meet specific requirements</p>
            </div>
            <div class="flex items-start glass-card p-4 hover-lift">
              <svg class="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Limited options - you can't choose between random, memorable, or pattern-based passwords</p>
            </div>
          </div>
        </div>

        <!-- Our Solution -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-6">How passwrd.in Is Different</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="glass-card hover-lift group">
              <div class="flex items-center mb-3">
                <svg class="w-7 h-7 text-primary mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-lg font-bold text-foreground">100% Private</h3>
              </div>
              <p class="text-sm text-muted-foreground">All passwords generated client-side in your browser. Zero data collection, zero tracking.</p>
            </div>

            <div class="glass-card hover-lift group">
              <div class="flex items-center mb-3">
                <svg class="w-7 h-7 text-primary mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-lg font-bold text-foreground">No Ads, Ever</h3>
              </div>
              <p class="text-sm text-muted-foreground">Clean interface with zero advertisements, popups, or promotional distractions.</p>
            </div>

            <div class="glass-card hover-lift group">
              <div class="flex items-center mb-3">
                <svg class="w-7 h-7 text-primary mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-lg font-bold text-foreground">Multiple Methods</h3>
              </div>
              <p class="text-sm text-muted-foreground">Random passwords, memorable passphrases, PINs, and custom patterns - all in one place.</p>
            </div>

            <div class="glass-card hover-lift group">
              <div class="flex items-center mb-3">
                <svg class="w-7 h-7 text-primary mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-lg font-bold text-foreground">Open Source</h3>
              </div>
              <p class="text-sm text-muted-foreground">Fully transparent code on GitHub. Review it, contribute to it, trust it.</p>
            </div>
          </div>
        </div>

        <!-- Use Cases -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-foreground mb-6">Perfect For</h2>
          <div class="space-y-4">
            <div class="glass-card hover-lift flex items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-foreground mb-1">System Administrators</h3>
                <p class="text-sm text-muted-foreground">Generate secure passwords for user accounts instead of using "temp123" or "password1".</p>
              </div>
            </div>

            <div class="glass-card hover-lift flex items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-foreground mb-1">Developers</h3>
                <p class="text-sm text-muted-foreground">Quick access to secure passwords for test accounts, API keys, and development environments.</p>
              </div>
            </div>

            <div class="glass-card hover-lift flex items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-foreground mb-1">Business Users</h3>
                <p class="text-sm text-muted-foreground">Create strong passwords for work accounts without dealing with complex security policies manually.</p>
              </div>
            </div>

            <div class="glass-card hover-lift flex items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-foreground mb-1">Everyone</h3>
                <p class="text-sm text-muted-foreground">Anyone who needs a strong, secure password without the hassle of ads and tracking.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="glass-card border-2 border-primary/20 p-8 text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-3 text-foreground">Made with ❤️ to make security a little easier</h2>
          <p class="text-base text-muted-foreground mb-6">
            Passwords might be old tech, but if you're using them, you need strong ones. You know it. We know it. Let's make it simple.
          </p>
          <router-link to="/" class="btn-primary inline-block px-6 py-3 text-sm font-semibold">
            Generate Your Password →
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Why',
  metaInfo: {
    title: 'Why Choose passwrd.in',
    meta: [
      {
        name: 'description',
        content: 'Learn why passwrd.in is the best choice for password generation. 100% private, no ads, open source, and multiple generation methods.'
      }
    ]
  }
};
</script>
