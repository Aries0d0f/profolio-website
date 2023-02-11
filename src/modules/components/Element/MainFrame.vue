<script setup lang="ts">
import { ref, computed } from 'vue';
import { useElementSize } from '@vueuse/core';

import Math$ from '@/shared/libs/math';

import type { Vector } from '@/shared/types/vector';

const props = defineProps<{
  title: string;
}>();

const wrapperRef$ = ref<HTMLElement>();
const { width, height } = useElementSize(wrapperRef$);

const bottomRightSpaceSize = ref(240);
const bottomLeftCornerSize = ref(60);
const bottomLeftOffset = ref(100);
const leftMiddleSpaceSize = ref(420);

const radius = ref(4);

const cuts = ref({
  topLeft: 50,
  topLeftDeco: 10,
  topLeftDecoGap: 10,
  topRight: 10,
  bottomRight: 15,
  bottomMiddleRight: 6,
  bottomMiddleLeft: 10,
  bottomLeft: 15,
  bottomLeftDecoGap: 5,
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
  y: start.value.y + cuts.value.topLeft + cuts.value.topLeftDecoGap
}));
const topLeftA1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftA0.value.x,
  y: topLeftA0.value.y + radius.value
}));
const topLeftA2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftA0.value.x + radius.value * Math.cos(Math$.rad(-45)),
  y: topLeftA0.value.y + radius.value * Math.sin(Math$.rad(-45))
}));

const topLeftC0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x,
  y: start.value.y + cuts.value.topLeftDeco
}));
const topLeftC1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftC0.value.x,
  y: topLeftC0.value.y + radius.value / 2
}));
const topLeftC2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftC0.value.x + (radius.value / 2) * Math.cos(Math$.rad(-45)),
  y: topLeftC0.value.y + (radius.value / 2) * Math.sin(Math$.rad(-45))
}));

const topLeftB0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + cuts.value.topLeft + cuts.value.topLeftDecoGap,
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

const topLeftD0 = computed<Vector<'x' | 'y'>>(() => ({
  x: start.value.x + cuts.value.topLeftDeco,
  y: start.value.y
}));
const topLeftD1 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftD0.value.x + (radius.value / 2) * Math.cos(Math$.rad(135)),
  y: topLeftD0.value.y + (radius.value / 2) * Math.sin(Math$.rad(135))
}));
const topLeftD2 = computed<Vector<'x' | 'y'>>(() => ({
  x: topLeftD0.value.x + radius.value / 2,
  y: topLeftD0.value.y
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

const bottomLeftC0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    bottomMiddleLeftA0.value.x +
    cuts.value.bottomLeftDecoGap * Math.cos(Math$.rad(-135)),
  y:
    bottomMiddleLeftA0.value.y +
    cuts.value.bottomLeftDecoGap * Math.sin(Math$.rad(-135))
}));
const bottomLeftC1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftC0.value.x + radius.value * Math.cos(Math$.rad(-135)),
  y: bottomLeftC0.value.y + radius.value * Math.sin(Math$.rad(-135))
}));
const bottomLeftC2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftC0.value.x + radius.value * Math.cos(Math$.rad(135)),
  y: bottomLeftC0.value.y + radius.value * Math.sin(Math$.rad(135))
}));

const bottomLeftD0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    bottomMiddleLeftB0.value.x +
    cuts.value.bottomLeftDecoGap * Math.cos(Math$.rad(-112.5)),
  y:
    bottomMiddleLeftB0.value.y +
    cuts.value.bottomLeftDecoGap * Math.sin(Math$.rad(-112.5))
}));
const bottomLeftD1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftD0.value.x + (radius.value / 2) * Math.cos(Math$.rad(-45)),
  y: bottomLeftD0.value.y + (radius.value / 2) * Math.sin(Math$.rad(-45))
}));
const bottomLeftD2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftD0.value.x + (radius.value / 2) * Math.cos(Math$.rad(180)),
  y: bottomLeftD0.value.y + (radius.value / 2) * Math.sin(Math$.rad(180))
}));

const bottomLeftE0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    bottomLeftA0.value.x +
    cuts.value.bottomLeftDecoGap * Math.cos(Math$.rad(-67.5)),
  y:
    bottomLeftA0.value.y +
    cuts.value.bottomLeftDecoGap * Math.sin(Math$.rad(-67.5))
}));
const bottomLeftE1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftE0.value.x + (radius.value / 2) * Math.cos(Math$.rad(0)),
  y: bottomLeftE0.value.y + (radius.value / 2) * Math.sin(Math$.rad(0))
}));
const bottomLeftE2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftE0.value.x + (radius.value / 2) * Math.cos(Math$.rad(-135)),
  y: bottomLeftE0.value.y + (radius.value / 2) * Math.sin(Math$.rad(-135))
}));

const bottomLeftF0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    bottomLeftB0.value.x +
    cuts.value.bottomLeftDecoGap * Math.cos(Math$.rad(-22.5)),
  y:
    bottomLeftB0.value.y +
    cuts.value.bottomLeftDecoGap * Math.sin(Math$.rad(-22.5))
}));
const bottomLeftF1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftF0.value.x + (radius.value / 2) * Math.cos(Math$.rad(45)),
  y: bottomLeftF0.value.y + (radius.value / 2) * Math.sin(Math$.rad(45))
}));
const bottomLeftF2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftF0.value.x + (radius.value / 2) * Math.cos(Math$.rad(-90)),
  y: bottomLeftF0.value.y + (radius.value / 2) * Math.sin(Math$.rad(-90))
}));

const bottomLeftG0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    leftMiddleBottomA0.value.x +
    cuts.value.bottomLeftDecoGap * Math.cos(Math$.rad(22.5)),
  y:
    leftMiddleBottomA0.value.y +
    cuts.value.bottomLeftDecoGap * Math.sin(Math$.rad(22.5))
}));
const bottomLeftG1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftG0.value.x + (radius.value / 2) * Math.cos(Math$.rad(90)),
  y: bottomLeftG0.value.y + (radius.value / 2) * Math.sin(Math$.rad(90))
}));
const bottomLeftG2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftG0.value.x + (radius.value / 2) * Math.cos(Math$.rad(-45)),
  y: bottomLeftG0.value.y + (radius.value / 2) * Math.sin(Math$.rad(-45))
}));

const bottomLeftH0 = computed<Vector<'x' | 'y'>>(() => ({
  x:
    leftMiddleBottomB0.value.x +
    cuts.value.bottomLeftDecoGap * Math.cos(Math$.rad(67.5)),
  y:
    leftMiddleBottomB0.value.y +
    cuts.value.bottomLeftDecoGap * Math.sin(Math$.rad(67.5))
}));
const bottomLeftH1 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftH0.value.x + radius.value * Math.cos(Math$.rad(135)),
  y: bottomLeftH0.value.y + radius.value * Math.sin(Math$.rad(135))
}));
const bottomLeftH2 = computed<Vector<'x' | 'y'>>(() => ({
  x: bottomLeftH0.value.x + radius.value * Math.cos(Math$.rad(45)),
  y: bottomLeftH0.value.y + radius.value * Math.sin(Math$.rad(45))
}));

const mainFramePath = computed(
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

const decoLine = computed(
  () => `
  M ${leftMiddleTopB0.value.x}
    ${leftMiddleTopB0.value.y + cuts.value.leftMiddleTop * Math.SQRT2}
  V ${
    leftMiddleTopB0.value.y +
    cuts.value.leftMiddleTop * Math.SQRT2 +
    leftMiddleSpaceSize.value -
    bottomLeftOffset.value -
    +cuts.value.leftMiddleTop * 2.2
  }
  M ${
    bottomMiddleRightA0.value.x -
    cuts.value.bottomMiddleRight * Math.SQRT2 * Math.SQRT2
  }
    ${bottomMiddleRightA0.value.y}
  H ${
    bottomMiddleLeftB0.value.x +
    cuts.value.bottomMiddleLeft * Math.SQRT2 * Math.SQRT2 +
    bottomLeftOffset.value
  }
`
);

const decoDash = computed(
  () => `
  M ${leftMiddleTopB0.value.x}
    ${
      leftMiddleTopB0.value.y +
      cuts.value.leftMiddleTop * Math.SQRT2 +
      leftMiddleSpaceSize.value -
      bottomLeftOffset.value -
      +cuts.value.leftMiddleTop
    }
  v ${bottomLeftOffset.value}
  M ${
    bottomMiddleLeftB0.value.x +
    cuts.value.bottomMiddleLeft * Math.SQRT2 * Math.SQRT2 +
    bottomLeftOffset.value
  }
    ${bottomMiddleRightA0.value.y}
  h ${-bottomLeftOffset.value}
`
);

const decoTopLeftCornerPath = computed(
  () => `
  M ${topLeftC1.value.x} ${topLeftC1.value.y}
  Q ${topLeftC0.value.x} ${topLeftC0.value.y}
    ${topLeftC2.value.x} ${topLeftC2.value.y}
  L ${topLeftD1.value.x} ${topLeftD1.value.y}
  Q ${topLeftD0.value.x} ${topLeftD0.value.y}
    ${topLeftD2.value.x} ${topLeftD2.value.y}
  L ${topLeftB0.value.x - cuts.value.topLeftDecoGap} ${topLeftB0.value.y}
  L ${topLeftA0.value.x} ${topLeftA0.value.y - cuts.value.topLeftDecoGap}
  L ${topLeftC1.value.x} ${topLeftC1.value.y}
  Z
`
);

const decoBottomLeftCornerPath = computed(
  () => `
  M ${bottomLeftC1.value.x} ${bottomLeftC1.value.y}
  Q ${bottomLeftC0.value.x} ${bottomLeftC0.value.y}
    ${bottomLeftC2.value.x} ${bottomLeftC2.value.y}
  L ${bottomLeftD1.value.x} ${bottomLeftD1.value.y}
  Q ${bottomLeftD0.value.x} ${bottomLeftD0.value.y}
    ${bottomLeftD2.value.x} ${bottomLeftD2.value.y}
  L ${bottomLeftE1.value.x} ${bottomLeftE1.value.y}
  Q ${bottomLeftE0.value.x} ${bottomLeftE0.value.y}
    ${bottomLeftE2.value.x} ${bottomLeftE2.value.y}
  L ${bottomLeftF1.value.x} ${bottomLeftF1.value.y}
  Q ${bottomLeftF0.value.x} ${bottomLeftF0.value.y}
    ${bottomLeftF2.value.x} ${bottomLeftF2.value.y}
  L ${bottomLeftG1.value.x} ${bottomLeftG1.value.y}
  Q ${bottomLeftG0.value.x} ${bottomLeftG0.value.y}
    ${bottomLeftG2.value.x} ${bottomLeftG2.value.y}
  L ${bottomLeftH1.value.x} ${bottomLeftH1.value.y}
  Q ${bottomLeftH0.value.x} ${bottomLeftH0.value.y}
    ${bottomLeftH2.value.x} ${bottomLeftH2.value.y}
  Z
`
);

const decoTextPath = computed(
  () => `
  M ${topLeftA0.value.x + radius.value}
    ${topLeftA0.value.y + cuts.value.topLeft / 4}
  L ${leftMiddleTopB0.value.x + radius.value}
    ${leftMiddleTopB0.value.y - cuts.value.topLeft / 4}
`
);
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
      <defs>
        <mask id="main-frame-outline">
          <path
            :d="mainFramePath"
            fill="#FFF"
            stroke="#FFF"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </mask>
        <mask id="main-frame">
          <path
            :d="mainFramePath"
            fill="#FFF"
            stroke="#FFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </mask>
        <mask id="deco-top-left-corner">
          <path
            :d="decoTopLeftCornerPath"
            fill="transparent"
            stroke="#FFF"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </mask>
        <mask id="deco-bottom-left-corner">
          <path
            :d="decoBottomLeftCornerPath"
            fill="transparent"
            stroke="#FFF"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <path
        :class="$style['main-frame--path']"
        :d="mainFramePath"
        fill="transparent"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="[$style['main-frame--path'], $style['deco-line']]"
        :d="decoLine"
        fill="transparent"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="[$style['main-frame--path'], $style['deco-dash']]"
        :d="decoDash"
        fill="transparent"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="[$style['main-frame--path'], $style['deco-corner']]"
        :d="decoTopLeftCornerPath"
        fill="transparent"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="[$style['main-frame--path'], $style['deco-corner']]"
        :d="decoBottomLeftCornerPath"
        fill="transparent"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        id="deco-text-path"
        :d="decoTextPath"
        fill="transparent"
        stroke="transparent"
      />
      <text
        :class="[
          $style['main-frame--path'],
          $style['deco-text'],
          $style['outline']
        ]"
        stroke-linecap="round"
        stroke-linejoin="round"
        mask="url(#main-frame-outline)"
      >
        <textPath href="#deco-text-path">{{ props.title }}</textPath>
      </text>
      <text
        :class="[$style['main-frame--path'], $style['deco-text']]"
        stroke-linecap="round"
        stroke-linejoin="round"
        mask="url(#main-frame)"
      >
        <textPath href="#deco-text-path">{{ props.title }}</textPath>
      </text>
    </svg>
  </div>
</template>

<style module lang="scss" scoped>
@use '@/assets/styles/scss/modules/theme.module' as theme;

.main-frame {
  &--wrapper {
    position: fixed;
    width: 100%;
    height: 100vh;

    svg {
      shape-rendering: geometricprecision;
      text-rendering: geometricprecision;
      image-rendering: optimizequality;
      color-rendering: optimizequality;
    }
  }

  &--path {
    stroke: #{theme.$frame-stroke-color};
    stroke-width: #{theme.$frame-stroke-width};

    &.deco {
      &-corner {
        fill: #{theme.$frame-fill-color};
      }

      &-dash {
        stroke-dasharray: 6 8;
      }

      &-text {
        font-size: calc(40px * v-bind('props.title.length'));
        font-family: 'Noto Serif CJK TC', 'Noto Serif TC', serif;
        font-weight: 900;
        letter-spacing: -5px;
        fill: #{theme.$frame-fill-color};
        stroke: transparent;
        stroke-width: 1.2;

        &.outline {
          fill: transparent;
          stroke: #{theme.$frame-stroke-color};
        }
      }
    }
  }
}
</style>
