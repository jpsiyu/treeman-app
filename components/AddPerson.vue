<template>
  <div
    class="panel"
    @click="close"
  >
    <transition name="fade">
      <div
        class="detail"
        v-if="show"
        @click.stop
      >
        <div class="top">
          <span class="title">添加人物</span>
          <div
            class="close noselect"
            @click="close"
          >X</div>
        </div>
        <form
          class="form"
          @submit.prevent="onSubmit"
        >
          <div class="pair">
            <span class="pair-key">名字:</span>
            <input
              class="pair-value inputname"
              type="text"
              v-model="name"
            >
          </div>
          <div class="pair">
            <span class="pair-key">性别:</span>
            <div class="pair-value radio-wrap">
              <input
                type="radio"
                :value="genderM"
                v-model="gender"
              >
              <label>男</label>
              <input
                type="radio"
                :value="genderF"
                v-model="gender"
              >
              <label>女</label>
            </div>
          </div>
          <div class="pair">
            <span class="pair-key">年龄:</span>
            <div class="pair-value">
              <select
                class="ageselect"
                v-model="age"
              >
                <option
                  disabled
                  :value="age"
                >{{age}}</option>
                <option
                  v-for="n in 100"
                  :key="n"
                >{{n}}</option>
              </select>
            </div>
          </div>
          <div class="pair">
            <div class="pair-key">
              <button
                class="btn"
                type="submit"
              >提交</button>
            </div>
            <p class="pair-value error">{{checkErrors[0]}}</p>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { MacroGender } from "~/assets/js/macro";
import request from "~/assets/js/request";
export default {
  props: ["pageAddData"],
  data: function () {
    return {
      checkErrors: [],
      gender: MacroGender.Male,
      age: 20,
      name: "",
      show: false
    };
  },
  computed: {
    genderM: function () {
      return MacroGender.Male;
    },
    genderF: function () {
      return MacroGender.Female;
    }
  },
  methods: {
    close: function () {
      this.$emit("onClose", false);
    },
    onSubmit: function (event) {
      this.checkErrors = [];
      if (!this.name) this.checkErrors.push("请输入名字!");
      if (!this.gender) this.checkErrors.push("请选择性别!");

      if (this.checkErrors.length == 0) {
        this.pageAddData ? this.modifyPerson() : this.addPerson();
      }
    },
    modifyPerson() {
      request
        .updatePerson(
          this.pageAddData._id,
          this.name,
          this.age,
          this.gender
        )
        .then(res => {
          this.$emit("onModify");
          this.close();
        });
    },
    addPerson() {
      request.genPerson(this.name, this.age, this.gender).then(res => {
        this.$emit("onAdd");
        this.close();
      });
    }
  },
  mounted: function () {
    this.show = true;
    if (this.pageAddData) {
      this.name = this.pageAddData.name;
      this.age = this.pageAddData.age;
      this.gender = this.pageAddData.gender;
    }
  }
};
</script>

<style scoped>
.panel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  margin: auto;
  overflow-y: scroll;
  display: flex;
}

.detail {
  min-height: 250px;
  width: 400px;
  margin: auto;
  background-color: white;
  flex-direction: column;
}

.top {
  background-color: lightseagreen;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 50px;
  position: relative;
}

.close {
  position: absolute;
  right: 0;
  margin: 0 10px;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pair {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: auto;
}

.pair-key {
  flex: 1;
}

.pair-value {
  flex: 3;
}

.inputname {
  box-sizing: border-box;
  padding: 0px 10px;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  height: 30px;
  width: 100%;
}

.ageselect {
  width: 100%;
  font-size: 14px;
  height: 28px;
  outline: none;
  padding: 3px 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.radio-wrap {
  width: 100%;
  font-size: 14px;
}

.btn {
  padding: 5px 20px;
  outline: none;
  border: none;
  background-color: lightseagreen;
  color: white;
  cursor: pointer;
}

.btn:hover {
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);
}

.btn:active {
  box-shadow: none;
}

.error {
  text-align: right;
  padding: 0 10px;
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.form {
  padding-top: 20px;
}

.fade-enter {
  opacity: 0.6;
  transform: translateY(-200px);
}
.fade-enter-active {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}
</style>

