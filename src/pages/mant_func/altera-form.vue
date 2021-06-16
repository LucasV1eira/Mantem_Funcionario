<template>
  <q-page>
    <div id="corpo" class="column">
      <h4>Alteração de Funcionário</h4>
      <q-form style="width: 500px" class="q-gutter-md">
        <q-input
          filled
          v-model="funcionario.matricula"
          type="number"
          label="Matricula *"
          hint="Apenas 8 digitos numéricos"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por obséquio digite 8 digitos...',
            (val) =>
              (val && val.length < 9 && val.length > 7) ||
              'Você tem ' +
                val.length +
                ' digitos de números e queremos apenas 8...',
          ]"
        />

        <q-input
          filled
          v-model="funcionario.nome"
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
          v-model="funcionario.cargo"
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
          v-model="funcionario.autorizante"
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
          v-model="funcionario.status"
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
        <div class="column flex flex-center">
          <p>Deseja mudar a senha?</p>
          <div class="q-gutter-sm flex flex-center row">
            <q-radio
              v-model="funcionario.alterarSenha"
              :val="true"
              label="Sim"
            />
            <q-radio
              v-model="funcionario.alterarSenha"
              :val="false"
              label="Não"
            />
          </div>
        </div>

        <q-input
          :disable="!funcionario.alterarSenha"
          filled
          v-model="funcionario.novaSenha"
          label="Nova Senha *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Por obséquio digite uma nova senha...',
          ]"
        />

        <q-input
          :disable="!funcionario.alterarSenha"
          filled
          v-model="funcionario.confirmacaoSenha"
          label="Confirmar Senha *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Por obséquio confirme a senha nova...',
          ]"
        />

        <div class="flex flex-center row">
          <q-btn
            class="q-mr-xl"
            label="Alterar"
            @click="onSubmit"
            color="primary"
          />
          <q-btn
            class="q-ml-xl"
            label="Cancelar"
            @click="cancelar()"
            type="reset"
            color="negative"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import W3input from "components/inputs/W3input.vue";
import { api_employed } from "boot/axios";

export default {
  components: {
    w3input: W3input,
  },
  methods: {
    cancelar() {
      this.funcionario.matricula = null;
      this.funcionario.nome = null;
      this.funcionario.cargo = null;
      this.funcionario.autorizante = null;
      this.funcionario.status = null;
      this.funcionario.alterarSenha = false;
      this.funcionario.novaSenha = null;
      this.funcionario.confirmacaoSenha = null;
      this.$router.push("/cadastro");
    },
    transformaBity() {
      this.funcionario.autorizante == "Sim"
        ? (this.funcionario.autorizante_b = parseInt("1"))
        : (this.funcionario.autorizante_b = parseInt("0"));
      this.funcionario.alterarSenha == true
        ? (this.funcionario.alterarSenha_b = parseInt("1"))
        : (this.funcionario.alterarSenha_b = parseInt("0"));
      this.funcionario.status == "Ativo"
        ? (this.funcionario.status_b = parseInt("1"))
        : (this.funcionario.status_b = parseInt("0"));
    },
    onSubmit() {
      this.transformaBity();
      if (this.funcionario.alterarSenha) {
        api_employed
          .put("/AlterarEmployee", {
            params: {
              Matricula: this.funcionario.matricula,
              Cargo: this.funcionario.cargo,
              Nome: this.funcionario.nome,
              Autorizante: this.funcionario.autorizante_b,
              Status: this.funcionario.status_b,
              AlterarSenha: this.funcionario.alterarSenha_b,
              NovaSenha: this.funcionario.novaSenha,
              ConfirmacaoSenha: this.funcionario.confirmacaoSenha,
            },
          })
          .catch(function (error) {
            console.log(error);
            alert("DEU PAU A ALTERACAO");
          });
      } else {
        api_employed
          .put("/AlterarEmployee", {
              Matricula: this.funcionario.matricula,
              Cargo: this.funcionario.cargo,
              Nome: this.funcionario.nome,
              Autorizante: this.funcionario.autorizante_b,
              Status: this.funcionario.status_b,
          })
          .catch(function (error) {
            console.log(error);
            alert("DEU PAU A ALTERACAO");
          });
      }
      alert("SE DEU PAU DEU PAU, POREM SE NAO FOI EFETIVADO");
    },
  },
  data() {
    return {
      funcionario: {
        matricula: null,
        nome: null,
        cargo: null,
        autorizante: null,
        status: null,
        alterarSenha: false,
        novaSenha: null,
        confirmacaoSenha: null,

        autorizante_b: null,
        status_b: null,
        alterarSenha_b: null,
      },
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
};
</script>

<style lang="scss">
    #corpo {
  height: 100vmax;
  align-items: center;
  justify-items: start;
  background: #ededed;
}
</style>