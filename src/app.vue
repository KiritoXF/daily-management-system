<template>
  <div>
    <Header></Header>
    <v-app>
      <router-view></router-view>
    </v-app>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from "./views/header";
  import Footer from "./views/footer";

  export default {
    components: {
      Header,
      Footer
    }
  };
</script>