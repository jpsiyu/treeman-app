<template>
    <div></div>
</template>


<script>
export default {
    mounted: function() {
      const tokenStr = this.$store.state.tokenStr
      tokenStr ? this.$router.push("/person") : this.$router.push("/login")
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

