<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated class="bb-primary">
      <q-toolbar>
        <q-btn class="glossy" @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Retaguarda Agência</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="275"
      :breakpoint="500"
      bordered
      elevated
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit" visible>
        <q-list>
          <template v-for="(menuItem, index) in menuList">
            <q-item
              :key="index"
              clickable
              :active="menuItem.label === 'Outbox'"
              v-ripple
              @click="drawer = false"
              :to="menuList[index].go"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container to="/home">
        <keep-alive>
          <router-view />
        </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: "app_registration",
    label: "Manutenção de Funcionário",
    separator: false,
    go: "/cadastro",
  },
  {
    icon: "published_with_changes",
    label: "Equipamento",
    separator: true,
    go: "/alteracao",
  },
  {
    icon: "published_with_changes",
    label: "Template1",
    separator: false,
    go: "/alteracao",
  },
  {
    icon: "published_with_changes",
    label: "Template2",
    separator: false,
    go: "/2",
  },
];

export default {
  data() {
    return {
      drawer: false,
      menuList,
    };
  },
};
</script>

