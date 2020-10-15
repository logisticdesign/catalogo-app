<template>
    <div id="app">
        <div class="absolute top-0 inset-x-0 bg-gray-800 text-white px-6 py-2 text-sm flex items-center justify-between">
            <div>
                <div v-if="message" v-html="message"></div>
            </div>

            <div>Versione {{ version }}</div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'catalogo-app',
        data() {
            return {
                message: null,
                version: null,
            }
        },
        created() {
            this.version = this.$electron.remote.app.getVersion()

            // Intercetto i Token scaduti
            this.$http.interceptors.response.use(undefined, ({ response }) => {
                if (response.status === 401 && response.config && !response.config.__isRetryRequest) {
                    this.$store.dispatch('logout')
                }
            });

            this.$electron.ipcRenderer.on('message', (e, message) => {
                this.message = message
            })
        }
    }
</script>
