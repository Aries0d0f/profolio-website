<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

import Math$ from '@/shared/libs/math';

import type { Vector } from '@/shared/types/vector';

const wrapperRef$ = ref<HTMLElement>();
const width = ref(0);
const height = ref(0);
const bottomRightSpaceSize = ref(240);
const bottomLeftCornerSize = ref(60);
const leftMiddleSpaceSize = ref(420);

const radius = ref(4);

const cuts = ref({
  topLeft: 45,
  topRight: 10,
  bottomRight: 15,
  bottomMiddleRight: 6,
  bottomMiddleLeft: 10,
  bottomLeft: 15,
  leftMiddleBottom: 10,
  leftMiddleTop: 6
});

const gap = ref<Vector<'x' | 'y'>>({
  x: 40,
  y: 40
});

const bottomLeftCornerOffset = computed<Vector<'x' | 'y'>>(() => ({
  x: cuts.value.leftMiddleTop - cuts.value.bottomLeft,
  y: cuts.value.bottomMiddleRight - cuts.value.bottomMiddleLeft
}));

const start = computed<Vector<'x' | 'y'>>(() => ({
  x: 0 + gap.value.x,
  y: 0 + gap.value.y
}));
const end = computed<Vector<'x' | 'y'>>(() => ({
  x: width.value - gap.value.x,
  y: height.value - gap.value.y
}));

const topLeftA0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x,
  y: start.value.y + cuts.value.topLeft
}));
const topLeftA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftA0.value.x,
  y: topLeftA0.value.y + radius.value
}));
const topLeftA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftA0.value.x + radius.value * Math.cos(Math$.rad(-45)),
  y: topLeftA0.value.y + radius.value * Math.sin(Math$.rad(-45))
}));

const topLeftB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + cuts.value.topLeft,
  y: start.value.y
}));
const topLeftB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftB0.value.x + radius.value * Math.cos(Math$.rad(135)),
  y: topLeftB0.value.y + radius.value * Math.sin(Math$.rad(135))
}));
const topLeftB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftB0.value.x + radius.value,
  y: topLeftB0.value.y
}));

const topRightA0 = computed<Vector<'x' | 'y'>>(() => ({
  x: end.value.x - cuts.value.topRight,
  y: start.value.y
}));
const topRightA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topRightA0.value.x + radius.value * Math.cos(Math$.rad(180)),
  y: topRightA0.value.y + radius.value * Math.sin(Math$.rad(180))
}));
const topRightA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topRightA0.value.x + radius.value * Math.cos(Math$.rad(45)),
  y: topRightA0.value.y + radius.value * Math.sin(Math$.rad(45))
}));

const topRightB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: end.value.x,
  y: start.value.y + cuts.value.topRight
}));
const topRightB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topRightB0.value.x + radius.value * Math.cos(Math$.rad(-135)),
  y: topRightB0.value.y + radius.value * Math.sin(Math$.rad(-135))
}));
const topRightB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topRightB0.value.x + radius.value * Math.cos(Math$.rad(90)),
  y: topRightB0.value.y + radius.value * Math.sin(Math$.rad(90))
}));

const bottomRightA0 = computed<Vector<'x' | 'y'>>(() => ({
  x: end.value.x,
  y: end.value.y - cuts.value.bottomRight
}));
const bottomRightA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomRightA0.value.x + radius.value * Math.cos(Math$.rad(-90)),
  y: bottomRightA0.value.y + radius.value * Math.sin(Math$.rad(-90))
}));
const bottomRightA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomRightA0.value.x + radius.value * Math.cos(Math$.rad(135)),
  y: bottomRightA0.value.y + radius.value * Math.sin(Math$.rad(135))
}));

const bottomRightB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: end.value.x - cuts.value.bottomRight,
  y: end.value.y
}));
const bottomRightB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomRightB0.value.x + radius.value * Math.cos(Math$.rad(-45)),
  y: bottomRightB0.value.y + radius.value * Math.sin(Math$.rad(-45))
}));
const bottomRightB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomRightB0.value.x + radius.value * Math.cos(Math$.rad(180)),
  y: bottomRightB0.value.y + radius.value * Math.sin(Math$.rad(180))
}));

const bottomMiddleRightA0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    end.value.x -
    cuts.value.bottomMiddleRight -
    cuts.value.bottomRight -
    bottomRightSpaceSize.value,
  y: end.value.y
}));
const bottomMiddleRightA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleRightA0.value.x + radius.value * Math.cos(Math$.rad(0)),
  y: bottomMiddleRightA0.value.y + radius.value * Math.sin(Math$.rad(0))
}));
const bottomMiddleRightA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleRightA0.value.x + radius.value * Math.cos(Math$.rad(-135)),
  y: bottomMiddleRightA0.value.y + radius.value * Math.sin(Math$.rad(-135))
}));

const bottomMiddleRightB0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    end.value.x -
    cuts.value.bottomMiddleRight * (1 + Math.SQRT2) -
    cuts.value.bottomRight -
    bottomRightSpaceSize.value,
  y: end.value.y - cuts.value.bottomMiddleRight * Math.SQRT2
}));
const bottomMiddleRightB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleRightB0.value.x + radius.value * Math.cos(Math$.rad(45)),
  y: bottomMiddleRightB0.value.y + radius.value * Math.sin(Math$.rad(45))
}));
const bottomMiddleRightB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleRightB0.value.x + radius.value * Math.cos(Math$.rad(180)),
  y: bottomMiddleRightB0.value.y + radius.value * Math.sin(Math$.rad(180))
}));

const bottomMiddleLeftA0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    start.value.x +
    cuts.value.bottomMiddleLeft * (1 + Math.SQRT2) +
    cuts.value.bottomLeft +
    bottomLeftCornerSize.value +
    bottomLeftCornerOffset.value.x,
  y: end.value.y - cuts.value.bottomMiddleRight * Math.SQRT2
}));
const bottomMiddleLeftA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleLeftA0.value.x + radius.value * Math.cos(Math$.rad(0)),
  y: bottomMiddleLeftA0.value.y + radius.value * Math.sin(Math$.rad(0))
}));
const bottomMiddleLeftA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleLeftA0.value.x + radius.value * Math.cos(Math$.rad(135)),
  y: bottomMiddleLeftA0.value.y + radius.value * Math.sin(Math$.rad(135))
}));

const bottomMiddleLeftB0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    start.value.x +
    cuts.value.bottomMiddleLeft +
    cuts.value.bottomLeft +
    bottomLeftCornerSize.value +
    bottomLeftCornerOffset.value.x,
  y: end.value.y - bottomLeftCornerOffset.value.y
}));
const bottomMiddleLeftB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleLeftB0.value.x + radius.value * Math.cos(Math$.rad(-45)),
  y: bottomMiddleLeftB0.value.y + radius.value * Math.sin(Math$.rad(-45))
}));
const bottomMiddleLeftB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomMiddleLeftB0.value.x + radius.value * Math.cos(Math$.rad(180)),
  y: bottomMiddleLeftB0.value.y + radius.value * Math.sin(Math$.rad(180))
}));

const bottomLeftA0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + bottomLeftCornerOffset.value.x + cuts.value.bottomLeft,
  y: end.value.y - bottomLeftCornerOffset.value.y
}));
const bottomLeftA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftA0.value.x + radius.value * Math.cos(Math$.rad(0)),
  y: bottomLeftA0.value.y + radius.value * Math.sin(Math$.rad(0))
}));
const bottomLeftA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftA0.value.x + radius.value * Math.cos(Math$.rad(-135)),
  y: bottomLeftA0.value.y + radius.value * Math.sin(Math$.rad(-135))
}));

const bottomLeftB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + bottomLeftCornerOffset.value.x,
  y: end.value.y - bottomLeftCornerOffset.value.y - cuts.value.bottomLeft
}));
const bottomLeftB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftB0.value.x + radius.value * Math.cos(Math$.rad(45)),
  y: bottomLeftB0.value.y + radius.value * Math.sin(Math$.rad(45))
}));
const bottomLeftB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftB0.value.x + radius.value * Math.cos(Math$.rad(-90)),
  y: bottomLeftB0.value.y + radius.value * Math.sin(Math$.rad(-90))
}));

const leftMiddleBottomA0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + bottomLeftCornerOffset.value.x,
  y:
    end.value.y -
    cuts.value.bottomMiddleLeft -
    cuts.value.bottomLeft -
    bottomLeftCornerSize.value -
    bottomLeftCornerOffset.value.y
}));
const leftMiddleBottomA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleBottomA0.value.x + radius.value * Math.cos(Math$.rad(90)),
  y: leftMiddleBottomA0.value.y + radius.value * Math.sin(Math$.rad(90))
}));
const leftMiddleBottomA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleBottomA0.value.x + radius.value * Math.cos(Math$.rad(-45)),
  y: leftMiddleBottomA0.value.y + radius.value * Math.sin(Math$.rad(-45))
}));

const leftMiddleBottomB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + bottomLeftCornerOffset.value.x + cuts.value.bottomLeft,
  y:
    end.value.y -
    cuts.value.bottomLeft * 2 -
    bottomLeftCornerSize.value +
    bottomLeftCornerOffset.value.y
}));
const leftMiddleBottomB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleBottomB0.value.x + radius.value * Math.cos(Math$.rad(135)),
  y: leftMiddleBottomB0.value.y + radius.value * Math.sin(Math$.rad(135))
}));
const leftMiddleBottomB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleBottomB0.value.x + radius.value * Math.cos(Math$.rad(-90)),
  y: leftMiddleBottomB0.value.y + radius.value * Math.sin(Math$.rad(-90))
}));

const leftMiddleTopA0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + cuts.value.leftMiddleTop,
  y:
    end.value.y -
    cuts.value.bottomLeft * 2 -
    bottomLeftCornerSize.value +
    bottomLeftCornerOffset.value.y -
    leftMiddleSpaceSize.value
}));
const leftMiddleTopA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleTopA0.value.x + radius.value * Math.cos(Math$.rad(90)),
  y: leftMiddleTopA0.value.y + radius.value * Math.sin(Math$.rad(90))
}));
const leftMiddleTopA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleTopA0.value.x + radius.value * Math.cos(Math$.rad(-135)),
  y: leftMiddleTopA0.value.y + radius.value * Math.sin(Math$.rad(-135))
}));

const leftMiddleTopB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x,
  y:
    end.value.y -
    cuts.value.bottomLeft * 2 -
    bottomLeftCornerSize.value +
    bottomLeftCornerOffset.value.y -
    leftMiddleSpaceSize.value -
    cuts.value.leftMiddleTop
}));
const leftMiddleTopB1 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleTopB0.value.x + radius.value * Math.cos(Math$.rad(45)),
  y: leftMiddleTopB0.value.y + radius.value * Math.sin(Math$.rad(45))
}));
const leftMiddleTopB2 = computed<Vector<'x' | 'y'>>(() => ({
  x: leftMiddleTopB0.value.x + radius.value * Math.cos(Math$.rad(-90)),
  y: leftMiddleTopB0.value.y + radius.value * Math.sin(Math$.rad(-90))
}));

const framePath = computed(
  () => `
  M ${topLeftA2.value.x} ${topLeftA2.value.y}
  L ${topLeftB1.value.x} ${topLeftB1.value.y}
  Q ${topLeftB0.value.x} ${topLeftB0.value.y}
    ${topLeftB2.value.x} ${topLeftB2.value.y}
  L ${topRightA1.value.x} ${topRightA1.value.y}
  Q ${topRightA0.value.x} ${topRightA0.value.y}
    ${topRightA2.value.x} ${topRightA2.value.y}
  L ${topRightB1.value.x} ${topRightB1.value.y}
  Q ${topRightB0.value.x} ${topRightB0.value.y}
    ${topRightB2.value.x} ${topRightB2.value.y}
  L ${bottomRightA1.value.x} ${bottomRightA1.value.y}
  Q ${bottomRightA0.value.x} ${bottomRightA0.value.y}
    ${bottomRightA2.value.x} ${bottomRightA2.value.y}
  L ${bottomRightB1.value.x} ${bottomRightB1.value.y}
  Q ${bottomRightB0.value.x} ${bottomRightB0.value.y}
    ${bottomRightB2.value.x} ${bottomRightB2.value.y}
  L ${bottomMiddleRightA1.value.x} ${bottomMiddleRightA1.value.y}
  Q ${bottomMiddleRightA0.value.x} ${bottomMiddleRightA0.value.y}
    ${bottomMiddleRightA2.value.x} ${bottomMiddleRightA2.value.y}
  L ${bottomMiddleRightB1.value.x} ${bottomMiddleRightB1.value.y}
  Q ${bottomMiddleRightB0.value.x} ${bottomMiddleRightB0.value.y}
    ${bottomMiddleRightB2.value.x} ${bottomMiddleRightB2.value.y}
  L ${bottomMiddleLeftA1.value.x} ${bottomMiddleLeftA1.value.y}
  Q ${bottomMiddleLeftA0.value.x} ${bottomMiddleLeftA0.value.y}
    ${bottomMiddleLeftA2.value.x} ${bottomMiddleLeftA2.value.y}
  L ${bottomMiddleLeftB1.value.x} ${bottomMiddleLeftB1.value.y}
  Q ${bottomMiddleLeftB0.value.x} ${bottomMiddleLeftB0.value.y}
    ${bottomMiddleLeftB2.value.x} ${bottomMiddleLeftB2.value.y}
  L ${bottomLeftA1.value.x} ${bottomLeftA1.value.y}
  Q ${bottomLeftA0.value.x} ${bottomLeftA0.value.y}
    ${bottomLeftA2.value.x} ${bottomLeftA2.value.y}
  L ${bottomLeftB1.value.x} ${bottomLeftB1.value.y}
  Q ${bottomLeftB0.value.x} ${bottomLeftB0.value.y}
    ${bottomLeftB2.value.x} ${bottomLeftB2.value.y}
  L ${leftMiddleBottomA1.value.x} ${leftMiddleBottomA1.value.y}
  Q ${leftMiddleBottomA0.value.x} ${leftMiddleBottomA0.value.y}
    ${leftMiddleBottomA2.value.x} ${leftMiddleBottomA2.value.y}
  L ${leftMiddleBottomB1.value.x} ${leftMiddleBottomB1.value.y}
  Q ${leftMiddleBottomB0.value.x} ${leftMiddleBottomB0.value.y}
    ${leftMiddleBottomB2.value.x} ${leftMiddleBottomB2.value.y}
  L ${leftMiddleTopA1.value.x} ${leftMiddleTopA1.value.y}
  Q ${leftMiddleTopA0.value.x} ${leftMiddleTopA0.value.y}
    ${leftMiddleTopA2.value.x} ${leftMiddleTopA2.value.y}
  L ${leftMiddleTopB1.value.x} ${leftMiddleTopB1.value.y}
  Q ${leftMiddleTopB0.value.x} ${leftMiddleTopB0.value.y}
    ${leftMiddleTopB2.value.x} ${leftMiddleTopB2.value.y}
  L ${topLeftA1.value.x} ${topLeftA1.value.y}
  Q ${topLeftA0.value.x} ${topLeftA0.value.y}
    ${topLeftA2.value.x} ${topLeftA2.value.y}
  Z
`
);

const measureBoundingBox = () => {
  width.value = wrapperRef$.value?.offsetWidth || 0;
  height.value = wrapperRef$.value?.offsetHeight || 0;
};

onMounted(() => {
  measureBoundingBox();
});
</script>

<template>
  <div ref="wrapperRef$" :class="$style['main-frame--wrapper']">
    <svg
      :width="width"
      :height="height"
      preserveAspectRatio="xMinYMin"
      color-profile="sRGB"
      class="main-frame"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <path
        :class="$style['main-frame--path']"
        :d="framePath"
        fill="transparent"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style module lang="scss" scoped>
@use '@/assets/styles/scss/modules/theme.module' as theme;

.main-frame {
  &--wrapper {
    position: absolute;
    width: 100%;
    height: 100vh;
  }

  &--path {
    stroke: #{theme.$frame-stroke-color};
    stroke-width: #{theme.$frame-stroke-width};
  }
}
</style>
