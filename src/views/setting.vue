<template>
  <div style="margin: 0 200px;">
    <Card style="width: 1000px;" dis-hover="true">
      <p slot="title">工作种类设置</p>
      <Transfer :titles="['未选择的工作种类', '配置中的工作种类']" :data="allKey" :target-keys="targetKeys"
        :list-style="{width: '400px'}" :operations="['Remove', 'Add']" @on-change="handleChange1"
        @on-selected-change="handleSelectedChange">
        <div :style="{float: 'right', margin: '5px'}">
          <Button size="small" @click="deleteCategory">delete</Button>
        </div>
      </Transfer>
      <Input v-model="addedCategory" placeholder="请输入要添加的工作种类" clearable style="width: 400px" />
      <Button icon="ios-add" type="dashed" size="small" :disabled="addedCategory === ''"
        @click="handleAdd">添加种类</Button>
    </Card>
    <Button @click="save" class="save-button">保存设置</Button>
  </div>
</template>

<style>
  .save-button {
    float: right;
    margin: 20px;
  }
</style>

<script>
  export default {
    data() {
      return {
        addedCategory: "",
        selectedList: [],
        allKey: [],
        targetKeys: []
      };
    },
    mounted() {
      // get settings from db
    },
    methods: {
      // add work category
      handleAdd() {
        const category = {
          key: this.addedCategory,
          label: this.addedCategory
        };
        if (
          this.allKey.filter(item => item.label === category.label).length !== 0
        ) {
          this.$Notice.warning({
            title: "已经添加了同名的内容"
          });
        } else {
          this.allKey.push(category);
          this.addedCategory = "";
        }
      },
      // when changes happen. such as add or remove.
      handleChange1(newTargetKeys, direction, moveKeys) {
        this.targetKeys = newTargetKeys;
      },
      // TODO: sth. wrong here.
      handleSelectedChange(sourceSelectedKeys, targetSelectedKeys) {
        this.selectedList = [...sourceSelectedKeys];
        this.selectedList.push(targetSelectedKeys.flat());
        this.selectedList = this.selectedList.flat();
      },
      // delete selected categories.
      deleteCategory() {
        this.allKey.forEach((item, i) => {
          this.selectedList.forEach(sel => {
            if (item.key === sel) {
              this.allKey.splice(i, 1, []);
            }
          });
        });
        this.allKey = this.allKey.flat();
      },
      // save settings
      save() {

      }
    }
  };
</script>