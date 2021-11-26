<template>
  <div class="example-showcase">
    <ClientOnly>
      <component :is="demo" v-if="demo" v-bind="$attrs" />
      <!-- <div v-else v-html="source">
      </div> -->
      <iframe v-else width="100%" ref="iframe" frameborder="0"  scrolling="no"></iframe>
    </ClientOnly>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    file: {
      type: String,
      required: true,
    },
    demo: {
      type: Object,
      required: true,
    },
    source: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.iframe) {
        this.$refs.iframe.contentDocument.documentElement.innerHTML = this.source;
        var bHeight = this.$refs.iframe.contentWindow.document.body.scrollHeight
        if (bHeight > 150) {
          this.$refs.iframe.height = bHeight
        } 
      }
    })

    // setTimeout(() => {
    //   this.$refs.iframe.contentDocument.documentElement.innerHTML = this.source;
    //   var bHeight = this.$refs.iframe.contentWindow.document.body.scrollHeight
    //   if (bHeight > 150) {
    //     this.$refs.iframe.height = bHeight
    //   } 
    // }, 500);
  },

}
</script>
<style lang="scss" scoped>
.example-showcase {
  padding: 1rem;
  margin: 0.5px;
  background-color: #ffffff;
  &.transparent-enabled {
    background-image: linear-gradient(
        45deg,
        rgb(249, 249, 250) 25%,
        transparent 25%
      ),
      linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%),
      linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
    background-size: 20px 20px;
    background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
  }

  @at-root .dark .example-showcase {
    background-image: unset;
    background-color: var(--bg-color-soft);
  }
}
</style>
