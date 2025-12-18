/**
 * Browser Entropy Seed Generator
 * 
 * Collects various browser and system characteristics to create
 * additional randomness for password generation. This seed is combined
 * with crypto.getRandomValues() for maximum unpredictability.
 */

import { ref, onMounted } from 'vue';

export function useBrowserEntropy() {
  const entropyData = ref({});
  const entropySeed = ref(0);

  /**
   * Collect cursor/mouse movement entropy
   */
  const collectMouseEntropy = () => {
    let mouseX = 0;
    let mouseY = 0;
    let mouseMoveCount = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseMoveCount++;
    };

    window.addEventListener('mousemove', handleMouseMove, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      return { mouseX, mouseY, mouseMoveCount };
    };
  };

  /**
   * Collect network timing entropy
   */
  const getNetworkTiming = () => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      return {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        request: timing.responseStart - timing.requestStart,
        response: timing.responseEnd - timing.responseStart,
        dom: timing.domComplete - timing.domLoading
      };
    }
    return {};
  };

  /**
   * Collect system/browser characteristics
   */
  const getSystemEntropy = () => {
    const nav = window.navigator;
    return {
      // Screen characteristics
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenDepth: window.screen.colorDepth,
      devicePixelRatio: window.devicePixelRatio || 1,
      
      // Browser characteristics
      userAgent: nav.userAgent.length, // Use length, not full string for privacy
      platform: nav.platform,
      language: nav.language,
      hardwareConcurrency: nav.hardwareConcurrency || 1,
      maxTouchPoints: nav.maxTouchPoints || 0,
      
      // Timing
      timestamp: Date.now(),
      performanceNow: performance.now(),
      timezoneOffset: new Date().getTimezoneOffset(),
      
      // Memory (if available)
      memory: nav.deviceMemory || 0,
      
      // Connection (if available)
      connectionType: nav.connection?.effectiveType || 'unknown',
      downlink: nav.connection?.downlink || 0
    };
  };

  /**
   * Generate a numeric seed from collected entropy
   */
  const generateEntropySeed = () => {
    const systemData = getSystemEntropy();
    const networkData = getNetworkTiming();
    const mouseGetter = collectMouseEntropy();
    
    // Wait a bit to collect some mouse data
    setTimeout(() => {
      const mouseData = mouseGetter();
      
      // Combine all entropy sources
      entropyData.value = {
        ...systemData,
        ...networkData,
        ...mouseData
      };

      // Create a numeric seed by combining various values
      let seed = 0;
      
      // Hash-like combination of all numeric values
      Object.values(entropyData.value).forEach((value) => {
        if (typeof value === 'number') {
          seed = (seed * 31 + value) >>> 0; // Unsigned 32-bit int
        } else if (typeof value === 'string') {
          // Simple string hash
          for (let i = 0; i < value.length; i++) {
            seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
          }
        }
      });
      
      // Mix in current high-precision time
      seed = (seed * 31 + performance.now() * 1000000) >>> 0;
      
      entropySeed.value = seed;
    }, 100);
  };

  /**
   * Get entropy-enhanced random bytes
   * Combines crypto.getRandomValues() with browser entropy
   */
  const getEnhancedRandom = (length) => {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    // XOR with entropy seed for additional mixing
    if (entropySeed.value) {
      for (let i = 0; i < array.length; i++) {
        array[i] = array[i] ^ (entropySeed.value * (i + 1));
      }
    }
    
    return array;
  };

  /**
   * Get a single enhanced random number in range
   */
  const getEnhancedRandomInRange = (min, max) => {
    const range = max - min;
    const array = getEnhancedRandom(1);
    return min + (array[0] % range);
  };

  /**
   * Get entropy quality score (0-100)
   */
  const getEntropyQuality = () => {
    const data = entropyData.value;
    let score = 0;
    
    // Check for various entropy sources
    if (data.mouseX || data.mouseY) score += 20; // Mouse movement
    if (data.dns) score += 15; // Network timing
    if (data.hardwareConcurrency > 1) score += 15; // Multi-core
    if (data.performanceNow) score += 20; // High-precision timing
    if (data.devicePixelRatio) score += 10; // Screen info
    if (data.connectionType !== 'unknown') score += 10; // Network info
    if (data.memory) score += 10; // Device memory info
    
    return Math.min(100, score);
  };

  onMounted(() => {
    generateEntropySeed();
  });

  return {
    entropyData,
    entropySeed,
    getEnhancedRandom,
    getEnhancedRandomInRange,
    getEntropyQuality,
    regenerateEntropy: generateEntropySeed
  };
}
