<template>

  <cv-header aria-label="Passwrd.in" >
    <cv-skip-to-content href="#main-content"
      >Skip to content</cv-skip-to-content
    >

    <cv-header-name to="/" prefix="passwrd">.in</cv-header-name>

    <cv-header-nav aria-label="Navigation" style="float: right;">
      <cv-header-menu-item to="/">Generate</cv-header-menu-item>
      <cv-header-menu-item to="/code">Need Code !</cv-header-menu-item>
      <cv-header-menu-item to="/why">Why ?</cv-header-menu-item>
<!--      <cv-header-menu-item to="/about">About</cv-header-menu-item>-->
    </cv-header-nav>

    <template slot="header-global">

    </template>
  </cv-header>
</template>

<script>

export default {
  name: 'TutorialHeader',
};
</script>

<style lang="scss"></style>
