<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    symbolId: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.svg-icon {
  width: 16px;
  height: 16px;
  vertical-align: 12px;
  fill: currentColor;
  overflow: hidden;
}
</style>
