<template>
    <div class="group">
        <Container class="top">
            <div class="edit">
                <p>Groups</p>
                <button class="btn btnEdit" @click="clickEdit">E</button>
            </div>
            <div class="tabs">
                <div
                    class="tab"
                    :class="{'selected': select==item._id}"
                    v-for="item in groups"
                    :key="item._id"
                    @click="clickTab(item._id)"
                >
                    <p class="tabName">{{item.name}}</p>
                    <button class="tabDel" v-if="showEdit" @click.stop="clickDel(item._id)">X</button>
                </div>
            </div>
            <div class="groupAdd" v-if="showEdit">
                <p class="labelAdd">Group Name:</p>
                <input
                    class="inputAdd"
                    v-model="inputName"
                    type="text"
                    placeholder="input group name"
                >
                <button class="btn btnAdd" @click="addGroup">Add</button>
            </div>
        </Container>
        <Container class="persons">
            <div class="title">Members</div>
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
            inputName: "",
            showEdit: false
        };
    },
    methods: {
        clickEdit: function() {
            this.showEdit = !this.showEdit;
        },
        clickTab: function(tabId) {
            this.select = tabId;
        },
        clickDel: function(tabId) {
            request.delGroup(tabId).then(res => {
                const serverData = res.data;
                if (serverData.ok) {
                    return this.getAllGroup();
                }
            });
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
                    const serverData = res.data;
                    if (serverData.ok) {
                        return this.getAllGroup();
                    }
                })
                .then(_ => {
                    this.inputName = "";
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

.top {
    background-color: white;
}

.edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btnEdit {
    background-color: lightcoral;
    color: white;
}

.tabs {
    display: flex;
    flex-wrap: wrap;
}

.tab {
    position: relative;
    border: 1px gray solid;
    cursor: pointer;
    border-radius: 4px;
    margin: 5px;
    padding: 0px 20px;
}

.tabName {
}

.tabDel {
    position: absolute;
    right: -10px;
    top: -10px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-color: lightgray;
    color: white;
    border: none;
    outline: none;
}

.groupAdd {
    display: flex;
    background-color: white;
    align-items: center;
    padding: 20px 0;
}

.btn {
    outline: none;
    border: none;
    padding: 5px 20px;
    cursor: pointer;
}

.btnAdd {
    background-color: seagreen;
    color: white;
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
