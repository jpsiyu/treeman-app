<template>
  <div class="group">
    <Container class="group-top">
      <div class="group-edit">
        <div class="group-title">Groups</div>
        <button
          class="btn group-edit__btn"
          @click="clickEdit"
        >E</button>
      </div>
      <div class="group-tabs">
        <div
          class="group-tab"
          :class="{ selected: select && select == item._id }"
          v-for="item in groups"
          :key="item._id"
          @click="clickTab(item._id)"
        >
          <span class="group-tab__name">{{ item.name }}</span>
          <button
            class="group-tab__del"
            v-if="showEdit"
            @click.stop="clickDel(item)"
          >
            X
          </button>
        </div>
      </div>
      <div
        class="group-add"
        v-if="showEdit"
      >
        <p class="group-title">Group Name:</p>
        <input
          class="group-add__input"
          v-model="inputName"
          type="text"
          placeholder="input group name"
        />
        <button
          class="btn group-add__btn"
          @click="addGroup"
        >Add</button>
      </div>
    </Container>
    <Container class="group-persons">
      <div class="group-edit">
        <div class="group-title">Members</div>
        <div>
          <button
            class="btn group-edit__sure"
            @click="clickSure"
            v-if="showEditMember"
          >Sure</button>
          <button
            class="btn group-edit__btn"
            @click="clickEditMember"
          >E</button>
        </div>
      </div>
      <div
        class="group-double"
        v-if="showEditMember"
      >
        <div class="group-personList">
          <div
            class="group-personItem"
            v-for="item in leftList"
            :key="item._id"
          >
            <p>{{ item.name }}</p>
            <button
              class="btn group-personItem__right"
              @click="toGroup(item)"
            >
              -->
            </button>
          </div>
        </div>
        <div class="group-personList">
          <div
            class="group-personItem"
            v-for="item in rightList"
            :key="item._id"
          >
            <p>{{ item.name }}</p>
            <button
              class="btn group-personItem__btnX"
              @click="rmGroup(item)"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </Container>
    <Container
      class="group-members"
      v-if="!showEditMember"
    >
      <Member
        v-for="info in members"
        :key="info.id"
        :info="info"
      />
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
  data: function () {
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
    clickEdit: function () {
      this.showEdit = !this.showEdit;
    },
    clickEditMember: function () {
      this.showEditMember = !this.showEditMember;
      if (this.showEditMember) {
        this.rightList = this.members.map(e => Object.assign({}, e));
      }
    },
    clickSure: function () {
      this.updateGroup()
        .then(_ => {
          return this.getAllGroup();
        })
        .then(_ => {
          this.clickEditMember()
          this.rightList = [];
          this.setGroupMembers();
        });
    },
    clickTab: function (groupId) {
      this.select = groupId;
      this.setGroupMembers();
    },
    clickDel: function (group) {
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
    getAllGroup: function () {
      return request.getAllGroup().then(res => {
        const serverData = res.data;
        this.groups = serverData.data || [];
      });
    },
    setGroupMembers: function () {
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
    addGroup: function () {
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
    getAllPerson: function () {
      return request
        .getAllPerson()
        .then(res => {
          const serverData = res.data;
          const data = serverData.data || [];
          this.leftList = data;
        })
        .catch(_ => { });
    },
    toGroup: function (person) {
      if (this.rightList.indexOf(person) > -1) return;
      this.rightList.push(person);
    },
    rmGroup: function (person) {
      const index = this.rightList.indexOf(person);
      if (index > -1) {
        this.rightList.splice(index, 1);
      }
    },
    updateGroup: function () {
      if (!this.select) return;
      let str = this.rightList.map(e => e._id).join("-");
      return request.updateGroup(this.select, str);
    }
  },
  mounted: function () {
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

.group-top {
  background-color: white;
}

.group-title {
  color: gray;
  margin-bottom: 20px;
}

.group-edit {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.group-edit__btn {
  background-color: lightblue;
  color: white;
  padding: 5px 8px;
  border-radius: 50%;
}

.group-edit__sure {
  background-color: seagreen;
  color: white;
  padding: 5px 15px;
  margin: 0 10px;
}

.group-tabs {
  display: flex;
  flex-wrap: wrap;
}

.group-tab {
  position: relative;
  border: 1px lightgray solid;
  cursor: pointer;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin: 5px;
}

.group-tab__name {
  padding: 5px 20px;
  font-size: 14px;
}

.group-tab__del {
  position: absolute;
  right: -10px;
  top: -10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-color: lightblue;
  color: white;
  border: none;
  outline: none;
}

.group-add {
  display: flex;
  background-color: white;
  align-items: center;
  padding: 20px 0;
}

.btn {
  outline: none;
  border: none;
  cursor: pointer;
}

.group-add__btn {
  background-color: lightblue;
  color: white;
  padding: 5px 20px;
}

.group-add__input {
  outline: none;
  border: none;
  border-bottom: 1px lightgray solid;
  width: 200px;
  padding: 5px;
  margin: 0 20px;
}

.selected {
  background-color: blueviolet;
  color: white;
}

.group-persons {
  background-color: white;
}

.group-double {
  display: flex;
}

.group-personList {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.group-personItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
}

.group-personItem__right {
  color: seagreen;
  font-weight: bold;
}

.group-personItem__btnX {
  color: lightcoral;
  font-weight: bold;
}

.group-members {
  padding: 0;
}
</style>
