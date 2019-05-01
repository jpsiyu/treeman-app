<template>
    <div>
        <Banner></Banner>
        <nuxt/>
    </div>
</template>

<script>
import Banner from "~/components/Banner";
export default {
    components: { Banner }
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

