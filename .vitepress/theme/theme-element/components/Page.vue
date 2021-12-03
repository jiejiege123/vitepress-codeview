<!--
 * @Author: zzz
 * @LastEditors: zzz
-->
<script setup lang="ts">
import PageFooter from './PageFooter.vue'
import NextAndPrevLinks from './NextAndPrevLinks.vue'

import VPTableOfContent from './doc-content/vp-table-of-content.vue'

import { insertLinkIcon } from '../utils'

import { ref } from 'vue'


import { useData } from 'vitepress'

const { page } = useData()

const content = ref()

function updateLink() {
  insertLinkIcon(content)
}

</script>

<template>
  <main class="page ">
    <div class="container">

      <slot name="top" />
      <div class="doc-content-wrapper" style="display: flex;">
        <div class="doc-content-container">
          <Content 
            ref="content"
            class="content doc-content"
            @vnode-mounted="updateLink"
            @vnode-updated="updateLink"
             />
          <PageFooter />
          <NextAndPrevLinks />
        </div>

        <VPTableOfContent v-if="page.headers">
        </VPTableOfContent>
      </div>
      
      
      <slot name="bottom" />
    </div>
    
  </main>
</template>

<style scoped>
.page {
  padding-top: var(--header-height);
}

@media (min-width: 720px) {
  .page {
    margin-left: 16.4rem;
  }
}

@media (min-width: 960px) {
  .page {
    margin-left: 20rem;
  }
}

.container {
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
  /* max-width: 48rem; */
  max-width: 78rem;

}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
}
</style>
