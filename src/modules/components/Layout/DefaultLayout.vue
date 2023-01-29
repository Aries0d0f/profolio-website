<script setup lang="ts"></script>

<template>
  <ScreenTone></ScreenTone>
  <MainFrame></MainFrame>
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
