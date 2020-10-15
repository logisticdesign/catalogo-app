<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 text-white flex items-center justify-center z-10">
        <div class="flex items-center">
            <svg class="animate-spin mr-3 h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

            <div class="text-gray-400 text-lg font-light">
                {{ label }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
                default: 'Attendere ...',
            }
        }
    }
</script>
