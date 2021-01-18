<template>
  <div>
    <cv-text-input
        label="Generated Password"
        helper-text="This is randomly generated password, please copy it in some other location, even we won't be able to regenerate it."
        :value="password"
        readonly="true"
    >
    </cv-text-input>
    <br/>
    <br/>
    <div style="float: left">
      <cv-slider
          min="2"
          max="8"
          min-label="Weak"
          max-label="Strong"
          label="Number of words"
          v-model="length"
          @change="generatePassword"
      ></cv-slider>
    </div>
    <div style="float: right; margin-top: 1.5rem;">
                    <span style="line-height: 2.5rem;"
                          v-if="copiedVisible"> Copied ! </span>
      <cv-button @click="()=>copyCode(this.password)">
        Copy
      </cv-button>


      <cv-button style="margin-left: 0.5rem;" @click="generatePassword">
        Generate
      </cv-button>


    </div>
  </div>
</template>
<script>

import WordsList from './words.json'

function generatePassword (length) {
  let retVal = [];
  for (let i = 0, n = WordsList.length; i < length; ++i) {
    retVal.push(WordsList[(Math.floor(Math.random() * n))]);
  }
  return retVal.join("-");
}

export default {
  created () {

    this.generatePassword();
  },
  data: function () {
    return {
      length: "3",
      password: "",
      copiedVisible: false,
      visibleTimer: null
    }
  },
  methods: {

    generatePassword () {
      this.password = generatePassword(this.length);
    },
    // Yea this is copied again & again :/
    copyCode (value) {
      if (this.visibleTimer) clearTimeout(this.visibleTimer);
      const el = document.createElement('textarea');
      el.value = value;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      this.copiedVisible = true;
      this.visibleTimer = setTimeout(() => {
        this.copiedVisible = false
      }, 2000)
    }
  }
}
</script>
