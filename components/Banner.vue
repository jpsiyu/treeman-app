<template>
  <div class="banner-frame">
    <div class="banner">
      <div class="grid">
        <img
          class="logo"
          src="~/assets/images/treeman.png"
          @click="toHome"
        >
        <div
          class="link"
          @click="toHome"
        >Home</div>
        <div
          class="link"
          @click="toPerson"
        >Person</div>
        <div
          class="link"
          @click="toGroup"
        >Group</div>
      </div>
      <div class="grid"></div>
      <div class="grid"></div>
    </div>
  </div>
</template>

<script>
import { MacroGender } from "~/assets/js/macro";
export default {
  name: "Banner",
  methods: {
    toPerson: function () {
      this.$router.push({ path: "/person" });
    },
    toGroup: function () {
      this.$router.push({ path: "/group" });
    },
    toHome: function () {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.banner-frame {
  width: 100%;
  height: 50px;
  position: relative;
}

.banner {
  height: 50px;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
}

.logo {
  width: auto;
  height: 60%;
  cursor: pointer;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 50%;
  box-sizing: border-box;
  margin: 0 20px;
}

.grid {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid:nth-child(3) {
  justify-content: flex-end;
}

.add {
  font-size: 20px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(0, 158, 248);
  color: white;
  margin-right: 20%;
  cursor: pointer;
  outline: none;
  border: none;
  user-select: none;
}

.link {
  font-weight: bold;
  padding: 0 20px;
  cursor: pointer;
}
</style>

