<template>
    <div>
        <div class="items">
            <div class="item">
                <div class="name">Path:</div>
                <div class="value">{{ path }}</div>
            </div>
            <div class="item">
                <div class="name">Route Name:</div>
                <div class="value">{{ name }}</div>
            </div>
            <div class="item">
                <div class="name">Vue.js:</div>
                <div class="value">{{ vue }}</div>
            </div>
            <div class="item">
                <div class="name">Electron:</div>
                <div class="value">{{ electron }}</div>
            </div>
            <div class="item">
                <div class="name">Node:</div>
                <div class="value">{{ node }}</div>
            </div>
            <div class="item">
                <div class="name">Platform:</div>
                <div class="value">{{ platform }}</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>

<style scoped>
    .item {
        @apply
            flex
            mb-2;
    }

    .item .name {
        @apply
            mr-2
            text-gray-600;
    }

    .item .value {
        @apply
            font-bold
            text-gray-800;
    }
</style>
