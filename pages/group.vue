<template>
    <div class="group">
        <Container class="tabs">
            <div
                class="tab"
                :class="{'selected': select==item._id}"
                v-for="item in groups"
                :key="item._id"
                @click="clickTab(item._id)"
            >{{item.name}}</div>
        </Container>
        <Container class="groupAdd">
            <p class="labelAdd">Group Name:</p>
            <input class="inputAdd" v-model="inputName" type="text" placeholder="input group name">
            <button class="btnAdd" @click="addGroup">Add</button>
        </Container>
        <Container class="persons">
            <Member v-for="info in members" :key="info.id" :info="info"/>
        </Container>
    </div>
</template>

<script>
import Member from "~/components/Member";
import Container from "~/components/container";
import request from "~/assets/js/request";
export default {
    layout: "withBanner",
    components: { Member, Container },
    data: function() {
        return {
            groups: [],
            select: 0,
            members: [],
            inputName: ""
        };
    },
    methods: {
        clickTab: function(tabName) {
            this.select = tabName;
        },
        setDefault() {
            this.select = this.groups.length > 0 ? this.groups[0]._id : 0;
        },
        getAllGroup: function() {
            return request.getAllGroup().then(res => {
                const serverData = res.data;
                this.groups = serverData.data || [];
            });
        },
        addGroup: function() {
            if (!this.inputName) return;
            request
                .addGroup(this.inputName)
                .then(res => {
                    console.log(res);
                    return this.getAllGroup();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted: function() {
        this.getAllGroup()
            .then(_ => {
                this.setDefault();
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>

<style scoped>
.group {
    padding: 20px 0;
}

.tabs {
    background-color: white;
    display: flex;
}

.tab {
    border: 1px gray solid;
    padding: 3px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;
}

.groupAdd {
    display: flex;
    background-color: white;
    align-items: center;
}

.btnAdd {
    outline: none;
    border: none;
    background-color: seagreen;
    color: white;
    padding: 5px 20px;
    cursor: pointer;
}

.inputAdd {
    outline: none;
    border: none;
    border-bottom: 1px gray solid;
    width: 200px;
    margin: 0 20px;
}

.selected {
    background-color: seagreen;
    color: white;
}
</style>
