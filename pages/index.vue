<template>
    <div></div>
</template>

<script>
export default {
    middleware: "authenticated",
    mounted: function() {
        this.$router.push("/person");
    }
};
</script>

<style>
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: rgba(229, 236, 240, 1);
}
</style>

