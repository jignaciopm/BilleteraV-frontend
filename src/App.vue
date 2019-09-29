<template>
  <div>
	<router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'App',
	data() {
		return {
			toLogout: false
		}
	},
	computed: {
		...mapGetters({
			expireAt: 'auth/expire_at',
			expireIn: 'auth/expire_in'
		}),
	},
	created() {
		const currentPath = this.$router.history.current.path;
		if(currentPath === '/' || currentPath === '/app') {
			this.$router.push('/app/dashboard');
		}

		this.$store.dispatch('auth/chekingToken')

		/*if(this.expireAt != null)
		{
			var expire_at = ('' + this.expireAt).slice(1)
			var expire_at_date = new Date(expire_at)
			var expire_in_moment = ((expire_at_date - new Date())/1000).toFixed(0);
			if(expire_in_moment > 0)
			{
				const self = this
				setInterval(function() {
					console.log(self.expireAt)
					var expire_in = ((expire_at_date - new Date())/1000).toFixed(0);
					self.$store.commit('auth/retrieveTokenExpireIn', expire_in)
					if(self.expireIn < 3550 && !self.alertNotify) {
						self.alertNotify = true
						if(currentPath !== '/token/expire') {
							self.$router.push({path: '/token/expire'})
						}
					}
				}, 1000);
			}
		}*/
	},
	watch: {
		expireIn: function() {
			if(this.expireIn < 2 && !this.toLogout) {
				this.toLogout = true
				this.$store.dispatch('auth/logout',{vs: this.$vs})
			}
		}
	}
};
</script>

<style src="./styles/theme.scss" lang="scss" />
