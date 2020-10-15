<template>
    <div id="app">
        <div
            v-if="message"
            v-html="message"

            class="bg-gray-800 text-white px-6 py-2 text-sm"
        ></div>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'catalogo-app',
        data() {
            return {
                message: null,
            }
        },
        created() {
            // Intercetto i Token scaduti
            this.$http.interceptors.response.use(undefined, ({ response }) => {
                if (response.status === 401 && response.config && !response.config.__isRetryRequest) {
                    this.$store.dispatch('logout')
                }
            });

            this.$electron.ipcRenderer.on('message', (e, message) => {
                console.log(message);

                this.message = message
            })
        }
    }
</script>
