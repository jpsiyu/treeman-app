<template>
    <div class="pagePerson">
        <Banner></Banner>
        <div class="pagePerson-search">
            <div>
                <input
                    type="text"
                    placeholder="search name"
                    @keydown.enter="search"
                    v-model="searchName"
                >
                <button class="button pagePerson-search__btnSearch" @click="search">Search</button>
            </div>
            <button class="button pagePerson-search__btnAdd" @click="pageSwitch(true)">+</button>
        </div>
        <div class="pagePerson-list">
            <Member
                v-for="info in members"
                :key="info.id"
                :info="info"
                @getAllPerson="getAllPerson"
                @pageSwitch="pageSwitch"
            />
        </div>
        <AddPerson
            v-if="pageAddState"
            :pageAddData="pageAddData"
            @pageSwitch="pageSwitch"
            @getAllPerson="getAllPerson"
        ></AddPerson>
    </div>
</template>

<script>
import request from "~/assets/js/request";
import shuffle from "~/assets/js/shuffle";
import Member from "~/components/Member.vue";
import Banner from "~/components//Banner";
import AddPerson from "~/components/AddPerson.vue";
export default {
    middleware: "authenticated",
    data: function() {
        return {
            members: [],
            pageAddState: false,
            pageAddData: null,
            searchName: ""
        };
    },
    components: { Member, Banner, AddPerson },
    watch: {
        searchName: function() {
            this.search();
        }
    },
    methods: {
        pageSwitch: function(b, data) {
            this.pageAddState = b;
            if (data) this.pageAddData = data;
            if (!b) this.pageAddData = null;
        },
        getAllPerson: function() {
            request
                .getAllPerson()
                .then(res => {
                    const serverData = res.data;
                    const data = serverData.data || [];
                    shuffle(data);
                    this.members = data;
                })
                .catch(_ => {});
        },
        search: function() {
            if (this.searchName == "") {
                this.getAllPerson();
                return;
            }
            request.getPersonByName(this.searchName).then(res => {
                const serverData = res.data;
                const data = serverData.data || [];
                this.members = data;
            });
        }
    },
    mounted: function() {
        this.getAllPerson();
    }
};
</script>

<style scoped>
.pagePerson {
    position: relative;
}

.pagePerson-search {
    max-width: 450px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pagePerson-search input {
    width: 300px;
    margin: 0;
    outline: none;
    height: 40px;
    border: none;
    font-size: 16px;
    padding: 3px 10px;
    box-sizing: border-box;
}

.pagePerson-search__btnSearch {
    background-color: blue;
    color: white;
    padding: 5px 5px;
    font-size: 18px;
    border-radius: 5px;
}

.pagePerson-search__btnAdd {
    background-color: lightseagreen;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 20px;
}

.pagePerson-list {
    display: flex;
    margin: auto;
    max-width: 500px;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
}

button {
    cursor: pointer;
    line-height: 100%;
    vertical-align: middle;
    border: 0;
    outline: 0;
}
</style>
