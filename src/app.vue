<template>
  <div>
    <Header></Header>
    <router-view></router-view>
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
