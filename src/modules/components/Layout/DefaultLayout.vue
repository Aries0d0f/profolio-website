<script setup lang="ts">
import { computed } from 'vue';

import type { GeneralComponent } from '@/shared/types/component';

const props = defineProps<GeneralComponent.Props>();

const context = computed(() => props.metadata?.i18n?.default);
const decoTitle = computed(() => context.value?.deco);
</script>

<template>
  <ScreenTone></ScreenTone>
  <MainFrame :title="decoTitle"></MainFrame>
  <RouterView name="GFXView"></RouterView>
  <RouterView name="DataView"></RouterView>
  <div class="viewport">
    <RouterView name="ContentView"></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.viewport {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
