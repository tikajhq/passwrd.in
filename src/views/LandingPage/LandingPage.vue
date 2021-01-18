<template>
  <div class="bx--grid bx--grid--full-width  landing-page">
    <div class="bx--row landing-page__banner">
      <div class="bx--col-lg-16">
        <h1 class="landing-page__heading">passwrd.in is a private, secure & simple password generator</h1><br/>
        <h4>No Ads, No Promos, No Bullshit !</h4>
      </div>
    </div>

    <div class="bx--row landing-page__r2">
      <div class="bx--col bx--no-gutter">
        <cv-tabs selected="0" aria-label="Tabs navigation">
          <cv-tab label="Random">
            <div class="bx--grid">
              <div class="bx--row landing-page__tab-content">
                <div class="bx--col-lg-10 bx--offset-lg-3">
                  <Simple/>
                </div>
              </div>
            </div>
          </cv-tab>
          <cv-tab label="Easy to remember">
            <div class="bx--grid">
              <div class="bx--row landing-page__tab-content">
                <div class="bx--col-lg-10 bx--offset-lg-3">
                  <Readable/>
                </div>
              </div>
            </div>
          </cv-tab>
          <cv-tab label="Predictable">
            <div class="bx--grid">
              <div class="bx--row landing-page__tab-content">
                <div class="bx--col-lg-16">
                  Coming Soon
                </div>
              </div>
            </div>
          </cv-tab>
        </cv-tabs>
      </div>
    </div>

    <info-section heading="The Principles" class="landing-page__r3">
      <info-card
          heading="passwrd.in is Private"
          body="Everything happens in your browser, you don't need any if's, we don't even know how many & what type of passwords you have generated."
          :icon="PersonFavorite32"
      />
      <info-card
          heading="passwrd.in is Simple"
          body="We wanted to make password generation easier. Being a sys admin, developer, business user - you might need to generate a good password while meeting criteria of security - we know the pain - hence we made it super easy."
          :icon="Application32"
      />
      <info-card
          heading="passwrd.in is Secure"
          body="All passwords are generated in client side, there are no trackers, no improvement programs, no promos, no ads - it's just dead simple javascript code."
          :icon="Globe32"
      />
    </info-section>

  </div>

</template>

<script>
import {InfoCard, InfoSection} from '../../components/InfoSection';
import Globe32 from '@carbon/icons-vue/lib/globe/32';
import PersonFavorite32 from '@carbon/icons-vue/lib/person--favorite/32';
import Application32 from '@carbon/icons-vue/lib/application/32';
import Simple from './Simple';
import Readable from './Readable'

export default {
  name: 'LandingPage',
  components: { InfoSection, InfoCard, Simple,Readable },
  created () {
    // Add icons to this
    Object.assign(this, {
      Globe32,
      PersonFavorite32,
      Application32
    });
  },
};
</script>

<style lang="scss">
@import '../../styles/carbon-utils';
@import './carbon-overrides';
@import './mixins';

.landing-page__illo {
  max-width: 100%;
}

.landing-page__banner {
  //padding-top: $spacing-05;
  //padding-bottom: $spacing-07 * 4;
  padding: $spacing-10;
  @include landing-page-background;
}

.landing-page__heading {
  @include carbon--type-style('productive-heading-05');
}


.landing-page__r2 {
  margin-top: rem(-40px);
}

.landing-page__tab-content {
  padding-top: 8em;
  padding-bottom: 8em;
  min-height: 30em;
}

.landing-page__subheading {
  @include carbon--type-style('productive-heading-03');
  @include carbon--font-weight('semibold');
}

.landing-page__p {
  @include carbon--type-style('productive-heading-03');
  margin-top: $spacing-06;
  margin-bottom: $spacing-08;

  @include carbon--breakpoint-between((320px + 1), md) {
    max-width: 75%;
  }
}

.landing-page__r3 {
  padding-top: $spacing-09;
  padding-bottom: $spacing-09;
  @include landing-page-background;
}

.landing-page__label {
  @include carbon--type-style('heading-01');
}


</style>
