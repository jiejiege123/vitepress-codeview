<!--
 * @Author: zzz
 * @LastEditors: zzz
-->
<!--
  也就是说在这里写个组件 有插槽 传入文件地址 能显示代码就完了啊
-->
<template>
  <ClientOnly>
    <p class="example-description" v-html="decodedDescription" />
    
    

    <div class="example">
      <div class="op-btns">
        <ElTooltip content="复制代码" :visible-arrow="false">
          <ElIcon :size="20" class="op-btn" @click="copyCode">
            <CopyIcon />
          </ElIcon>
        </ElTooltip>
        <ElTooltip content="查看源代码" :visible-arrow="false">
          <ElIcon :size="20" class="op-btn" @click="setSourceVisible">
            <SourceCodeIcon />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElDivider />
      <ExampleDemo :demo="demo" />
      <ElDivider v-if="sourceVisible" />
      <el-collapse-transition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </el-collapse-transition>
    </div>
  </ClientOnly>
</template>

<script >
import { useClipboard } from '@vueuse/core'


import CopyIcon from './icons/copy-icon.vue'

import SourceCodeIcon from './icons/source-code.vue'

import ExampleDemo from './demo/vp-example.vue'

import SourceCode from './demo/vp-source-code.vue'
export default {
  components: {
    ExampleDemo,
    CopyIcon,
    SourceCodeIcon,
    SourceCode
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      demo: null,
      sourceVisible: false
    }
  },
  computed: {
    decodedDescription() {
      return this.description
    }
  },
  mounted() {
    let link = '../../examples' + this.link
    import(link).then((module) => {
      console.log(module);
      this.demo = module.default

      console.log(module);
    })

    // source is encoded via encodeURIComponent
    
    // const { copy, isSupported } = useClipboard({
    //   source: decodeURIComponent(props.rawSource),
    //   read: false,
    // })

// console.log(props.rawSource)

    console.log(useClipboard);
  },
  methods: {
    async copyCode() {
      if (!isSupported) {
        this.$message.error('复制失败')
      }
      try {
        await copy()
        this.$message.success('复制成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    setSourceVisible() {
      this.sourceVisible = !this.setSourceVisible
    }
  },
}
</script>

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
