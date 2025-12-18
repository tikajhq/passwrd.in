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
          const module = postsContext(key);
          const content = module.default || module;
          
          // Parse frontmatter manually (same as Blog.vue)
          const lines = content.split('\n');
          let inFrontmatter = false;
          let frontmatterLines = [];
          let contentLines = [];
          let frontmatterEnded = false;
          
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
              if (!inFrontmatter) {
                inFrontmatter = true;
              } else {
                frontmatterEnded = true;
                inFrontmatter = false;
              }
            } else if (inFrontmatter) {
              frontmatterLines.push(lines[i]);
            } else if (frontmatterEnded) {
              contentLines.push(lines[i]);
            }
          }
          
          // Parse frontmatter key-value pairs
          const frontmatter = {};
          frontmatterLines.forEach(line => {
            const match = line.match(/^(\w+):\s*(.+)$/);
            if (match) {
              frontmatter[match[1]] = match[2];
            }
          });
          
          // Render markdown content
          const markdownContent = contentLines.join('\n');
          
          post.value = {
            ...frontmatter,
            content: md.render(markdownContent)
          };
        } else {
          console.error('Post not found:', key, 'Available:', postsContext.keys());
          post.value = null;
        }
      } catch (e) {
        console.error('Error loading post:', e);
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
.prose :deep(h1) {
  @apply text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0;
}

.prose :deep(h2) {
  @apply text-2xl font-bold text-foreground mt-8 mb-4 pb-2 border-b border-border/50;
}

.prose :deep(h3) {
  @apply text-xl font-bold text-foreground mt-6 mb-3;
}

.prose :deep(p) {
  @apply text-muted-foreground leading-relaxed mb-4 text-base;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-4 pl-6 space-y-2;
}

.prose :deep(li) {
  @apply text-muted-foreground text-base leading-relaxed;
}

.prose :deep(ul > li) {
  @apply list-disc;
}

.prose :deep(ol > li) {
  @apply list-decimal;
}

.prose :deep(code) {
  @apply bg-muted px-2 py-1 rounded text-sm font-mono text-primary border border-border/30;
}

.prose :deep(pre) {
  @apply bg-card border border-border rounded-lg p-4 overflow-x-auto mb-4;
}

.prose :deep(pre code) {
  @apply bg-transparent border-0 p-0;
}

.prose :deep(strong) {
  @apply font-bold text-foreground;
}

.prose :deep(em) {
  @apply italic text-foreground/90;
}

.prose :deep(a) {
  @apply text-primary hover:underline;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4;
}

.prose :deep(hr) {
  @apply border-border/50 my-8;
}

.prose :deep(table) {
  @apply w-full border-collapse mb-4;
}

.prose :deep(th) {
  @apply bg-secondary/50 border border-border px-3 py-2 text-left font-semibold text-foreground;
}

.prose :deep(td) {
  @apply border border-border px-3 py-2 text-muted-foreground;
}

/* Emoji support */
.prose :deep(p) {
  @apply break-words;
}
</style>
