<template>
  <div class="timeline">
    <div class="records">
      <ARecord
        v-for="item in records"
        :key="item._id"
        :item="item"
        @onDelete="getAllRecord"
        @onModify="getAllRecord"
      ></ARecord>
    </div>
  </div>
</template>

<script>
import request from "~/assets/js/request";
import ARecord from "~/components/ARecord";
export default {
  components: { ARecord },
  data: function () {
    return {
      records: []
    };
  },
  layout: "withBanner",
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
  padding: 20px 0;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>

