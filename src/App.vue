<script setup lang="ts">
import { setupModules } from '@/modules';

import { useComponent } from '@/modules/components/component.service';
import { usePage } from '@/modules/page/page.service';
import { useTheme } from '@/modules/theme/theme.service';

setupModules();

const $component = useComponent();
const $page = usePage();
const $theme = useTheme();

(async () => {
  $component.Initializer();
  await $theme.ListTheme();
  await $page.ListPageConfig();
  $page.GenerateRoutes();
})();
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
@import '@/assets/styles/scss/main';
</style>
