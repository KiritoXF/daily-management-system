<!-- 
    vuetify 使用体验较差，不建议继续使用。
-->
<template>
    <v-row style="height: 800px">
        <v-col cols="auto" style="height: 800px;">
            <Button @click="openAddDialog">添加日程</Button><br />
            <Button @click="clearLocalStorage">清除缓存</Button>
        </v-col>
        <v-col style="height: 800px">
            <v-sheet width="90%" class="v-sheet">
                <v-calendar ref="calendar" :now="today" :value="today" :events="events" color="primary" type="week"
                    :weekdays="weekdays" height="1200px">
                    <template slot="event" slot-scope="props">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <span v-on="on"><span>{{ props.event.name }}</span></span>
                            </template>
                            <span>{{ props.event.name }}</span><br />
                            <span>{{ props.event.start.slice(-5) }} ~ {{ props.event.end.slice(-5) }}</span><br />
                            <span>{{ props.event.desc }}</span>
                        </v-tooltip>
                    </template>
                </v-calendar>
            </v-sheet>
        </v-col>
        <Modal title="Title" v-model="dialogShown" :mask-closable="false" @on-ok="addEvent"
            @on-close="dialogShown = false">
            <p slot="header">添加日程</p>
            <div style="padding: 0 0 10px 0">
                <Icon type="md-egg" size="24" />
                <Input v-model="title_input" size="large" placeholder="添加标题" style="width: 40%" />
            </div>
            <div style="padding: 0 0 10px 0">
                <Icon type="md-timer" size="24" />
                <DatePicker v-model="startDefault" type="datetime" :time-picker-options="{steps: [1, 15]}"
                    format="yyyy-MM-dd HH:mm" placeholder="start default" style="width: 200px"></DatePicker>
                <span>-</span>
                <DatePicker v-model="endDefault" type="datetime" :time-picker-options="{steps: [1, 15]}"
                    format="yyyy-MM-dd HH:mm" placeholder="end default" style="width: 200px"></DatePicker>
            </div>
            <div style="padding: 0 0 10px 0">
                <Icon type="md-funnel" size="24" />
                <Input v-model="desc_input" type="textarea" :autosize="{minRows: 1,maxRows: 5}" placeholder="添加说明"
                    style="width: 413px" />
            </div>
        </Modal>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            today: '2020-02-02',
            weekdays: [1, 2, 3, 4, 5, 6, 0],
            events: [{
                    name: 'Weekly Meeting',
                    start: '2020-02-17 09:00',
                    end: '2020-02-17 11:00',
                    desc: 'It \'s a test event'
                },
                {
                    name: 'Thomas\' Birthday',
                    start: '2019-01-10',
                },
                {
                    name: 'Mash Potatoes',
                    start: '2019-01-09 12:30',
                    end: '2019-01-09 15:30',
                },
            ],
            dialogShown: false,
            startDefault: '',
            endDefault: '',
            title_input: '',
            desc_input: ''
        }),
        mounted() {
            if (!localStorage.getItem('events')) {
                this.events = [];
            } else {
                this.events = JSON.parse(localStorage.getItem('events') || []);
            }
            this.today = this.getTime(new Date());
            this.$refs.calendar.scrollToTime('09:00');
        },
        methods: {
            // 转换时间为字符串
            getTime(date) {
                let transformedTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
                if (transformedTime.split(':')[1] === '0') {
                    transformedTime += '0';
                }
                return transformedTime;
            },
            // 打开添加日程对话框
            openAddDialog() {
                const startDefault = new Date();
                startDefault.setMinutes('00');
                this.startDefault = this.getTime(startDefault);
                this.endDefault = new Date(this.startDefault);
                this.endDefault.setHours(this.endDefault.getHours() + 1);
                this.endDefault.setMinutes('00');
                this.endDefault = this.getTime(this.endDefault);
                this.dialogShown = true;
            },
            // 添加日程
            addEvent() {
                this.events.push({
                    name: this.title_input,
                    start: this.getTime(new Date(this.startDefault)),
                    end: this.getTime(new Date(this.endDefault)),
                    desc: this.desc_input
                });
                this.title_input = '';
                this.desc_input = '';
                localStorage.setItem('events', JSON.stringify(this.events));
            },
            // 清除缓存 - 这个作成局部刷新比较好
            clearLocalStorage() {
                localStorage.clear('events');
                location.reload();
            }
        }
    }
</script>

<style scoped>
    .my-event {
        overflow-y: scroll;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 2px;
        background-color: #1867c0;
        color: #ffffff;
        border: 1px solid #1867c0;
        font-size: 12px;
        padding: 3px;
        cursor: pointer;
        margin-bottom: 1px;
        left: 4px;
        margin-right: 8px;
        position: relative;
    }

    .my-event.with-time {
        position: absolute;
        right: 4px;
        margin-right: 0px;
    }

    .v-sheet {
        height: 600px;
        overflow-y: scroll;
    }
</style>