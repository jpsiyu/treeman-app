<template>
    <div class="record">
        <div class="person" v-if="personInfo">
            <p class="name">{{personInfo.name}}</p>
            <button class="add" @click="pageSwitch(true)">Add</button>
        </div>
        <AddRecord
            @onClose="pageSwitch"
            @onAdd="getRecord"
            :id="id"
            v-if="pageAddRecordState"
        ></AddRecord>
        <div class="recordList">
            <ARecord
                v-for="item in recordList"
                :key="item._id"
                :item="item"
                @onDelete="getRecord"
                @onModify="getRecord"
            ></ARecord>
        </div>
    </div>
</template>

<script>
import AddRecord from "~/components/AddRecord";
import ARecord from "~/components/ARecord";
import request from "~/assets/js/request";
export default {
    data: function() {
        return {
            id: "",
            pageAddRecordState: false,
            personInfo: null,
            recordList: []
        };
    },
    layout: "withBanner",
    components: { AddRecord, ARecord },
    methods: {
        pageSwitch: function(b) {
            this.pageAddRecordState = b;
        },
        getPersonInfo: function() {
            return request.getPersonById(this.id).then(response => {
                const serverData = response.data;
                this.personInfo = serverData.data ? serverData.data[0] : null;
            });
        },
        getRecord: function() {
            return request.getRecord(this.id).then(response => {
                const serverData = response.data;
                const data = serverData.data || [];
                data.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                });
                this.recordList = data;
            });
        }
    },
    mounted: function() {
        this.id = this.$route.query.id;
        this.getPersonInfo()
            .then(_ => {
                return this.getRecord();
            })
            .catch(err => console.log(err));
    }
};
</script>

<style scoped>
.person {
    max-width: 500px;
    font-weight: bold;
    background-color: white;
    padding: 3px 20px;
    box-sizing: border-box;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.add{
  outline: none;
  border: none;
  background-color: seagreen;
  color: white;
  padding: 8px 20px;
  cursor: pointer;
}

.recordList {
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
}
</style>

