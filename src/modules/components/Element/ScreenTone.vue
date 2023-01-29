<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useElementSize, useMouse } from '@vueuse/core';

import Math$ from '@/shared/libs/math';

const $mouse = reactive(
  useMouse({
    type: 'client',
    resetOnTouchEnds: true
  })
);

const wrapperRef$ = ref<HTMLElement>();
const { width, height } = useElementSize(wrapperRef$);

const dotSize = ref(5);
const dotGapBase = ref(2);
const dotGap = computed(() => dotSize.value * (4 * dotGapBase.value));
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
      <template
        v-if="Math.round(width / dotGap) * Math.round(height / dotGap) > 0"
      >
        <template v-for="x in Math.round(width / dotGap)">
          <template
            v-for="y in Math.round(height / dotGap)"
            :key="`dot-${x}-${y}`"
          >
            <path
              :d="
                Math$.Vector.delta(
                  {
                    x: $mouse.x,
                    y: $mouse.y
                  },
                  {
                    x: (x - 1) * dotGap,
                    y: (y - 1) * dotGap
                  }
                ) <
                (dotSize * dotGap) / 2
                  ? `M ${(x - 1 / 2) * dotGap - dotSize / 2}
                      ${(y - 1 / 2) * dotGap - dotSize / 2}
                    l ${dotSize} ${dotSize}
                    m ${dotSize * -1} 0
                    l ${dotSize} ${dotSize * -1}`
                  : `
                M ${(x - 1 / 2) * dotGap} ${(y - 1 / 2) * dotGap - dotSize / 2}
                v ${dotSize}
                m ${dotSize / -2} ${dotSize / -2}
                h ${dotSize}`
              "
              :class="$style['screen-tone--dot']"
              fill="transparent"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </template>
        </template>
      </template>
    </svg>
  </div>
</template>

<style module lang="scss" scoped>
@use 'sass:string';
@use '@/assets/styles/scss/modules/theme.module' as theme;

.screen-tone {
  &--wrapper {
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  &--dot {
    stroke: #{theme.$screen-tone-dot-color};
    stroke-width: #{theme.$screen-tone-dot-stroke-width};
    opacity: 0.75;
  }
}
</style>
