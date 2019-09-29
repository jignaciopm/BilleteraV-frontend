<template>
  <div class="login-page">
    <b-container>
      <h5 class="logo">
        <img src="../../../public/favicon.png" width="24px" alt="">
        BilleteraV
      </h5>
      <Widget class="mx-auto" title="<h3 class='mt-0'>Ingresa ahora</h3>" customHeader>
        <p class="text-muted mb-0 mt fs-sm">
          <!-- Use Facebook, Twitter or your email to sign in. -->
          Tu billetera virtual te ayudara a tener mejor control 
        </p>
        <p class="text-muted fs-sm">
          <!-- Don't have an account? Sign up now! -->
          y estadisticas de tus finanzas!
        </p>
        <form class="mt" @submit.prevent="authenticated">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="username"
              required type="text" name="username" placeholder="Username" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password"
            required type="password" name="password" placeholder="Password" />
          </div>
          <div class="clearfix">
            <div class="btn-toolbar float-right">
              <!-- <b-button type="reset" size="sm" variant="default">Create an Account</b-button> -->
              <b-button type="submit" size="sm" variant="inverse" v-show="!login">Login</b-button>
              <b-button size="sm" variant="inverse" v-show="login" @click="logout">Logout</b-button>
            </div>
          </div>
          <!-- <div class="row no-gutters mt-3">
            <div class="col">
              <div class="abc-checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                />
                <label for="checkbox" class="text-muted fs-sm">Keep me signed in</label>
              </div>
            </div>
            <div class="col">
              <a class="mt-sm" href="">Trouble with account?</a>
            </div>
          </div> -->
        </form>
      </Widget>
    </b-container>
    <footer class="footer">
      2019 &copy; Jose Ignacio powerd by Sing. Admin Dashboard Template.
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Widget from '@/components/Widget/Widget';

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters({
      login: 'auth/login',
      loading: 'auth/loading'
    }),
  },
  methods: {
    ...mapActions(
      'auth', ['retrieveToken'],
    ),
    authenticated() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;

      this.$store.dispatch('auth/retrieveToken', {
        username: username,
        password: password,
        vs: this.$vs
      })

      /*if (username.length !== 0 && password.length !== 0) {
        window.localStorage.setItem('authenticated', true);
        this.$router.push('/app/main/analytics');
      }*/
    },
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
};
</script>

<style src="./Login.scss" lang="scss" scoped />
