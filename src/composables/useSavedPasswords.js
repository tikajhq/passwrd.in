import { ref, onMounted } from 'vue';

const SAVED_PASSWORDS_KEY = 'passwrd_saved';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

export function useSavedPasswords() {
  const savedPasswords = ref([]);

  const loadPasswords = () => {
    const stored = localStorage.getItem(SAVED_PASSWORDS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      // Filter out expired passwords
      savedPasswords.value = parsed.filter(p => now - p.timestamp < EXPIRY_TIME);
      // Update storage if we filtered anything
      if (savedPasswords.value.length !== parsed.length) {
        saveToStorage();
      }
    }
  };

  const saveToStorage = () => {
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

  onMounted(() => {
    loadPasswords();
  });

  return {
    savedPasswords,
    addPassword,
    removePassword
  };
}
