<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>ESTAS AQUI</b-breadcrumb-item>
      <b-breadcrumb-item active>Principal</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Principal<!-- Mes de {{getCurrentMonth.string}} --></h1>
    <b-row>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Balance">
            <div id="incomesAll">
              <div class="d-flex justify-content-between align-items-center mb-lg">
                <h2>$ {{ balance.toFixed(2) }}</h2>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div class="mt">
                  <h6 class="fw-semi-bold">$ {{available.toFixed(2)}}</h6><p class="text-muted mb-0 mr"><small>Disponible</small></p>
                </div>
                <div class="mt">
                  <h6>$ {{debtors.toFixed(2)}}</h6><p class="text-muted mb-0"><small>Deudores</small></p>
                </div>
                <div class="mt">
                  <h6>{{((available/balance)*100).toFixed(2)}}%</h6><p class="text-muted mb-0 mr"><small>Porct.</small></p>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Transferencias">
            <div id="incomesAll">
              <div class="d-flex justify-content-between align-items-center mb-lg">
                <h2>$ {{ transfer.toFixed(2) }}</h2>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <div class="d-flex flex-wrap justify-content-between">
                <div class="mt">
                  <h6>$ {{banks.chase.toFixed(2)}}</h6><p class="text-muted mb-0 mr"><small>Chase</small></p>
                </div>
                <div class="mt">
                  <h6>$ {{banks.banpan.toFixed(2)}}</h6><p class="text-muted mb-0"><small>BanPan</small></p>
                </div>
                <div class="mt">
                  <h6>$ {{banks.bofa.toFixed(2)}}</h6><p class="text-muted mb-0"><small>BofA</small></p>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Efectivo">
            <div id="incomesAll">
              <div class="d-flex justify-content-between align-items-center mb-lg">
                <h2>$ {{ cash.toFixed(2) }}</h2>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <!-- <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="App Perfomance">
            <p class="text-muted d-flex flex-wrap">
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-success text-success mr-xs" style="font-size: 4px;">.</span>
                  This Period
              </small>
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-warning text-warning mr-xs" style="font-size: 4px;">.</span>
                Last Period
              </small>
            </p>
            <h6>SDK</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="success" :value="60" :max="100" />
            <b-progress class="mb" style="height: 5px"
              variant="warning" :value="35" :max="100" />
            <h6>Integration</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="success" :value="40" :max="100" />
            <b-progress style="height: 5px"
              variant="warning" :value="55" :max="100" />
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Server Overview">
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>60% / 37°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="['#ffc247']"
                  :height="30"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>54% / 31°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="['#9964e3']"
                  :height="30"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center">
              <p class="width-150"><small>57% / 21°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="['#3abf94']"
                  :height="30"
                  smooth />
              </div>
            </div>
          </Widget>
        </div>
      </b-col> -->
    </b-row>
    
    <b-row>
      <b-col xs="12">
        <Widget
          title="<h3 class='d-flex align-items-center pb-1 fw-semi-bold'>Gastos</h3>"
          bodyClass="p-10 mt"
          customHeader
        >
          <p>Se muestran todos los gastos por categorias desde que usted se registro en BilleteraV</p>
          <!-- <column-chart :data="expenses"></column-chart> -->
          <line-chart :data="expensesByMonth" />
        </Widget>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>Gastos</h5>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">4,232</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+830</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>4.5%</h6>
                <i class="la la-arrow-right text-danger rotate-45" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>Sing App</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">754</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+30</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>2.5%</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>RNS</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">1,025</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+230</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>21.5%</h6>
                <i class="la la-arrow-right text-danger rotate-45" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-enable */
import Widget from '@/components/Widget/Widget';
import { HTTP } from '../../_helpers/http-common'
import { mapGetters } from 'vuex';
import header from '@/_helpers/http-header'

export default {
  name: 'Dashboard',
  components: { Widget },
  data() {
    return {
      currentMonth: 0,
      amountTotalCurrentMonthlyPayment: 0,
      balance: 0,
      available: 0,
      debtors: 0,
      transfer: 0,
      cash: 0,
      banks: {
        chase: 0,
        banpan: 0,
        bofa: 0
      },
      expenses: [],
      expensesByMonth: []
    };
  },
  computed: {
    ...mapGetters({
		  expireAt: 'auth/expire_at',
			expireIn: 'auth/expire_in',
      tokenValue: 'auth/tokenValue'
		}),
    getCurrentMonth() {
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var today = new Date()
      const currentMonth = {
        value: today.getMonth() + 1,
        string: monthNames[today.getMonth()]
      }
      return currentMonth;
    },
    getNameExpenses() {
      return ['Hogar','Carro', 'Medicinas', 'Ayuda familiar', 'Salida', 'Comisiones', 'Cambios', 'Prestamos', 'Otros'];
    }
  },
  methods: {
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getData() {
      const data = [];
      const seriesCount = this.getNameExpenses.length;
      const accessories = this.getNameExpenses;

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    },
    getDashboard() {
      HTTP.get(`dashboard`, {
        headers: header(this.tokenValue)
      })
        .then(response => {
          this.balance = response.data.balance
          this.available = response.data.disponible
          this.debtors = response.data.deudores
          this.transfer = response.data.transferencia
          this.cash = response.data.efectivo
          this.banks.chase = response.data.chase
          this.banks.banpan = response.data.banpan
          this.banks.bofa = response.data.bofa
          this.expenses = response.data.gastos
          this.expensesByMonth = response.data.gastosPorMes
        })
        .catch(() => {
          Messenger().post("Error!");
        })
    },
    getAmountTotalCurrentMonthlyPayment() {
      HTTP.get(`movimientos/monto-total?es_mensualidad=1&mes=${this.getCurrentMonth.value}`, {
        headers: header(this.tokenValue)
      })
        .then(response => {
          this.amountTotalCurrentMonthlyPayment = response.data[this.getCurrentMonth.value]
        })
        .catch(() => {
          Messenger().post("Error!");
        })
    },
  },
  created() {
    this.getAmountTotalCurrentMonthlyPayment()
    this.getDashboard()
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" scoped />
