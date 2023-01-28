<script setup lang="ts">
import { onMounted, ref } from 'vue';

const wrapperRef$ = ref<HTMLElement>();
const width = ref(0);
const height = ref(0);

const calcVariables = () => {
  width.value = wrapperRef$.value?.offsetWidth || 0;
  height.value = wrapperRef$.value?.offsetHeight || 0;
};

onMounted(() => {
  calcVariables();
});
</script>

<template>
  <div ref="wrapperRef$" class="screen-tone-wrapper">
    <svg
      :width="width"
      :height="height"
      preserveAspectRatio="xMinYMin"
      color-profile="sRGB"
      class="screen-tone"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    </svg>
  </div>
</template>
