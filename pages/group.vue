<template>
    <div class="group">
        <Container class="top">
            <div class="edit">
                <div class="title">Groups</div>
                <button class="btn btnEdit" @click="clickEdit">E</button>
            </div>
            <div class="tabs">
                <div
                    class="tab"
                    :class="{'selected': select && select==item._id}"
                    v-for="item in groups"
                    :key="item._id"
                    @click="clickTab(item._id)"
                >
                    <span class="tabName">{{item.name}}</span>
                    <button class="tabDel" v-if="showEdit" @click.stop="clickDel(item)">X</button>
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
            <div class="edit">
                <div class="title">Members</div>
                <button class="btn btnEdit" @click="clickEditMember">E</button>
            </div>
            <div class="doubleList" v-if="showEditMember">
                <div class="personList">
                    <div class="personItem" v-for="item in leftList" :key="item._id">
                        <p>{{item.name}}</p>
                        <button class="btn btnRight" @click="toGroup(item)">--></button>
                    </div>
                </div>
                <div class="personList">
                    <div class="personItem" v-for="item in rightList" :key="item._id">
                        <p>{{item.name}}</p>
                        <button class="btn btnX" @click="rmGroup(item)">X</button>
                    </div>
                </div>
            </div>
        </Container>
        <Container>
            <div class="members" v-if="!showEditMember">
                <Member v-for="info in members" :key="info.id" :info="info"/>
            </div>
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
            select: null,
            members: [],
            inputName: "",
            showEdit: false,
            showEditMember: false,
            leftList: [],
            rightList: []
        };
    },
    methods: {
        clickEdit: function() {
            this.showEdit = !this.showEdit;
        },
        clickEditMember: function() {
            this.showEditMember = !this.showEditMember;
            if (this.showEditMember) {
                this.rightList = this.members.map(e => Object.assign({}, e));
            } else {
                this.updateGroup()
                    .then(_ => {
                        return this.getAllGroup();
                    })
                    .then(_ => {
                        this.rightList = [];
                        this.setGroupMembers();
                    });
            }
        },
        clickTab: function(groupId) {
            this.select = groupId;
            this.setGroupMembers();
        },
        clickDel: function(group) {
            request.delGroup(group._id).then(res => {
                const serverData = res.data;
                if (serverData.ok) {
                    return this.getAllGroup();
                }
            });
        },
        setDefault() {
            this.select = this.groups.length > 0 ? this.groups[0]._id : null;
        },
        getAllGroup: function() {
            return request.getAllGroup().then(res => {
                const serverData = res.data;
                this.groups = serverData.data || [];
            });
        },
        setGroupMembers: function() {
            if (!this.select) {
                this.members = [];
                return;
            }
            const selectGroup = this.groups.find(e => e._id == this.select);
            if (!selectGroup || !selectGroup.members) {
                this.members = [];
                return;
            }

            const match = this.leftList.filter(
                e => selectGroup.members.indexOf(e._id) > -1
            );
            this.members = match;
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
        },
        getAllPerson: function() {
            return request
                .getAllPerson()
                .then(res => {
                    const serverData = res.data;
                    const data = serverData.data || [];
                    this.leftList = data;
                })
                .catch(_ => {});
        },
        toGroup: function(person) {
            if (this.rightList.indexOf(person) > -1) return;
            this.rightList.push(person);
        },
        rmGroup: function(person) {
            const index = this.rightList.indexOf(person);
            if (index > -1) {
                this.rightList.splice(index, 1);
            }
        },
        updateGroup: function() {
            if (!this.select) return;
            let str = this.rightList.map(e => e._id).join("-");
            return request.updateGroup(this.select, str);
        }
    },
    mounted: function() {
        this.getAllGroup()
            .then(_ => {
                this.setDefault();
            })
            .then(_ => {
                return this.getAllPerson();
            })
            .then(_ => {
                this.setGroupMembers();
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

.title {
    color: gray;
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
    display: flex;
    align-items: center;
    margin: 5px;
}

.tabName {
    padding: 8px 20px;
}

.tabDel {
    position: absolute;
    right: -10px;
    top: -10px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-color: lightcoral;
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
    background-color: lightcoral;
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

.persons {
    background-color: white;
}

.doubleList {
    display: flex;
}

.personList {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.personItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
}

.btnRight {
    color: seagreen;
    font-weight: bold;
}

.btnX {
    color: lightcoral;
    font-weight: bold;
}
</style>
