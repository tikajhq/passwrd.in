<template>
  <div class="blog-post">
    <article v-if="post" class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <router-link to="/blog" class="text-primary hover:underline text-sm">← Back to Blog</router-link>
      </nav>

      <!-- Header -->
      <header class="mb-8">
        <div class="mb-3">
          <span class="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            {{ post.category }}
          </span>
        </div>
        <h1 class="text-4xl font-bold text-foreground mb-3">{{ post.title }}</h1>
        <div class="flex items-center text-muted-foreground text-sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ post.readTime }} min read • {{ post.date }}
        </div>
      </header>

      <!-- Content -->
      <div class="prose prose-lg max-w-none" v-html="post.content"></div>

      <!-- CTA -->
      <div class="mt-8 glass-card border border-border/50 p-6 text-center">
        <h3 class="text-xl font-bold text-foreground mb-3">Ready to secure your accounts?</h3>
        <p class="text-muted-foreground mb-4 text-sm">Generate a strong, memorable password now.</p>
        <router-link to="/" class="btn-primary inline-block px-6 py-2.5 text-sm font-semibold">
          Generate Password Now →
        </router-link>
      </div>
    </article>

    <div v-else class="container mx-auto px-4 py-12 text-center">
      <h1 class="text-2xl font-bold text-foreground mb-3">Post Not Found</h1>
      <router-link to="/blog" class="text-primary hover:underline text-sm">← Back to Blog</router-link>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

export default {
  name: 'BlogPost',
  setup() {
    const route = useRoute();
    const post = ref(null);
    const md = new MarkdownIt();

    watchEffect(() => {
      const slug = route.params.slug;
      try {
        const postsContext = require.context('@/posts', false, /\.md$/);
        const key = `./${slug}.md`;
        
        if (postsContext.keys().includes(key)) {
          const content = postsContext(key).default;
          const { data, content: markdownContent } = matter(content);
          post.value = {
            ...data,
            content: md.render(markdownContent)
          };
        } else {
          post.value = null;
        }
      } catch (e) {
        console.error(e);
        post.value = null;
      }
    });

    return {
      post
    };
  }
};
</script>

<style scoped>
.prose :deep(h2) {
  @apply text-2xl font-bold text-foreground mt-6 mb-3;
}

.prose :deep(h3) {
  @apply text-xl font-bold text-foreground mt-5 mb-2;
}

.prose :deep(p) {
  @apply text-muted-foreground leading-relaxed mb-3 text-sm;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-3 pl-5;
}

.prose :deep(li) {
  @apply text-muted-foreground mb-1.5 text-sm;
}

.prose :deep(code) {
  @apply bg-muted px-2 py-0.5 rounded text-xs font-sans text-primary;
}

.prose :deep(strong) {
  @apply font-semibold text-foreground;
}
</style>
