<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component({})
export default class DefaultLayout extends Vue {}
</script>

<style>
</style>
