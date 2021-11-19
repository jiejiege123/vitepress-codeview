<script setup lang="ts">
import { computed } from 'vue'
import 'highlight.js/styles/atom-one-dark.css'
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  }
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})

const pathed = computed(() => {
  return props.path.split('.')[1]
})


</script>

<template>
  <div class="example-source" :class="['language-' + pathed]" style="margin: 0">
    <pre>
      <code v-html="decoded"></code>
    </pre>
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}
.example-source {
  code{
    :deep > span:first-child{
      position: absolute;
      left: 22px;
    }

    font-size: 16px;
  }
}
</style>
