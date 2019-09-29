import { HTTP } from '../_helpers/http-common'
import header from '@/_helpers/http-header'
import router from '../Routes';

export default {
  namespaced: true,
  state: {
    token: {
      value: localStorage.getItem('access_token') || null,
      type: localStorage.getItem('token_type') || null,
      expires: localStorage.getItem('expires_in') || null,
      expires_at: localStorage.getItem('expires_at') || null,
      expire_in: 0
    },
    userLogged: localStorage.getItem('userLogged') || null,
    loginLoading: false,
    pullingExpireToken: localStorage.getItem('pullingExpireToken') || null
  },
  getters: {
    login(state) {
      return state.token.value != null
    },
    tokenValue(state) {
      return state.token.value
    },
    userLogin(state) {
      return JSON.parse(state.userLogged)
    },
    loading(state) {
      return state.loginLoading
    },
    expire_at(state) {
      return state.token.expires_at
    },
    expire_in(state) {
      return state.token.expire_in
    }
  },
  mutations: {
    retrieveToken(state, access_token) {
      state.token.value = access_token
    },
    retrieveTokenType(state, token_type) {
      state.token.type = token_type
    },
    retrieveTokenExpires(state, expires_in) {
      state.token.expires = expires_in
    },
    retrieveTokenExpiresAt(state, expires_at) {
      state.token.expires_at = expires_at
    },
    retrieveUserLogged(state, userLogged) {
      state.userLogged = userLogged
    },
    retrieveTokenExpireIn(state, expire_in) {
      if(expire_in < 0)
        state.token.expire_in = 0
      else
        state.token.expire_in = expire_in
    },
    logout(state) {
      state.token.value = null
      state.token.type = null
      state.token.expires = null
      state.token.expires_at = null
      state.userLogged = null
      state.token.expire_in = 0
      clearInterval(state.pullingExpireToken)
    },
    pulledExpireToken(state) {
      if(state.token.expires_at != null) {
        const pulledExpireToken = setInterval(() => {
          var expire_in = ((new Date(state.token.expires_at) - new Date())/1000).toFixed(0);
          state.token.expire_in = expire_in
          if(state.token.expire_in < 30 && state.token.expire_in > 0) {
            if(router.history.current.path !== '/token/expire') {
              router.push({path: '/token/expire'})
            }
          } else if(state.token.expire_in <= 0) {
            clearInterval(state.pullingExpireToken)
          }
        }, 1000)
        state.pullingExpireToken = pulledExpireToken
      }
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      context.loginLoading = true
      credentials.vs.loading()
      HTTP.post('/auth/login', {
        email: credentials.username,
        password: credentials.password
      })
        .then(response => {
          context.loginLoading = false
          credentials.vs.loading.close()
          const access_token = response.data.access_token
          const token_type = response.data.token_type
          const expires_in = response.data.expires_in
          const userLogged = response.data.user

          var expires_at = new Date();
          expires_at.setSeconds( expires_at.getSeconds() + parseInt(expires_in) )

          localStorage.removeItem('access_token')
          localStorage.removeItem('token_type')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('userLogged')

          localStorage.setItem('access_token', access_token)
          localStorage.setItem('token_type', token_type)
          localStorage.setItem('expires_in', expires_in)
          localStorage.setItem('expires_at', expires_at)
          localStorage.setItem('userLogged', JSON.stringify(userLogged))

          context.commit('retrieveToken', access_token)
          context.commit('retrieveTokenType', token_type)
          context.commit('retrieveTokenExpires', expires_in)
          context.commit('retrieveTokenExpiresAt', expires_at)
          context.commit('retrieveUserLogged', JSON.stringify(userLogged))
          context.commit('pulledExpireToken')

          Messenger().post("Bienvenido "+userLogged.name);
          router.push({path: '/app'});
        })
        .catch(error => {
          context.loginLoading = false
          credentials.vs.loading.close()
          Messenger().post("Usuario o clave invalidos");
        })
    },
    logout(context, options){
      context.loginLoading = true
      options.vs.loading()
      HTTP.post('/auth/logout', {}, {headers: header(context.state.token.value)})
        .then(response => {
          context.loginLoading = false
          options.vs.loading.close()
          localStorage.removeItem('access_token')
          localStorage.removeItem('token_type')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('userLogged')

          context.commit('logout')
          Messenger().post("Sesion cerrada")

          router.push({path: '/login'})
        })
        .catch(error => {
          context.loginLoading = false
          options.vs.loading.close()
          localStorage.removeItem('access_token')
          localStorage.removeItem('token_type')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('userLogged')

          context.commit('logout')
          Messenger().post("Ocurrio un error al cerrar sesion")
          router.push({path: '/login'})
        })
    },
    refreshToken(context, options) {
      options.vs.loading()
      HTTP.post('/auth/refresh', {}, {headers: header(context.state.token.value)})
        .then(response => {
          options.vs.loading.close()
          const access_token = response.data.access_token
          const token_type = response.data.token_type
          const expires_in = response.data.expires_in
          const userLogged = response.data.user

          var expires_at = new Date();
          expires_at.setSeconds( expires_at.getSeconds() + parseInt(expires_in) )

          localStorage.removeItem('access_token')
          localStorage.removeItem('token_type')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('userLogged')

          localStorage.setItem('access_token', access_token)
          localStorage.setItem('token_type', token_type)
          localStorage.setItem('expires_in', expires_in)
          localStorage.setItem('expires_at', expires_at)
          localStorage.setItem('userLogged', JSON.stringify(userLogged))

          context.commit('retrieveToken', access_token)
          context.commit('retrieveTokenType', token_type)
          context.commit('retrieveTokenExpires', expires_in)
          context.commit('retrieveTokenExpiresAt', expires_at)
          context.commit('retrieveUserLogged', JSON.stringify(userLogged))
          context.commit('pulledExpireToken')

          Messenger().post("Se ha refrescado el token para "+userLogged.name);
          router.push({path: '/app'});
        })
        .catch(error => {
          options.vs.loading.close()
          Messenger().post("Usuario o clave invalidos");
        })
    },
    chekingToken(context) {
      context.commit('pulledExpireToken')
    }
  },
};
