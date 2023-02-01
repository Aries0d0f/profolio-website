<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue';
import { useElementSize, useMouse, useMousePressed } from '@vueuse/core';

import Math$ from '@/shared/libs/math';

import type { Vector } from '@/shared/types/vector';

const $mouse = reactive(
  useMouse({
    type: 'client',
    resetOnTouchEnds: true
  })
);
const $mousePressed = useMousePressed({ touch: false });

const wrapperRef$ = ref<HTMLElement>();
const { width, height } = useElementSize(wrapperRef$);

const oldMousePosition = ref<Vector<'x' | 'y'>>({ x: 0, y: 0 });
const mouseIdle = ref(false);
const mouseIdleWeight = ref(1);
const mouseIdleSensitive = ref(6);
const mouseIdleDetectTimer$$ = ref<ReturnType<typeof setTimeout>>();

const dotSize = ref(5);
const dotGapBase = ref(2);
const dotGap = computed<number>(() => dotSize.value * (4 * dotGapBase.value));
const dotDefaultOpacity = computed<number>(() =>
  window.devicePixelRatio > 1 ||
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    ? 0.3
    : 0.4
);
const dotActiveZoneSize = computed<number>(
  () => dotGap.value * dotSize.value * Math$.clamp(width.value / 1600, 1, 2)
);
const dotAnimateFPS = ref(24);

const dotMatrix = ref<
  {
    id: string;
    x: number;
    y: number;
    path: {
      default: string;
      active: string;
    };
    active: boolean;
    opacity: number;
  }[]
>([]);

const detectMouseIdle = (idle = 0, active = 0) => {
  const distanceFromMouse = Number(
    Math$.Vector.delta(
      {
        x: $mouse.x,
        y: $mouse.y
      },
      oldMousePosition.value
    )
  );

  oldMousePosition.value = {
    x: $mouse.x,
    y: $mouse.y
  };

  if (idle >= mouseIdleSensitive.value) {
    mouseIdle.value = true;
    mouseIdleWeight.value = 0.1;

    mouseIdleDetectTimer$$.value = setTimeout(() => {
      detectMouseIdle(0, 0);
    }, 1000 / dotAnimateFPS.value);
  } else if (
    distanceFromMouse >
      (mouseIdle.value
        ? ((dotGap.value * Math.PI) / 100) **
          Math$.clamp(2 * mouseIdleWeight.value, 1, 2)
        : 0) ||
    $mousePressed.pressed.value
  ) {
    if (active >= mouseIdleSensitive.value / 3) {
      mouseIdle.value = false;
      mouseIdleWeight.value = Math$.clamp(
        mouseIdleWeight.value *
          (1 +
            ($mousePressed.pressed.value
              ? 0.33
              : Math$.clamp(
                  distanceFromMouse / dotActiveZoneSize.value,
                  0.1,
                  1
                ))),
        0,
        1
      );
    }

    mouseIdleDetectTimer$$.value = setTimeout(() => {
      detectMouseIdle(0, active + 1);
    }, 1000 / dotAnimateFPS.value);
  } else {
    mouseIdleWeight.value = Math$.clamp(mouseIdleWeight.value * 0.75, 0, 1);
    mouseIdleDetectTimer$$.value = setTimeout(() => {
      detectMouseIdle(idle + 1, 0);
    }, 1000 / dotAnimateFPS.value);
  }
};

const calcDots = () => {
  const dots = [];
  for (let x = 0; x < Math.ceil(width.value / dotGap.value) + 1; x++) {
    for (let y = 0; y < Math.ceil(height.value / dotGap.value) + 1; y++) {
      const distanceFromMouse = Number(
        Math$.Vector.delta(
          {
            x: $mouse.x,
            y: $mouse.y
          },
          {
            x: (x - 1) * dotGap.value + dotGap.value / 2,
            y: (y - 1) * dotGap.value + dotGap.value / 2
          }
        )
      );
      const isActive =
        !mouseIdle.value &&
        distanceFromMouse <
          (dotActiveZoneSize.value * mouseIdleWeight.value) / 2;

      dots.push({
        id: `dot-${x}-${y}`,
        x: (x - 1) * dotGap.value,
        y: (y - 1) * dotGap.value,
        path: {
          default: `
            M ${(x - 1 / 2) * dotGap.value}
              ${(y - 1 / 2) * dotGap.value - dotSize.value / 2}
            v ${dotSize.value}
            m ${dotSize.value / -2} ${dotSize.value / -2}
            h ${dotSize.value}`,
          active: `
            M ${(x - 1 / 2) * dotGap.value - dotSize.value / 2}
              ${(y - 1 / 2) * dotGap.value - dotSize.value / 2}
            l ${dotSize.value} ${dotSize.value}
            m ${dotSize.value * -1} 0
            l ${dotSize.value} ${dotSize.value * -1}`
        },
        active: isActive,
        opacity:
          dotDefaultOpacity.value +
          (1 - dotDefaultOpacity.value) *
            Math$.clamp(
              1 -
                (mouseIdle.value ? Infinity : distanceFromMouse) /
                  (dotActiveZoneSize.value * mouseIdleWeight.value),
              0,
              1
            )
      });
    }
  }

  dotMatrix.value = dots;

  setTimeout(calcDots, 1000 / dotAnimateFPS.value);
};

onMounted(() => {
  calcDots();
  mouseIdleDetectTimer$$.value = setTimeout(detectMouseIdle, 50);
});
onUnmounted(() => {
  clearTimeout(mouseIdleDetectTimer$$.value);
});
</script>

<template>
  <div ref="wrapperRef$" :class="$style['screen-tone--wrapper']">
    <svg
      :width="width"
      :height="height"
      :class="$style['screen-tone']"
      preserveAspectRatio="xMinYMin"
      color-profile="sRGB"
      class="screen-tone"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <template v-for="dot in dotMatrix" :key="dot.id">
        <path
          :d="dot.active ? dot.path.active : dot.path.default"
          :class="$style['screen-tone--dot']"
          :opacity="dot.opacity"
          fill="transparent"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </template>
    </svg>
  </div>
</template>

<style module lang="scss" scoped>
@use 'sass:string';
@use '@/assets/styles/scss/modules/theme.module' as theme;

.screen-tone {
  &--wrapper {
    position: fixed;
    width: 100%;
    height: 100vh;
  }

  shape-rendering: optimizespeed;
  color-rendering: optimizespeed;
  image-rendering: optimizespeed;

  &--dot {
    stroke: #{theme.$screen-tone-dot-color};
    stroke-width: #{theme.$screen-tone-dot-stroke-width};

    // Fix sub-pixel rendering on Firefox
    @supports (-moz-appearance: none) {
      stroke-width: calc(#{theme.$screen-tone-dot-stroke-width} * 1.25);
    }
  }
}
</style>
