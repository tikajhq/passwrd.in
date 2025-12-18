<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="glass-section py-12 border-b border-border/50">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-2 text-foreground">Security Blog</h1>
        <p class="text-base text-muted-foreground">Learn about password security, best practices, and digital safety</p>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="container mx-auto px-4 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
      <div v-else-if="blogPosts.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">No blog posts available yet.</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link
          v-for="post in blogPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="glass-card group hover-lift"
        >
          <div class="mb-2">
            <span class="inline-block px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-semibold">
              {{ post.category }}
            </span>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{{ post.title }}</h3>
          <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{{ post.excerpt }}</p>
          <div class="flex items-center text-xs text-muted-foreground">
            <Icon icon="lucide:clock" class="w-3 h-3 mr-1" />
            {{ post.readTime }} min read
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'Blog',
  components: {
    Icon
  },
  setup() {
    const blogPosts = ref([]);
    const loading = ref(true);

    const loadPosts = () => {
      try {
        // Use require.context to load all markdown files
        const postsContext = require.context('@/posts', false, /\.md$/);
        const posts = [];
        
        postsContext.keys().forEach(key => {
          try {
            const module = postsContext(key);
            const content = module.default || module;
            
            // Parse frontmatter
            const lines = content.split('\n');
            let inFrontmatter = false;
            let frontmatterLines = [];
            
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].trim() === '---') {
                if (!inFrontmatter) {
                  inFrontmatter = true;
                } else {
                  break;
                }
              } else if (inFrontmatter) {
                frontmatterLines.push(lines[i]);
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
            
            if (frontmatter.title) {
              const slug = key.replace('./', '').replace('.md', '');
              posts.push({
                ...frontmatter,
                slug
              });
            }
          } catch (err) {
            console.error('Error loading post:', key, err);
          }
        });
        
        blogPosts.value = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadPosts);

    return {
      blogPosts,
      loading
    };
  },
  metaInfo: {
    title: 'Password Security Blog',
    meta: [
      {
        name: 'description',
        content: 'Learn about password security, best practices, two-factor authentication, password managers, and how to protect your digital identity.'
      },
      {
        property: 'og:title',
        content: 'Password Security Blog | passwrd.in'
      },
      {
        property: 'og:description',
        content: 'Expert guides on password security, 2FA, password managers, and digital safety best practices.'
      }
    ]
  }
};
</script>
