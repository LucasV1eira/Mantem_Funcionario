<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borderss">
    <q-header reveal bordered>
      <q-toolbar class="bg-secondary text-black">
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="70"
      :breakpoint="700"
      elevated
      content-class="bg-primary text-white"
    >
    </q-drawer>
  </q-layout>
</template>

<script>

export default {
  data() {
    return {
      drawerLeft: false,
    };
  },
};
</script>