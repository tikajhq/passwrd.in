import { ref } from 'vue';

const SAVED_PASSWORDS_KEY = 'passwrd_saved';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Shared state - single source of truth
const savedPasswords = ref([]);
let isInitialized = false;

const loadPasswords = () => {
  // Skip during SSR
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(SAVED_PASSWORDS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      // Filter out expired passwords
      savedPasswords.value = parsed.filter(p => now - p.timestamp < EXPIRY_TIME);
      // Update storage if we filtered anything
      if (savedPasswords.value.length !== parsed.length) {
        saveToStorage();
      }
    } catch (e) {
      console.error('Error loading saved passwords:', e);
      savedPasswords.value = [];
    }
  }
};

const saveToStorage = () => {
  // Skip during SSR
  if (typeof window === 'undefined') return;
  localStorage.setItem(SAVED_PASSWORDS_KEY, JSON.stringify(savedPasswords.value));
};

const addPassword = (password, type, label) => {
  savedPasswords.value.unshift({
    id: Date.now(),
    password,
    type,
    label: label || type,
    timestamp: Date.now()
  });
  saveToStorage();
};

const removePassword = (id) => {
  savedPasswords.value = savedPasswords.value.filter(p => p.id !== id);
  saveToStorage();
};

// Initialize once on first use (client-side only)
if (typeof window !== 'undefined' && !isInitialized) {
  loadPasswords();
  isInitialized = true;
}

export function useSavedPasswords() {
  return {
    savedPasswords,
    addPassword,
    removePassword
  };
}
