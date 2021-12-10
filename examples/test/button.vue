<!--
 * @Author: zzz
 * @LastEditors: zzz
-->
<template>
  <el-button type="primary" @click="submit">点击</el-button>
  <div style="margin-top: 10px">次数: {{ count }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const count = ref(0)
</script>
