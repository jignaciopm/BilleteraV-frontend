<template>
    <div class="login-page">
        <b-container>
            <h5 class="logo">
                <img src="../../../public/favicon.png" width="24px" alt="">
                BilleteraV
            </h5>
            <Widget class="mx-auto" title="<h3 class='mt-0'>Refresca tu token</h3>" customHeader>
                <p class="text-muted mb-0 mt fs-sm">
                    <!-- Use Facebook, Twitter or your email to sign in. -->
                    Si quieres continuar utilizando tu BilleteraV
                </p>
                <p class="text-muted fs-sm">
                    <!-- Don't have an account? Sign up now! -->
                    refresca tu token
                </p>
                <h6>Expira en {{expireIn}}</h6>
                <p class="text-muted fs-sm">
                    ¿Deseas continuar utilizando tu BilleteraV?
                </p>
                <div class="clearfix">
                    <div class="btn-toolbar float-right">
                        <b-button type="reset" size="sm" variant="default" @click="refresh">Si</b-button>
                        <b-button size="sm" variant="inverse" @click="logout">No</b-button>
                    </div>
                </div>
            </Widget>
        </b-container>
        <footer class="footer">
        2019 &copy; Jose Ignacio powerd by Sing. Admin Dashboard Template.
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Widget from '@/components/Widget/Widget';

export default {
    name: 'token_expire',
    components: { Widget },
    computed: {
        ...mapGetters({
            expireIn: 'auth/expire_in'
        })
    },
    methods: {
        refresh() {
            this.$store.dispatch('auth/refreshToken', {vs: this.$vs})
        },
        logout() {
            this.$store.dispatch('auth/logout', {vs: this.$vs})
        }
    }
};
</script>

<style src="../Login/Login.scss" lang="scss" scoped />
