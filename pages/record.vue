<template>
    <div class="record">
        <Banner @pageSwitch="pageSwitch"></Banner>
        <AddRecord
            @pageSwitch="pageSwitch"
            @getRecord="getRecord"
            :id="id"
            v-if="pageAddRecordState"
        ></AddRecord>
        <div class="recordList">
            <ARecord v-for="item in recordList" :key="item._id" :item="item" @onDelete="getRecord"></ARecord>
        </div>
    </div>
</template>

<script>
import Banner from "~/components//Banner";
import AddRecord from "~/components/AddRecord";
import ARecord from "~/components/ARecord";
import request from "~/assets/js/request";
export default {
    data: function() {
        return {
            id: "",
            pageAddRecordState: false,
            recordList: []
        };
    },
    components: { Banner, AddRecord, ARecord },
    methods: {
        pageSwitch: function(b) {
            this.pageAddRecordState = b;
        },
        getRecord() {
            request.getRecord(this.id).then(response => {
                const serverData = response.data
                const data = serverData.data || [];
                data.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                });
                this.recordList = data
            });
        }
    },
    mounted: function() {
        this.id = this.$route.query.id;
        this.getRecord();
    }
};
</script>

<style scoped>
.recordList {
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
}
</style>

