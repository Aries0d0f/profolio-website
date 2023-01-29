<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

import Math$ from '@/shared/libs/math';

const wrapperRef$ = ref<HTMLElement>();
const width = ref(0);
const height = ref(0);

const dotSize = ref(5);
const dotGapBase = ref(1);
const dotGap = computed(() => {
  const maxGap = Math$.gcd(width.value, height.value);

  return Math$.clamp(
    maxGap > dotSize.value * (5 * dotGapBase.value)
      ? Math$.gcd(maxGap, dotSize.value * (5 * dotGapBase.value))
      : Math$.lcm(maxGap, dotSize.value * (5 * dotGapBase.value)),
    dotSize.value * (4 * dotGapBase.value),
    dotSize.value * (6 * dotGapBase.value)
  );
});

const measureBoundingBox = () => {
  width.value = wrapperRef$.value?.offsetWidth || 0;
  height.value = wrapperRef$.value?.offsetHeight || 0;
};

onMounted(() => {
  measureBoundingBox();
});
</script>

<template>
  <div ref="wrapperRef$" :class="$style['screen-tone--wrapper']">
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
      <template v-for="x in width / dotGap">
        <template v-for="y in height / dotGap">
          <template v-if="x % 2 === 0 && y % 2 === 0">
            <path
              :key="`dot-${x}-${y}`"
              :d="`
                M ${(x - 1) * dotGap} ${(y - 1) * dotGap - dotSize / 2}
                v ${dotSize}
                m ${dotSize / -2} ${dotSize / -2}
                h ${dotSize}`"
              :class="$style['screen-tone--path']"
            />
          </template>
        </template>
      </template>
    </svg>
  </div>
</template>

<style module lang="scss" scoped>
@use '@/assets/styles/scss/modules/theme.module' as theme;

.screen-tone {
  &--wrapper {
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  &--path {
    stroke: #{theme.$screen-tone-dot-color};
    stroke-width: #{theme.$screen-tone-dot-stroke-width};
  }
}
</style>
