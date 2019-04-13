<template>
    <div class="miss" @click="toHome">
        <h2>Where, where, where am i?</h2>
        <img src="~/assets/images/man.png">
    </div>
</template>

<script>
import axios from "axios";
export default {
    methods: {
        toHome: function() {
            this.$router.push("/");
        }
    },
};
</script>

<style scoped>
.miss {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    max-width: 400px;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
}

.miss h2 {
    padding: 20px 0;
}

.miss img {
    width: 100%;
    height: auto;
}
</style>
