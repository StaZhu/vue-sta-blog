<template>
  <footer class="footer">
    <h3>Copyright © 2018 By Sta Z</h3>
    <h5><a href="http://www.miibeian.gov.cn" target="_blank" rel="noreferrer noopener">陕ICP备17018697号</a></h5>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
.footer {
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 0.8rem;
  margin: 0 auto;
  font-family: Roboto;
  text-align: center;
  color: #393939;
  background-color: white;
  h3 {
    margin: 0;
    font-size: 0.22rem;
    padding: 0.13rem;
    line-height: 1;
  }
  h5 {
    margin: 0;
    font-size: 0.19rem;
    padding-bottom: 0.13rem;
  }
  a {
    color: #393939 !important;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
