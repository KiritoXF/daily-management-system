<template>
  <div>
    <Row type="flex" justify="center">
      <PlayerBag
        :bag-drawer-shown="bagDrawerShown"
        :bag-items="bagItems"
        @drawerClosed="drawerClosed"
        @sale="sale"
      ></PlayerBag>
      <Col span="2">
        <Button @click="shiftBagStatus">
          <span v-if="!bagDrawerShown">open the bag</span>
          <span v-else>close the bag</span>
        </Button>
      </Col>
      <Col span="4.5">
        <Card style="width:300px; height: 600px; align: right;">
          <p style="bottom: 10px;">Keeper</p>
        </Card>
      </Col>
      <Col span="4.5">
        <Tabs type="card" style="width:500px;">
          <TabPane label="Weapon">
            <ShopPanelTable :shop-list="weaponList" @buyGood="buy"></ShopPanelTable>
          </TabPane>
          <TabPane label="Armor">
            <ShopPanelTable :shop-list="armorList" @buyGood="buy"></ShopPanelTable>
          </TabPane>
          <TabPane label="Jewelry">
            <ShopPanelTable :shop-list="jewelryList" @buyGood="buy"></ShopPanelTable>
          </TabPane>
          <TabPane label="Repo">
            <ShopPanelTable :shop-list="repoList" @buyGood="buy"></ShopPanelTable>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>
<script>
import ShopPanelTable from "./shopPanelTable";
import PlayerBag from "./playerBag";
import Goods from "../../js/shop/goods";

const weaponList = Goods.getWeaponList();
const armorList = Goods.getArmorList();
const jewelryList = Goods.getJewelryList();

export default {
  props: {},
  methods: {
    attack() {
      // 这个button-click 才是html里要用到的属性
      this.$emit("button-click", this.player, this.monster, this.skill);
    },
    shiftBagStatus() {
      this.bagDrawerShown = !this.bagDrawerShown;
    },
    drawerClosed() {
      this.bagDrawerShown = false;
    },
    buy(good) {
      this.bagItems.push(good);
    },
    sale(bagItem) {
      const item = bagItem[0];
      item.inventory = 1;
      this.repoList.push(item);
    }
  },
  data() {
    return {
      weaponList: weaponList,
      armorList: armorList,
      jewelryList: jewelryList,
      bagItems: [],
      repoList: [],
      bagDrawerShown: true
    };
  },
  components: {
    ShopPanelTable,
    PlayerBag
  }
};
</script>
