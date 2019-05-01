<template>
    <div class="timeline">
        <Banner></Banner>
        <div class="records">
            <ARecord v-for="item in records" :key="item._id" :item="item" @onDelete="getAllRecord"></ARecord>
        </div>
    </div>
</template>

<script>
import Banner from "~/components/Banner";
import request from "~/assets/js/request";
import ARecord from "~/components/ARecord";
export default {
    components: { Banner, ARecord },
    data: function() {
        return {
            records: []
        };
    },
    middleware: "authenticated",
    methods: {
        getAllRecord() {
            return request.getAllRecord().then(res => {
                const serverMsg = res.data;
                this.records = serverMsg.data;
            });
        }
    },
    mounted() {
        this.getAllRecord().catch(err => console.log(err));
    }
};
</script>

<style scoped>
.records {
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
}
</style>

