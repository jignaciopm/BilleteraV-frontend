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
          <b-dropdown id="dropdown-left" variant="outline-secondary" class="m-2">
            <template v-slot:button-content>
              <span><span class="icon"><i class="fi flaticon-controls"></i></span> Filtros </span>
            </template>
            <b-dropdown-form>
              <b-form-group>
                <template v-slot:label>
                  <b>Gastos:</b><br>
                  <b-form-checkbox
                    v-model="allSelected"
                    :indeterminate="indeterminate"
                    aria-describedby="flavours"
                    aria-controls="flavours"
                    @change="toggleAll"
                  >
                    {{ allSelected ? 'Un-select All' : 'Select All' }}
                  </b-form-checkbox>
                </template>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
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
            :stacked="isStacked"
            :busy="loading"
            sort-icon-left
            class="b-table-scroll" 
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :fields="fields"
            show-empty
            :items="data">
            <template v-slot:empty="scope">
              <h5 class="text-center">No hay movimientos</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
              </div>
            </template>
        </b-table>
        <div class="d-flex justify-content-between align-items-end">
          <b-form-group label="Movimientos por pagina">
            <b-form-radio-group
              v-model="perPage"
              :options="[1,5,10,25,50,100]"
              buttons
              size="sm"
              :disabled="loading"
              button-variant="outline-secondary"
              name="radios-btn-default"
            ></b-form-radio-group>
          </b-form-group>
          <b-pagination
            align="right"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            :disabled="loading"
            aria-controls="my-table"/>
        </div>
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
import isScreen from '@/core/screenHelper';

export default {
  name: 'Dashboard',
  components: { Widget },
  data() {
    return {
        data: [],
        perPage: 5,
        currentPage: 1,
        rows: 0,
        searchValue: "",
        sortBy: 'fecha',
        sortDesc: true,
        isStacked: !isScreen('xl') && !isScreen('lg'),
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
        selected: [
          'Comisiones',
          'Medicinas'
        ],
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
    noIsBigScreen() {
      return !isScreen('xl') && !isScreen('lg')
    }
  },
  methods: {
    getData(search = '') {
        this.loading = true
        
        HTTP.get(`movimientos?page=${this.currentPage}&limit=${this.perPage}&gasto=${this.selected.toString()}&search=${this.query.search}`, {
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
    var self = this
    window.addEventListener('resize', function() {
      self.isStacked = !isScreen('xl') && !isScreen('lg')
    })
  },
  watch: {
      currentPage: function() {
          this.getData()
      },
      selected: function() {
        this.currentPage = 1
        this.getData()
      },
      perPage: function() {
        this.currentPage = 1
        this.getData()
      }
  }
};
</script>
