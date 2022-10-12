<template>
  <div class="home">
    <div class="topNav">
      <div class="logoBox">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="userCard">
        <h1>你好！xxx管理员，</h1>
        <div class="logout">
          <a href="/">退出登录</a>
        </div>
      </div>
    </div>
    <div class="leftMenu">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
        unique-opened
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><user /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="userlist">查看用户列表</el-menu-item>
          <el-menu-item index="userinfo">当前用户信息</el-menu-item>
          <el-menu-item index="edituser">修改用户信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Star /></el-icon>
            <span>文物管理</span>
          </template>
          <el-menu-item index="culturalreliclist">查看文物列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Camera /></el-icon>
            <span>实时监控</span>
          </template>
          <el-menu-item index="4-1">展柜监控</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>博物馆文档</span>
          </template>
          <el-menu-item index="5-1">博物馆地址</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </template>
          <el-menu-item index="6-1">主题设置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon><MessageBox /></el-icon>
            <span>联系作者</span>
          </template>
          <el-menu-item index="7-1">作者主页</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="showArea">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isCollapse = ref(false);
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgb(185, 165, 165);
}
.topNav {
  position: relative;
  height: 13vh;
  width: 90%;
  margin: 0 0 0 5vw;
  background-color: #ffffff;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 0 3rem rgb(107, 107, 107);
}
.leftMenu {
  width: 10vw;
  height: 71%;
  margin: 6vh 0 0 5vw;
  padding: 1vw;
  border-radius: 30px;
  box-shadow: 0 0 3rem rgb(107, 107, 107);
  background-color: #ffffff;
}
.logoBox {
  float: left;
  clear: both;
}
.logoBox img {
  margin: 1vh 0 0 3vw;
  width: 100px;
  height: 100px;
}
.userCard {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 60%;
  top: -28%;
  width: 500px;
  height: 100%;
  line-height: 35px;
  box-sizing: border-box;
  /* background-color: red; */
}
.logout {
  width: 100px;
  height: 100px;
  margin: 7% 0 0 0;
  /* background-color: aqua; */
}
.showArea {
  position: absolute;
  padding-left: 3%;
  padding-top: 3%;
  left: 20%;
  top: 19%;
  width: 75%;
  height: 75%;
  border-radius: 30px;
  box-shadow: 0 0 3rem rgb(107, 107, 107);
  background-color: #ffffff;
  box-sizing: border-box;
}
.userCard a {
  display: inline-block;
  position: inherit;
  top: 50%;
  left: 85%;
  font-size: 24px;
  color: black;
  font-weight: bold;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
</style>
