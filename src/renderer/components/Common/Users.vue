<template>
    <section>
        <h1 class="text-xl font-semibold">
            {{ users.length }} utenti
        </h1>

        <div class="mt-4 bg-white rounded shadow-lg h-64 divide-y overflow-y-auto">
            <div v-for="user in users" :key="user.id" class="p-3">
                <div class="flex items-center">
                    <img :src="user.gravatar" class="w-6 h-6 rounded-full mr-2">
                    <div class="text-sm">{{ user.name }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                users: []
            }
        },
        mounted() {
            this.$http.get('http://catalogo.test/api/users').then(({ data }) => {
                this.users = data
            })

            // this.$db.find({}).sort({ name: 1 }).exec((err, docs) => {
            //     console.log(docs);
            //     this.users = docs
            // });

            // this.$http.get('http://catalogo.test/api/machines').then(({ data }) => {
            //     this.users = data

            //     this.$db.insert(this.users, (err, newDocs) => {
            //         console.log(newDocs);
            //     });
            // })

            // db.find({}, function (err, docs) {
            //     console.log(docs);
            // });
        }
    }
</script>
