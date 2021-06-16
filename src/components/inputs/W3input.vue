<template>
  <q-input
    filled
    v-model="matricula"
    :label="text_Inicial"
    :hint="hint"
    :type="tipo"
    lazy-rules
    :rules="rules"
  />
</template>

<script>
export default {
  name:'W3input',
  props: {
    text_Inicial: String,
    hint: String,
    tipo: String,
    rules: []
  },
  data(){
    return{
      matricula: null,
    }
  }
};
</script>

<style>
</style>