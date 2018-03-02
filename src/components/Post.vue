<template>
  <md-card>
      <slot name="title"></slot>
      <slot name="content"></slot>
    <md-card-actions>
      <a class="card-footer-item" :href="link" target="_blank">Read more</a>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  props: ['link']
}
</script>
<style>
.card {
  padding-bottom: 40px;
  height: 100%;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>
