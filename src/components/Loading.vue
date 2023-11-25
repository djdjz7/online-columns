<script setup lang="ts">
import { Spin } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
</script>

<template>
  <div
    backdrop-blur-lg
    fixed
    top-0
    left-0
    right-0
    bottom-0
    z-999
    flex="~ items-center justify-center"
    overflow-y-scroll
    overflow-x-clip
  >
      <Spin :indicator="indicator"/>
  </div>
</template>
