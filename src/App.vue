<template>
    <div id="app">
        <router-view />
        <notifications group="foo" />
    </div>
</template>

<script>

export default {
    name: 'App',
}
</script>

<style lang="scss">
    @import "assets/scss/app.scss";
</style>
