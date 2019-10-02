<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>ESTAS AQUI</b-breadcrumb-item>
      <b-breadcrumb-item active>Movimientos</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Movimientos<!-- Mes de {{getCurrentMonth.string}} --></h1>
    <div>
      <pre>{{selected}}</pre>
        <b-nav class="d-flex justify-content-between">
          <b-form-checkbox-group
            v-model="selected"
            :options="options"
            name="buttons-1"
            button-variant="outline-default"
            buttons
            size="sm"
          ></b-form-checkbox-group>
          <b-form @submit.prevent="search" class="d-sm-down-none" inline>
            <b-form-group>
            <b-input-group class="input-group-no-border">
                <div class="input-group-addon d-flex align-items-center">
                <i class="la la-search px-3" />
                </div>
                <b-input id="search-input" v-model="searchValue" placeholder="Buscar movimiento"/>
            </b-input-group>
            </b-form-group>
          </b-form>
        </b-nav>
        <b-table 
            :busy="loading"
            sort-icon-left
            :items="data" 
            class="b-table-scroll" 
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :fields="fields"
            show-empty>
            <template v-slot:empty="scope">
              <h5 class="text-center">No hay movimientos</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
        </b-table>
        <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        ></b-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-enable */
import Widget from '@/components/Widget/Widget';
import { HTTP } from '../../_helpers/http-common'
import { mapGetters } from 'vuex';
import header from '@/_helpers/http-header'
import { Loading } from 'element-ui';

export default {
  name: 'Dashboard',
  components: { Widget },
  data() {
    return {
        data: [],
        perPage: 3,
        currentPage: 1,
        rows: 500,
        searchValue: "",
        sortBy: 'fecha',
        sortDesc: true,
        fields: [
          { key: 'id', sortable: true },
          { key: 'fecha', sortable: true },
          { key: 'concepto', sortable: true },
          { key: 'monto', sortable: true },
          { key: 'tipo', sortable: true },
          { key: 'medio', sortable: true },
          { key: 'banco', sortable: true },
          { key: 'gasto', sortable: true },
        ],
        selected: [], // Must be an array reference!
        options: [
          { text: 'Comisiones', value: 'Comisiones' },
          { text: 'Cambios', value: 'Cambios' },
          { text: 'Medicinas', value: 'Medicinas' },
          { text: 'Salidas', value: 'Salidas' },
          { text: 'Ayuda familiar', value: 'Ayuda familiar' }
        ],
        query: {
            search: ""
        },
        loading: false
    };
  },
  computed: {
    ...mapGetters({
        tokenValue: 'auth/tokenValue'
    }),
  },
  methods: {
    getData(search = '') {
        this.loading = true
        HTTP.get(`movimientos?page=${this.currentPage}&search=${this.query.search}&gasto=${this.selected.toString()}`, {
            headers: header(this.tokenValue)
        })
            .then(response => {
                this.loading = false
                this.currentPage = response.data.current_page
                this.rows = response.data.total
                this.perPage = response.data.per_page
                this.data = response.data.data.map(function(data){
                    delete data['es_mensualidad']
                    delete data['id_user']
                    delete data['created_at']
                    delete data['updated_at']
                    return data
                })
            })
            .catch(() => {
                this.loading = false
                Messenger().post("Error!");
            })
    },
    search() {
        this.query.search = this.searchValue
        this.getData()
    }
  },
  created() {
    this.getData()
  },
  watch: {
      currentPage: function() {
          this.getData()
      },
      selected: function() {
        this.getData()
      }
  }
};
</script>
