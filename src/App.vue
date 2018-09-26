<template>
  <el-container>
    <el-aside width="241px">
      <div>
        <!-- <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#f1f2f4"
          text-color="#878c87"
          active-text-color="#5686dc"
        >
          <div id="logo">
            <div id="content">
              <img src="./assets/images/logo.png" class="image">
              <p>信管工作室</p>
            </div>
          </div> -->
          <!-- <el-tabs :tab-position="left" style="height: 200px;"> 
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">
                <router-link to="/ProjectManagement">
                  项目管理
                </router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-tickets"></i>
              <span slot="title">
                <router-link to="/BookManagement">
                  图书管理
                </router-link>
                </span>
            </el-menu-item>
          </el-tabs> -->

            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#f1f2f4"
              text-color="#878c87"
              active-text-color="#5686dc">
              <div id="logo">
                <div id="content">
                  <img src="./assets/images/logo.png" class="image">
                  <p>信管工作室</p>
                </div>
              </div>
              <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">
                    <router-link to="/ProjectManagement">
                      项目管理
                    </router-link>
                  </span>               
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  <span>图书管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                    <template slot="title">
                      <i class="el-icon-goods"></i>
                      <router-link to="/BookManagement">
                      图书馆藏
                    </router-link>
                    </template>
                  </el-menu-item>
                  <el-menu-item index="1-2">
                    <template slot="title">
                      <i class="el-icon-time"></i>
                      <router-link to="/RentManagement">
                      借阅管理
                      </router-link>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>

        <!-- </el-menu> -->
      </div>
    </el-aside>
    <el-container>
      <!-- <el-header>
      </el-header> -->
      <el-main>
        <router-view />
      </el-main>
      <el-footer>© 2018 重庆邮电大学经济管理学院信管工作室</el-footer>
    </el-container>
  </el-container>
</template>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  a{
    color: #878c87;
    text-decoration: none;
  }
  .el-footer {
    background-color: #fafafa;
    color: #878c87;
    padding-top: 20px;
  }
  .el-aside {
    background-color: #f1f2f4;
    color:#878c87;
  }

  .el-main {
    background-color: #ffffff;
    color: #878c87;
    margin: 0;
    padding: 0;
  }

  /* body > .el-container {
    margin-bottom: 40px;
  } */

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 660px;
  }
  #logo{
    width:240px;
    height:240px;
    position: relative;
  }
  #content{
    width: 140px;
    height: 140px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -70px;
    margin-left: -70px;
  }
  #content img{
    border-radius: 5px;
    width: 120px;
    height: 120px;
  }
  #content p{
    padding-left: 20px;
    color: #878c87;
  }
</style>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
