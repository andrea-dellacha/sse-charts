<template>
  <div class="social-page">
    <div class="social-page__title">Social Posts visualization</div>
    <SocialPost />
  </div>
</template>

<style lang="scss">
.social-page {
  margin: $spacing-x-sm;
  .social-page__title {
    display: flex;
    width: 100%;
    justify-content: center;

    font-size: 36px;
    font-weight: 900;
    line-height: 1;
  }
}
</style>
