<template>
  <div class="bx--grid bx--grid--full-width">
    <div class="bx--row">
      <div class="bx--col bx--no-gutter">
        <div class="bx--col-lg-10 bx--offset-lg-4 simple__page">
          <h1>Why ? </h1>
          <br/>
          <ul>
            <li>A lot of existing website either advertise themselves or they make it a complex process.</li>
            <li>Few of them collect password for "analytics" purposes.</li>
            <li>Sometimes you need a strong password, sometimes you need easy to remember.</li>
            <li>There is password generation feature in chrome - sometimes it doesn't work.</li>
            <li>You are a sys admin, org admin or a developer and you need to give good password to business user - rather test, 1234 .... you know it ! </li>
            <li>You just need a website which can give you a password without any bullshit.</li>
          </ul>

          <br/>
          <br/>
          <br/>
          <br/>
          <h1>We made it with ❤️ to make security little easy.</h1>
          <br/>
          <span>Password might be an old tech but if you are using it - you need a strong one & you know it.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: 'Why',
  components: {},
  created () {

  },
  data: function () {
    return {}
  },
  methods: {

  }
};
</script>

<style lang="scss">
.simple__page{

  padding-top: 5em;
  padding-bottom: 5em;
  min-height: 90vh;
}

ul{
list-style: disc;

  li{
    padding-top: 0.5em;
  }
}
</style>
