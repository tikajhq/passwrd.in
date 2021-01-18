<template>
  <div id="app">
    <!--    <div class="bx&#45;&#45;grid">-->
    <Header/>
    <cv-content id="#main-content">
      <!-- class="bx--grid" style="margin: 0;">-->
      <router-view/>
    </cv-content>
    <!--    </div>-->
    <footer class="app__footer">
      <div class="" style="text-align: center;">
        <span style="">
        &copy;{{ (new Date()).getFullYear() }} passwrd.in
          </span>

      </div>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import './styles/carbon';

.app__footer {
  background-color: #000;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
  text-decoration: none;
  letter-spacing: 0.16px;
  padding: 1rem;
  //margin-right: -2.6em;
  //margin-left: -2.6em;
}
</style>
