<!-- 
    设定画面 - 每一块的模板
-->
<template>
    <div>
        <Card style="width: 1000px;" :dis-hover="true">
            <p slot="title">{{ title }}</p>
            <Transfer :titles="[$t('setting.unselected'), $t('setting.selected')]" :data="allKeysCom"
                :target-keys="selectedKeys" :list-style="{width: '400px'}"
                :operations="[$t('setting.remove'), $t('setting.add')]" @on-change="handleChange"
                @on-selected-change="handleSelectedChange">
                <div :style="{float: 'right', margin: '5px'}">
                    <Button size="small" @click="deleteCategory">{{ $t("delete") }}</Button>
                </div>
            </Transfer>
            <Input v-model="inputContent" :placeholder="$t('setting.placeholder', [title])" clearable
                style="width: 400px" />
            <Button icon="ios-add" type="dashed" size="small" :disabled="inputContent === ''"
                @click="handleAdd">{{ $t("setting.add") }}</Button>
        </Card>
        <Divider />
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
        props: {
            title: String,
            allKeys: Array,
            targetKeys: Array,
        },
        computed: {
            selKeys: {
                get() {
                    return this.targetKeys;
                },
                set(val) {
                    this.selectedKeys = val;
                }
            },
            allKeysCom: {
                get() {
                    return this.allKeys;
                },
                set(val) {
                    this.allKeysData = val;
                }
            }
        },
        data() {
            return {
                inputContent: "",
                selectedList: [],
                selectedKeys: [] // come from parent page
            };
        },
        mounted() {
            // get settings from db
        },
        methods: {
            // add work category
            handleAdd() {
                const category = {
                    key: this.inputContent,
                    label: this.inputContent
                };
                if (
                    this.allKeysCom.filter(item => item.label === category.label).length !== 0
                ) {
                    this.$Notice.warning({
                        title: this.$i18n.t('duplicate.add')
                    });
                } else {
                    this.allKeysCom.push(category);
                    this.inputContent = "";
                }
            },
            // when changes happen. such as add or remove.
            handleChange(newTargetKeys, direction, moveKeys) {
                this.selectedKeys = newTargetKeys;
            },
            // TODO: sth. wrong here.
            handleSelectedChange(sourceSelectedKeys, targetSelectedKeys) {
                this.selectedList = [...sourceSelectedKeys];
                this.selectedList.push(targetSelectedKeys.flat());
                this.selectedList = this.selectedList.flat();
            },
            // delete selected categories.
            deleteCategory() {
                this.allKeys.forEach((item, i) => {
                    this.selectedList.forEach(sel => {
                        if (item.key === sel) {
                            this.allKeys.splice(i, 1, []);
                        }
                    });
                });
                this.allKeys = this.allKeys.flat();
            },
        }
    };
</script>