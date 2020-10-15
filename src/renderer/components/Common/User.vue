<template>
    <div>
        <div class="font-bold">{{ user.name }}</div>
        <div class="text-sm text-gray-600">{{ user.email }}</div>

        <button class="mt-2 text-xs text-gray-700 underline focus:outline-none" @click.prevent="logout">
            Logout
        </button>
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.getters.authUser
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout').then(() => {
                    this.$router.replace('/login')
                })
            }
        }
    }
</script>
