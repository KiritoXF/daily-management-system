<template>
  <Header style="background: white;">
    <Menu mode="horizontal" theme="light" active-name="1">
      <div class="layout-nav">
        <router-link to="/">
          <MenuItem name="home">
            <Icon type="md-home"></Icon>首页
          </MenuItem>
        </router-link>
        <Submenu name="management">
          <template slot="title">
            <Icon type="md-document" />周报管理
          </template>
          <router-link to="/mydaily">
            <MenuItem name="3-1">我的周报</MenuItem>
          </router-link>
          <router-link to="/team/daily">
            <MenuItem name="3-1">团队周报(设计中)</MenuItem>
          </router-link>
        </Submenu>
        <router-link to="/todo">
          <MenuItem name="todo">
            <Icon type="md-alarm"></Icon>Todos(设计中)
          </MenuItem>
        </router-link>
        <router-link to="/adventure">
          <MenuItem name="company">
            <Icon type=""></Icon>Adventure
          </MenuItem>
        </router-link>
        <router-link to="/calendar">
          <MenuItem name="calendar">
            <Icon type=""></Icon>Calendar
          </MenuItem>
        </router-link>
        <router-link to="/setting">
          <MenuItem name="setting">
            <Icon type="md-settings"></Icon>设置
          </MenuItem>
        </router-link>
        <!--
        <MenuItem name="exit">
          <router-link to="/login">
            <Icon type="md-exit"></Icon>退出
          </router-link>
        </MenuItem>
        -->
      </div>
    </Menu>
  </Header>
</template>
