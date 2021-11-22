<script setup lang="ts">
// ctrl + v element-plus-docs
import { computed, toRef, ref, getCurrentInstance } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useToggle } from '../composables/toggle'
import { useSourceCode } from '../composables/source-code'

import GithubIcon from './icons/github.vue'
import SourceCodeIcon from './icons/source-code.vue'
import CodepenIcon from './icons/codepen.vue'
import CopyIcon from './icons/copy-icon.vue'

import {ElTooltip, ElIcon, ElDivider, ElCollapseTransition} from 'element-plus'

import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'
import Codepen from './demo/vp-codepen.vue'

const props = defineProps({
  // source is encoded via encodeURIComponent
  source: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  cssPreProcessor: {
    type: String,
    required: true,
  },
  js: {
    type: String,
    required: true,
  },
  jsPreProcessor: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  demos: {
    type: Object,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

const vm = getCurrentInstance()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, setSourceVisible] = useToggle()
const demoSourceUrl = useSourceCode(toRef(props, 'path'))
const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('/examples/', '')] =
      props.demos[key].default
  })

  return demos
})

const codepenRef = ref()
const decodedDescription = computed(() => decodeURIComponent(props.description))

const onCodepenClicked = () => {
  codepenRef.value.submit?.()
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('复制错误')
  }
  try {
    await copy()
    $message.success('复制成功')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p class="example-description" v-html="decodedDescription" />
    <div class="example">
      <Codepen
        ref="codepenRef"
        :css="props.css"
        :css-pre-processor="props.cssPreProcessor"
        :html="props.html"
        :js="props.js"
        :js-pre-processor="props.jsPreProcessor"
      />
      <div class="op-btns">
        <!-- <ElTooltip content="在Codepen中编辑" :visible-arrow="false">
          <ElIcon :size="20" class="op-btn">
            <CodepenIcon @click="onCodepenClicked" />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="在github编辑" :visible-arrow="false">
          <ElIcon :size="20" class="op-btn github">
            <a :href="demoSourceUrl" rel="noreferrer noopener" target="_blank">
              <GithubIcon />
            </a>
          </ElIcon>
        </ElTooltip> -->
        <ElTooltip content="复制代码" :visible-arrow="false">
          <ElIcon :size="20" class="op-btn" @click="copyCode">
            <CopyIcon />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="显示源码" :visible-arrow="false">
          <ElIcon :size="20" class="op-btn" @click="setSourceVisible">
            <SourceCodeIcon />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElDivider />
      <Example :file="path" :demo="formatPathDemos[path]" :source="formatPathDemos[path] ? '' : decodeURIComponent(rawSource)"  />
      <ElDivider v-if="sourceVisible" />
      <el-collapse-transition>
        <SourceCode v-show="sourceVisible" :source="source" :path="path" />
      </el-collapse-transition>
    </div>
  </ClientOnly>
</template>
<style scoped lang="scss">
.example-description {
  font-size: 14px;
}
.example {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3rem;
    line-height: 3rem;

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: #303133;

      &.github a {
        color: #303133;
      }
    }
  }
  .el-divider {
    margin: 0;
  }
}
</style>
