<template>
    <div
        class="px-3 py-2 bg-gray-100 rounded text-sm"
        :class="[ isOnline ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600' ]"
    >
        {{ isOnline ? 'ONLINE' : 'OFFLINE' }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOnline: false,
            }
        },
        mounted() {
            this.detectStatus()

            window.addEventListener('online', this.detectStatus)
            window.addEventListener('offline', this.detectStatus)
        },
        methods: {
            detectStatus() {
                this.isOnline = navigator.onLine
            },
        }
    }
</script>
