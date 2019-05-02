<template>
  <div></div>
</template>

<script>
export default {
  middleware: "authenticated",
  mounted: function () {
    this.$router.push("/timeline");
  }
};
</script>

<style>
</style>

