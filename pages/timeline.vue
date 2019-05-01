<template>
    <div class="timeline">
        <Banner></Banner>
    </div>
</template>

<script>
import Banner from "~/components/Banner";
import request from "~/assets/js/request";
export default {
    components: { Banner },
    middleware: 'authenticated',
    mounted() {
      request.getAllRecord()
        .then(res => {
          console.log(res)
        })
    },
};
</script>

<style scoped>
</style>

