<template>
    <div class="w-full h-screen p-8">
        <div class="flex flex-wrap">
            <div class="w-1/5">
                <img id="logo" src="~@/assets/logo.png" alt="electron-vue">

                <online class="mt-6"></online>

                <user class="mt-6"></user>

                <div class="max-w-sm mt-6 bg-white rounded shadow-lg p-4 text-xs">
                    <system></system>
                </div>
            </div>

            <div class="w-4/5 px-12">
                <machines></machines>

                <!-- <div class="h-64 mt-12 rounded shadow-lg">
                    <model-obj
                        src="src/renderer/assets/obj/male02/male02.obj"
                        mtl="src/renderer/assets/obj/male02/male02.mtl"
                    ></model-obj>
                </div> -->
            </div>
        </div>
  </div>
</template>

<script>
    import { ModelObj } from 'vue-3d-model'

    import User from './Common/User'
    import Users from './Common/Users'
    import Online from './Common/Online'
    import System from './Common/System'
    import Machines from './Common/Machines'

    export default {
        name: 'landing-page',
        components: {
            User,
            Users,
            Online,
            System,
            Machines,
            ModelObj,
        },
        methods: {
            open (link) {
                this.$electron.shell.openExternal(link)
            },
        }
    }
</script>
