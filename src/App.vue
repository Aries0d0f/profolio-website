<script setup lang="ts">
import { setupModules } from '@/modules';

import { useComponent } from '@/modules/components/component.service';
import { usePage } from '@/modules/page/page.service';
import { useTheme } from '@/modules/theme/theme.service';

setupModules();

const $component = useComponent();
const $page = usePage();
const $theme = useTheme();

$component.Initializer();
$theme.GetTheme();
$page.ListPageConfig();
</script>

<template>
  <template v-for="page in $page.pages.value" :key="page.id">
    <Suspense>
      <component
        :is="page.layout.instance"
        :page="page"
        :payload="page.layout"
      ></component>
    </Suspense>
  </template>
</template>

<style lang="scss">
@import '@/assets/styles/scss/main';
</style>
