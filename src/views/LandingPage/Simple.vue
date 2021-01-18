<template>
  <div>
    <cv-text-input
        label="Generated Password"
        helper-text="This is randomly generated password, please copy it to some other location, even we won't be able to regenerate it."
        :value="simplePassword"
        readonly="true"
    >
    </cv-text-input>
    <br/>
    <br/>
    <div style="float: left">
      <cv-slider
          min="4"
          max="40"
          min-label="Weak"
          max-label="Strong"
          label="Password Length"
          v-model="length"
          @change="generateSimple"
      ></cv-slider>
    </div>
    <div style="float: right; margin-top: 1.5rem;">
                    <span style="line-height: 2.5rem;"
                          v-if="copiedVisible"> Copied ! </span>
      <cv-button @click="()=>copyCode(this.simplePassword)">
        Copy
      </cv-button>


      <cv-button style="margin-left: 0.5rem;" @click="generateSimple">
        Generate
      </cv-button>


    </div>
  </div>
</template>
<script>

const charset = {
  "all": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*^%?",
  "alnum": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "num": "0123456789"
}

function generatePassword (charset, length) {
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export default {
  created () {

    this.generateSimple();
  },
  data: function () {
    return {
      length: "10",
      simplePassword: "",
      copiedVisible: false,
      visibleTimer: null
    }
  },
  methods: {

    generateSimple () {
      this.simplePassword = generatePassword(charset.all, this.length);
    },
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
