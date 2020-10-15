<template>
    <section>
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold">
                {{ machines.length }} machines
            </h1>

            <button
                class="bg-blue-500 px-4 py-2 text-xs uppercase text-white rounded hover:bg-blue-600 transition duration-200"
                @click.prevent="download"
            >
                Scarica contenuti
            </button>
        </div>

        <div class="mt-4 bg-white rounded shadow-lg divide-y overflow-y-auto">
            <div v-for="machine in machines" :key="machine.id" class="p-3">
                <div class="flex items-center">
                    <img :src="`local://${machine.image}`" class="w-12 h-12 rounded mr-6">
                    <div class="text-sm font-bold uppercase tracking-wider">{{ machine.name }}</div>
                </div>
            </div>
        </div>

        <loading :show="loading" :label="loadingLabel"></loading>
    </section>
</template>

<script>
    import fs from 'fs-extra'
    import path from 'path'
    import Loading from './Loading'

    const { DownloaderHelper } = require('node-downloader-helper');

    export default {
        components: {
            Loading
        },
        data() {
            return {
                loading: false,
                machines: [],
                loadingLabel: 'Download in corso ...',
            }
        },
        mounted() {
            this.all()
        },
        methods: {
            all() {
                this.$db.find({ type: 'machine' }).sort({ name: 1 }).exec((err, docs) => {
                    this.machines = docs
                })
            },
            async download() {
                this.loading = true

                let machines = await this.$http.get('http://catalogo.test/api/machines')

                await this.$db.remove({ type: 'machine' }, { multi: true });

                machines.data.forEach(machine => {
                    let fileName = `machine-${machine.id}.jpg`
                    let filePath = path.join(this.$electron.remote.app.getPath('downloads'), '/machines')

                    if (fs.ensureDir(filePath)) {
                        fs.emptyDir(filePath)
                    }

                    let download = new DownloaderHelper(machine.image, filePath, {
                        fileName: fileName
                    });

                    download.on('end', file => {
                        console.log(`Download completed`, file)
                    })

                    download.start()

                    this.$db.insert({
                        type: 'machine',
                        name: machine.name,
                        image: path.join(filePath, fileName),
                    })
                })

                this.all()

                this.loading = false
            }
        }
    }
</script>
