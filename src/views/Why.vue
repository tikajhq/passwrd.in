<template>
  <div class="why-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">Why passwrd.in?</h1>
          <p class="text-xl text-primary-100">Because password generation should be simple, secure, and respect your privacy.</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <!-- Problem Statement -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">The Problem with Other Password Generators</h2>
          <div class="space-y-4 text-lg text-gray-700">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Most password generators are cluttered with ads, popups, and promotional content</p>
            </div>
            <div class="flex items-start">
              <svg class="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Some collect your generated passwords for "analytics" - a massive security risk</p>
            </div>
            <div class="flex items-start">
              <svg class="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Browser password generators sometimes fail or don't meet specific requirements</p>
            </div>
            <div class="flex items-start">
              <svg class="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <p>Limited options - you can't choose between random, memorable, or pattern-based passwords</p>
            </div>
          </div>
        </div>

        <!-- Our Solution -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">How passwrd.in Is Different</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-green-50 border border-green-200 rounded-xl p-6">
              <div class="flex items-center mb-3">
                <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-xl font-bold text-gray-900">100% Private</h3>
              </div>
              <p class="text-gray-700">All passwords generated client-side in your browser. Zero data collection, zero tracking.</p>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-xl p-6">
              <div class="flex items-center mb-3">
                <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-xl font-bold text-gray-900">No Ads, Ever</h3>
              </div>
              <p class="text-gray-700">Clean interface with zero advertisements, popups, or promotional distractions.</p>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-xl p-6">
              <div class="flex items-center mb-3">
                <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-xl font-bold text-gray-900">Multiple Methods</h3>
              </div>
              <p class="text-gray-700">Random passwords, memorable passphrases, PINs, and custom patterns - all in one place.</p>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-xl p-6">
              <div class="flex items-center mb-3">
                <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="text-xl font-bold text-gray-900">Open Source</h3>
              </div>
              <p class="text-gray-700">Fully transparent code on GitHub. Review it, contribute to it, trust it.</p>
            </div>
          </div>
        </div>

        <!-- Use Cases -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Perfect For</h2>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">System Administrators</h3>
                <p class="text-gray-700">Generate secure passwords for user accounts instead of using "temp123" or "password1".</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Developers</h3>
                <p class="text-gray-700">Quick access to secure passwords for test accounts, API keys, and development environments.</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Business Users</h3>
                <p class="text-gray-700">Create strong passwords for work accounts without dealing with complex security policies manually.</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Everyone</h3>
                <p class="text-gray-700">Anyone who needs a strong, secure password without the hassle of ads and tracking.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-12 text-center">
          <h2 class="text-4xl font-bold mb-4">Made with ❤️ to make security a little easier</h2>
          <p class="text-xl text-gray-300 mb-8">
            Passwords might be old tech, but if you're using them, you need strong ones. You know it. We know it. Let's make it simple.
          </p>
          <router-link to="/" class="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
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
