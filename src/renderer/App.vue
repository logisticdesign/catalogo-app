<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'catalogo-app',
        created() {
            // Intercetto i Token scaduti
            this.$http.interceptors.response.use(undefined, ({ response }) => {
                if (response.status === 401 && response.config && !response.config.__isRetryRequest) {
                    this.$store.dispatch('logout')
                }
            });
        }
    }
</script>
