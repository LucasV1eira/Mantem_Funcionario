<template>
  <q-page>
    <div class="div_itens column">
      <h4>Cadastro de Funcionário</h4>
      <q-form style="width: 500px" class="q-gutter-md">
        <q-input
          filled
          v-model="matricula"
          @reset="cancelar"
          label="Matricula *"
          hint="Apenas 7 digitos numéricos"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por obséquio digite 7 digitos...',
            (val) =>
              (val && val.length < 8 && val.length > 6) ||
              'Você tem ' +
                val.length +
                ' digitos de números e queremos apenas 7...',
          ]"
        />

        <q-input
          filled
          v-model="nome"
          label="Nome do Funcionário *"
          hint="Nome completo"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Por obséquio digite o nome completo...',
          ]"
        />

        <q-select
          filled
          v-model="cargo"
          :options="options1"
          label="Cargo do Funcionário"
          stack-label
          :dense="denseOpts"
          :options-dense="denseOpts"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Por obséquio escolha um dos cargos...',
          ]"
        />

        <q-select
          filled
          v-model="autorizante"
          :options="options3"
          label="Funcionário é autorizante?"
          stack-label
          :dense="denseOpts"
          :options-dense="denseOpts"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Por obséquio escolha se o Funcionário é autorizante...',
          ]"
        />

        <q-select
          filled
          v-model="status"
          :options="options2"
          label="Status do Funcionário"
          stack-label
          :dense="denseOpts"
          :options-dense="denseOpts"
          azy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Por obséquio escolha o estado do Funcionário...',
          ]"
        />

        <div class="flex flex-center row">
          <q-btn
            class="q-mr-xl"
            label="Cadastrar"
            @click="onSubmit"
            color="primary"
          />
          <q-btn
            class="q-ml-xl"
            label="Cancelar"
            @click="cancelar"
            type="reset"
            to="/cadastro"
            color="negative"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { api_employed } from "boot/axios";
export default {
  data() {
    return {
      matricula: null,
      digito: null,
      nome: null,
      cargo: null,
      autorizante: null,
      autorizante_b: null,
      status: null,
      status_b: null,

      options1: [
        "Administrador",
        "Caixa",
        "Operador da Recepção",
        "Operativo da Retaguarda",
        "Surpevisor de Caixas",
        "Tesoureiro",
      ],
      options2: ["Ativo", "Inativo"],
      options3: ["Sim", "Não"],

      denseOpts: false,
    };
  },

  methods: {
    transformaBity() {
      this.autorizante == "Sim"
        ? (this.autorizante_b = parseInt("1"))
        : (this.autorizante_b = parseInt("0"));
      this.status == "Ativo"
        ? (this.status_b = parseInt("1"))
        : (this.status_b = parseInt("0"));
    },
    onSubmit() {
      this.transformaBity();
      this.calculateMatricula();
      api_employed
        .post("/CadastrarEmployee", {
          Matricula: this.matricula + this.digito,
          Cargo: this.cargo,
          Nome: this.nome,
          Autorizante: this.autorizante_b,
          Status: this.status_b,
          
        })
        .catch(function (error) {
          console.log(error);
          alert("DEU PAU O CADASTRO")
        });
        alert("SE DEU PAU DEU PAU, POREM SE NAO FOI EFETIVADO")
    },
    cancelar() {
        (this.matricula = null),
        (this.nome = null),
        (this.cargo = null),
        (this.autorizante = null),
        (this.status = null),
        alert("Cancelou a Operação")
    },
    calculateMatricula() {
      var multiplos = 8;
      var soma = 0;
      for (let index = 0; index < this.matricula.length; index++) {
        soma += parseInt(this.matricula[index]) * multiplos;
        multiplos--;
      }
      this.digito = (soma * 10) % 11;
      this.digito == 10 ? (this.digito = 0) : (this.digito = this.digito);
    },
  },
};
</script>

<style lang="scss">
.div_itens {
  position: fixed;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: start;
  background: #ededed;
}
</style>