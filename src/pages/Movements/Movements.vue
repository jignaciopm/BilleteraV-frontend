<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>ESTAS AQUI</b-breadcrumb-item>
      <b-breadcrumb-item active>Movimientos</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Movimientos<!-- Mes de {{getCurrentMonth.string}} --></h1>
    <div>
        <div v-show="showFilters">
          <Widget class="h-100 mb-3" title="Filtros">
            <b-row>
              <b-col lg="6" sm="6" xs="12">
                <div class="pb-xlg h-100">
                  <h4 class="mb-3">Gastos</h4>
                  <select-all 
                    name="gasto"
                    selectAll="Seleccionar todos"
                    unSelectAll="Deseleccionar todos"
                    :options="filters.gastos.options"
                    :selected.sync="filters.gastos.selected"
                    :indeterminate.sync="filters.gastos.indeterminate"
                    :allSelected.sync="filters.gastos.allSelected" />
                </div>
              </b-col>
              <b-col lg="6" sm="6" xs="12">
                <div class="pb-xlg h-100">
                  <h4 class="mb-3">Banco</h4>
                  <select-all 
                    name="banco"
                    selectAll="Seleccionar todos"
                    unSelectAll="Deseleccionar todos"
                    :options="filters.banco.options"
                    :selected.sync="filters.banco.selected"
                    :indeterminate.sync="filters.banco.indeterminate"
                    :allSelected.sync="filters.banco.allSelected" />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="3" sm="6" xs="12">
                <div class="pb-xlg h-100">
                  <h4 class="mb-3">Tipo</h4>
                  <b-form-group>
                    <b-form-radio v-model="filters.tipo.selected" name="tipo" value="">Todos</b-form-radio>
                    <b-form-radio v-model="filters.tipo.selected" name="tipo" value="incomes">Ingresos (+)</b-form-radio>
                    <b-form-radio v-model="filters.tipo.selected" name="tipo" value="expenses">Egresos (-)</b-form-radio>
                  </b-form-group>
                </div>
              </b-col>
              <b-col lg="3" sm="6" xs="12">
                <div class="pb-xlg h-100">
                  <h4 class="mb-3">Medio</h4>
                  <b-form-group>
                    <b-form-radio v-model="filters.medio.selected" name="medio" value="">Todos</b-form-radio>
                    <b-form-radio v-model="filters.medio.selected" name="medio" value="cash">Efectivo</b-form-radio>
                    <b-form-radio v-model="filters.medio.selected" name="medio" value="transfer">Transferencia</b-form-radio>
                  </b-form-group>
                </div>
              </b-col>
              <b-col lg="3" sm="6" xs="12">
                <div class="pb-xlg h-100">
                  <h4 class="mb-3">Montos</h4>
                  <label for="range-1">Monto minimo: {{filters.monto.selected.min}}</label>
                  <b-form-input id="range-1" v-model="filters.monto.selected.min" type="range" step="50" min="0" max="2000" ref="min"/>
                  <label for="range-2">Monto maximo: {{filters.monto.selected.max}}</label>
                  <b-form-input id="range-2" v-model="filters.monto.selected.max" type="range" step="50" :min="filters.monto.inMaxThisMin" max="10000" ref="max"/>
                </div>
              </b-col>
            </b-row>

            <b-nav class="d-flex justify-content-end">
              <b-button variant="outline-success mr-2" @click="() => getData()">
                <span class="icon"><i class="fi flaticon-success"></i> Aplicar </span>
              </b-button>
              <b-button variant="outline-danger" @click="removeAllFilters">
                <span class="icon"><i class="fi flaticon-cancel-button"></i> Quitar </span>
                <b-badge variant="light">{{countTotalFilter}} <span class="sr-only">filtros aplicados</span></b-badge>
              </b-button>
            </b-nav>
          </Widget>
        </div>
        <b-nav class="d-flex justify-content-between">
          <b-button variant="outline-secondary" @click="() => showFilters ? (showFilters = false) : (showFilters = true)">
            <span class="icon"><i class="fi flaticon-controls"></i> Filtros </span>
            <b-badge variant="light">{{countTotalFilter}} <span class="sr-only">filtros aplicados</span></b-badge>
          </b-button>
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
import SelectAll from '@/components/SelectAll/SelectAll';
import { HTTP } from '../../_helpers/http-common'
import { mapGetters } from 'vuex';
import header from '@/_helpers/http-header'
import { Loading } from 'element-ui';
import isScreen from '@/core/screenHelper';

export default {
  name: 'Dashboard',
  components: { Widget, SelectAll },
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
        showFilters: false,
        filters: {
          gastos: {
            selected: [
              'Comisiones',
              'Cambios',
              'Medicinas',
              'Salidas',
              'Ayuda familiar'
            ],
            options: [
              'Comisiones',
              'Cambios',
              'Medicinas',
              'Salidas',
              'Ayuda familiar'
            ],
            allSelected: true,
            indeterminate: false
          },
          tipo: {
            selected: '',
            /* options: [
              'Ingresos',
              'Egresos'
            ],
            allSelected: true,
            indeterminate: false */
          },
          medio: {
            selected: '',
            /* options: [
              'Efectivo',
              'Transferencia'
            ],
            allSelected: true,
            indeterminate: false */
          },
          banco: {
            selected: [
              'Chase',
              'BofA',
              'BanPan'
            ],
            options: [
              'Chase',
              'BofA',
              'BanPan'
            ],
            allSelected: true,
            indeterminate: false
          },
          monto: {
            selected: {
              min: 0,
              max: 10000
            },
            inMaxThisMin: 0
          },
        },
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
    },
    countTotalFilter() {
      var filters = this.filters
      return (filters.gastos.selected.length + filters.tipo.selected.length + filters.medio.selected.length + filters.banco.selected.length)
    }
  },
  methods: {
    removeAllFilters() {
      for(var filter in this.filters) {
        if(filter != 'gastos' && filter != 'banco') {
          this.filters[filter].selected = ''
        } else this.filters[filter].selected = []
      }
      this.filters.monto.selected = {
        min: 0,
        max: 10000
      }
    },
    getData(search = '') {
        this.loading = true
        
        HTTP.get(`movimientos?page=${this.currentPage}&limit=${this.perPage}&gasto=${this.filters.gastos.selected.toString()}&search=${this.query.search}`, {
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
    perPage: function() {
      this.currentPage = 1
      this.getData()
    },
    'filters.monto.selected.min': function(newVal, oldVal) {
      this.filters.monto.inMaxThisMin = newVal
      if(parseInt(newVal) >= parseInt(this.filters.monto.selected.max)) this.filters.monto.selected.max = newVal
    }
  }
};
</script>
