<template>
    <main class="h-screen w-full flex items-center justify-center">
        <section class="w-full max-w-sm">
            <img src="~@/assets/logo.png" class="w-64 mx-auto mb-8">

            <div class="bg-white rounded shadow p-6">
                <div class="text-2xl font-bold tracking-wider">
                    LOGIN
                </div>

                <form class="mt-4" @submit.prevent="login">
                    <div class="mb-4">
                        <label class="block">
                            <span class="text-gray-700">Email</span>
                            <input type="email" class="form-input mt-1 block w-full" v-model="form.email">
                        </label>

                        <div class="text-xs text-red-500 mt-1" v-if="hasError('email')">{{ error('email') }}</div>
                    </div>

                    <div class="mb-4">
                        <label class="block">
                            <span class="text-gray-700">Password</span>
                            <input type="password" class="form-input mt-1 block w-full" v-model="form.password">
                        </label>

                        <div class="text-xs text-red-500 mt-1" v-if="hasError('password')">{{ error('password') }}</div>
                    </div>

                    <button
                        type="submit"
                        class="w-full px-6 py-3 bg-gray-800 text-white rounded uppercase font-light tracking-wider focus:outline-none"
                    >
                        Accedi
                    </button>
                </form>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    deviceName: '',
                },
                errors: [],
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.form)
                .then(() => {
                    this.$router.push({ name: 'home' })
                })
                .catch(({ response }) => {
                    this.errors = response.data.errors
                })
            },
            error(field) {
                if (! this.hasError(field)) return null;

                let error = this.errors[field];

                return Array.isArray(error) ? error[0] : error;
            },
            hasError(field) {
                return this.errors[field] || false;
            },
        }
    }
</script>
