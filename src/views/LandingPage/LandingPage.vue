<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="glass-section py-6 md:py-8 border-b border-border/50">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-2xl md:text-4xl font-bold text-foreground mb-2 animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Easy to Remember Password Generator<br/>
          <span class="text-primary">Hard to Guess, Simple to Use</span>
        </h1>
        <p class="text-sm text-muted-foreground">Create passwords that are easy to remember but impossible to crack</p>
      </div>
    </section>

    <!-- Password Generator Tabs -->
    <section class="container mx-auto px-4 -mt-4 mb-4">
      <div class="glass-card p-4">
        <div class="flex flex-wrap gap-1 mb-4 border-b border-border/50 pb-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="navigateToTab(tab.id)"
            :class="[
              'pb-2 px-3 text-sm font-medium transition-all inline-flex items-center gap-1.5',
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            ]"
          >
            <Icon :icon="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>

        <div class="min-h-[280px]">
          <component :is="currentTabComponent" />
        </div>
      </div>
      
      <!-- Saved Passwords Section -->
      <div class="mt-4">
        <SavedPasswords />
      </div>
    </section>

    <!-- Features Section -->
    <info-section heading="Why Choose passwrd.in?">
      <info-card
        heading="100% Open Source"
        body="Fully transparent and open-source. Review our code on GitHub and contribute to make password generation better for everyone. <br/><br/><a href='https://github.com/tikajhq/passwrd.in' class='text-primary-600 hover:underline'>View on GitHub \u2192</a>"
        icon="lucide:users"
      />
      <info-card
        heading="Privacy First"
        body="All passwords are generated directly in your browser. Nothing is sent to our servers. No tracking, no analytics, no data collection. Your passwords are yours alone."
        icon="lucide:lock"
      />
      <info-card
        heading="Simple & Fast"
        body="Clean, intuitive interface designed for speed. Generate strong passwords instantly without dealing with complex settings or annoying popups."
        icon="lucide:globe"
      />
    </info-section>

    <!-- SEO Content Section -->
    <section class="glass-section py-12 border-t border-border/50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-foreground mb-4">Secure Password Generation Made Easy</h2>
          <div class="space-y-3 text-sm text-muted-foreground">
            <p>
              In today's digital age, strong password security is more critical than ever. passwrd.in provides a free, secure, 
              and private password generator that helps you create strong, unique passwords for all your online accounts.
            </p>
            <p>
              Unlike many password generators that collect your data or require sign-up, passwrd.in runs entirely in your browser. 
              We offer multiple generation methods including random passwords, memorable passphrases, and custom pattern-based passwords 
              to suit different security requirements.
            </p>
            <p class="text-sm">
              <router-link to="/blog" class="text-primary hover:underline">Learn more about password security best practices</router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { InfoCard, InfoSection } from '../../components/InfoSection';
import MemorablePassword from './MemorablePassword.vue';
import DomainPassword from './DomainPassword.vue';
import RandomPassword from './RandomPassword.vue';
import PassphrasePassword from './PassphrasePassword.vue';
import CustomPassword from './CustomPassword.vue';
import DeveloperTools from './DeveloperTools.vue';
import SavedPasswords from './SavedPasswords.vue';

export default {
  name: 'LandingPage',
  components: {
    Icon,
    InfoSection,
    InfoCard,
    MemorablePassword,
    DomainPassword,
    RandomPassword,
    PassphrasePassword,
    CustomPassword,
    DeveloperTools,
    SavedPasswords
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeTab = ref('random');
    
    const tabs = [
      { id: 'random', label: 'Random', component: 'RandomPassword', icon: 'lucide:shuffle', path: '/' },
      { id: 'memorable', label: 'Easy to Remember', component: 'MemorablePassword', icon: 'lucide:brain', path: '/memorable' },
      { id: 'passphrase', label: 'Passphrase', component: 'PassphrasePassword', icon: 'lucide:text', path: '/passphrase' },
      { id: 'domain', label: 'Domain-Based', component: 'DomainPassword', icon: 'lucide:globe', path: '/domain' },
      { id: 'developer', label: 'Developer Tools', component: 'DeveloperTools', icon: 'lucide:code', path: '/developer' },
      { id: 'custom', label: 'Custom Pattern', component: 'CustomPassword', icon: 'lucide:settings', path: '/custom' }
    ];
    
    // Set active tab based on route
    const setTabFromRoute = () => {
      const currentPath = route.path;
      const tab = tabs.find(t => t.path === currentPath);
      if (tab) {
        activeTab.value = tab.id;
      } else {
        activeTab.value = 'random';
      }
    };
    
    // Navigate to tab
    const navigateToTab = (tabId) => {
      const tab = tabs.find(t => t.id === tabId);
      if (tab && route.path !== tab.path) {
        router.push(tab.path);
      }
    };
    
    // Watch route changes
    watch(() => route.path, setTabFromRoute, { immediate: true });
    
    const currentTabComponent = computed(() => {
      const tab = tabs.find(t => t.id === activeTab.value);
      return tab ? tab.component : 'RandomPassword';
    });
    
    return {
      activeTab,
      tabs,
      currentTabComponent,
      navigateToTab
    };
  }
};
</script>
