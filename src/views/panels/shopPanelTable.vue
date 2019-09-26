<template>
  <div>
    <Table :show-header="true" :columns="shopColumns" :data="shopList">
      <template slot-scope="{ row }" slot="name">{{ row.name }}</template>
      <template
        slot-scope="{ row }"
        slot="inventory"
      >{{ row.inventory === -1 ? '/' : row.inventory }}</template>
      <template slot-scope="{ row }" slot="cost">{{ row.cost + ' golds' }}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="buy(index)">购买</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  props: {
    shopList: Array
  },
  methods: {
    buy(index) {
      const good = this.shopList[index];
      if (good.inventory === 1) {
        good.inventory--;
        this.shopList.splice(index, 1);
      } else if (good.inventory !== -1) {
        good.inventory--;
      }
      this.$emit("buyGood", good);
    }
  },
  data() {
    return {
      shopColumns: [
        {
          title: "名称",
          slot: "name"
        },
        {
          title: "库存",
          slot: "inventory"
        },
        {
          title: "价格",
          slot: "cost"
        },
        {
          title: " ",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  }
};
</script>
