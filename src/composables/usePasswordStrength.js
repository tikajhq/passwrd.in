import { computed } from 'vue';

export function usePasswordStrength(password) {
  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 20;
    if (pwd.length >= 16) score += 20;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 10;
    
    return Math.min(score, 100);
  };

  const strengthPercent = computed(() => calculateStrength(password.value));
  
  const strengthText = computed(() => {
    const score = strengthPercent.value;
    if (score < 40) return 'Weak';
    if (score < 60) return 'Fair';
    if (score < 80) return 'Good';
    return 'Excellent';
  });

  const strengthColor = computed(() => {
    const score = strengthPercent.value;
    if (score < 40) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-blue-500';
    return 'bg-green-500';
  });

  const strengthTextColor = computed(() => {
    const score = strengthPercent.value;
    if (score < 40) return 'text-red-500';
    if (score < 60) return 'text-yellow-500';
    if (score < 80) return 'text-blue-500';
    return 'text-green-500';
  });

  const strengthEmoji = computed(() => {
    const score = strengthPercent.value;
    if (score < 40) return '😰';
    if (score < 60) return '😐';
    if (score < 80) return '😊';
    return '🔥';
  });

  const strengthMessage = computed(() => {
    const score = strengthPercent.value;
    const len = password.value.length;
    if (score < 40) return `⚠️ Can be cracked in minutes to hours. Add more characters and variety to improve security.`;
    if (score < 60) return `⏱️ Could be cracked in days to weeks with dedicated effort. Try adding ${len < 12 ? 'more length and ' : ''}special characters.`;
    if (score < 80) return `🛡️ Would take months to years to crack. This is a good password! Consider making it even longer for maximum security.`;
    return `🔒 Would take centuries to crack with current technology. This password is virtually uncrackable! 🎉`;
  });

  const hasUppercase = computed(() => /[A-Z]/.test(password.value));
  const hasLowercase = computed(() => /[a-z]/.test(password.value));
  const hasNumbers = computed(() => /[0-9]/.test(password.value));
  const hasSymbols = computed(() => /[^a-zA-Z0-9]/.test(password.value));

  return {
    strengthPercent,
    strengthText,
    strengthColor,
    strengthTextColor,
    strengthEmoji,
    strengthMessage,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols
  };
}
