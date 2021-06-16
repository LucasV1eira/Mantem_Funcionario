<template>
  <div id="teste" class="q-pa-md">
    <template>
      <div class="row q-gutter-y-md q-mb-md">
        <q-toolbar
          class="bg-primary text-white rounded-borders"
          style="width: 830px; max-width: 100%"
        >
          <q-btn-dropdown color="primary glossy" label="Opções para Pesquisa">
            <q-list>
              <template v-for="(item, index) in itens_buttons">
                <q-item
                  :key="index"
                  clickable
                  v-close-popup
                  @click="onItemClick(item.s1)"
                >
                  <q-item-section>
                    <q-item-label>{{ item.s1 }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-btn-dropdown>
          <label class="q-ml-xl" style="font-size: 20px">{{ valor }}</label>

          <q-space />

          <q-input dark dense standout v-model="text" input-class="text-right">
            <template v-slot:append>
              <q-icon v-if="text === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="text = ''"
              />
            </template>
          </q-input>
          <div class="q-pa-sm">
            <q-btn
              class="glossy"
              color="primary"
              @click="loadData"
              label="Pesquisar"
            />
          </div>
        </q-toolbar>
      </div>
    </template>

    <q-table
      class="col bg-grey-2 q-mr-md table-striped"
      title="Funcionários"
      dense
      style="fixed: true"
      virtual-scroll
      :data="data_table"
      :columns="columns"
      row-key="matricula"
      :pagination.sync="pagination"
      :separator="'cell'"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="fit row justify-between">
          <div class="column justify-center">
            <label style="font-size: 20px">Lista de Funcionários</label>
          </div>
          <div class="column justify-center">
            <q-btn
              class="glossy"
              rounded
              to="/cadastro-form"
              color="primary"
              label="Criar Funcionário"
            />
          </div>
        </div>
      </template>

      <template v-slot:body-cell-buttons="props">
        <q-td :props="props">
          <q-btn
            icon="create"
            color="primary"
            size="sm"
            @click="
              alterar(
                props.row.matricula,
                props.row.nome,
                props.row.cargo,
                props.row.autorizante,
                props.row.situacao
              )
            "
            class="q-ml-sm"
          />
          <q-btn
            icon="delete"
            class="q-ml-sm"
            @click="deleteFunc(props.row.matricula)"
            color="negative"
            size="sm"
          />
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
import { api_employed } from "boot/axios";
var valor = "Matricula";
const itens_buttons = [
  {
    s1: "Matricula"
  },
  {
    s1: "Cargo"
  },
  {
    s1: "Nome"
  }
];

export default {
  computed: {},
  methods: {
    onItemClick: function(valor2) {
      this.valor = valor2;
    },
    alterar(matriculaA, nomeA, cargoA, autorizanteA, situacaoA) {
      this.$router.push({
        name: "alterar",
        params: {
          matriculaC: matriculaA,
          nomeC: nomeA,
          cargoC: cargoA,
          autorizanteC: autorizanteA,
          situacaoC: situacaoA
        }
      });
    },
    async deleteFunc(matricula2) {
      await api_employed
        .delete("/RemoverEmployee", {
          params: {
            matricula: matricula2
          }
        })
        .then(() => {
          this.loadData();
          alert("Removido com Sucesso");
        })
        .catch(function(error) {
          console.log(error);
          alert("Remoção não concluida");
        });
    },
    loadData() {
      this.loading = true;
      api_employed
        .get("/VisualizarEmployee")
        .then(response => {
          this.data_table = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem"
          });
        });
    }
  },

  data() {
    return {
      table: true,
      itens_buttons,
      loading: false,
      text: "",
      valor,

      pagination: {
        rowsPerPage: 21
      },

      data_table: [],
      columns: [
        {
          name: "matricula",
          label: "Matricula",
          field: "matricula",
          align: "left",
          sortable: true,
          required: true
        },
        {
          name: "name",
          label: "Nome do Funcionário",
          field: "nome",
          align: "left",
          required: true,
          sortable: true
        },
        {
          name: "cargo",
          label: "Cargo",
          required: true,
          field: "cargo",
          align: "center"
        },
        {
          name: "autorizante",
          label: "Autorizante",
          required: true,
          format: val => `${val == 1 ? "Sim" : "Não"}`,
          field: "autorizante",
          align: "center"
        },
        {
          name: "status",
          label: "Situação",
          required: true,
          format: val => `${val == 1 ? "Ativo" : "Inativo"}`,
          field: "status",
          sortable: true,
          align: "center"
        },
        {
          name: "buttons",
          label: "Ações",
          field: "buttons",
          required: true,
          align: "center"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
#teste {
  position: absolute;
  width: 100vw;
  height: 100vmax;
  background: #ededed;
}
</style>
