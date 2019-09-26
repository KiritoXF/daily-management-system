<style scoped>
.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
</style>
<template>
  <Drawer
    title="Bag"
    :closable="false"
    placement="left"
    :transfer="false"
    :mask="false"
    :value="drawerShown"
    :on-visible-change="closeDrawer"
  >
    <div
      v-for="(item, index) in bag"
      :index="index"
      :key="index"
      :item="item"
      class="demo-badge"
      style="margin: 6px"
    >
      <Dropdown trigger="click" style="margin-left: 20px">
        {{item.name}}
        <DropdownMenu slot="list">
          <DropdownItem>
            <Button @click="sale(index)">sale</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </Drawer>
</template>
<script>
const BAG_ITEM_MAX = 32;

export default {
  props: {
    bagDrawerShown: Boolean,
    bagItems: Array
  },
  mounted() {
    this.initBag();
  },
  methods: {
    // it doesn't work
    closeDrawer() {
      this.$emit("drawer-closed");
    },
    initBag() {
      this.bag = [...Array(BAG_ITEM_MAX)].map(
        (item, i) => (item = { name: `test${i}` })
      );
    },
    sale(index) {
      this.$emit("sale", this.bag.splice(index, 1));
    }
  },
  computed: {
    drawerShown() {
      return this.bagDrawerShown;
    },
    bag: {
      get() {
        return this.bagItems;
      },
      set() {}
    }
  },
  data() {
    return {
      repos: []
    };
  }
};
</script>
