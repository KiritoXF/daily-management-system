<template>
    <v-row>
        <v-col cols="auto">
            <v-btn color="#B3E5FC" @click="openAddDialog">添加日程</v-btn>
        </v-col>
        <v-col>
            <v-sheet width="90%">
                <v-calendar ref="calendar" :now="today" :value="today" :events="events" color="primary" type="week"
                    :weekdays="weekdays">
                    <template slot="event" slot-scope="props">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <span v-on="on"><span>{{ props.event.name }}</span><br />
                                    <span>{{ props.event.start.slice(-5) }} ~
                                        {{ props.event.end.slice(-5) }}</span><br />
                                    <span>{{ props.event.desc }}</span></span>
                            </template>
                            <span>{{ props.event.name }}</span><br />
                            <span>{{ props.event.start.slice(-5) }} ~ {{ props.event.end.slice(-5) }}</span><br />
                            <span>{{ props.event.desc }}</span>
                        </v-tooltip>
                    </template>
                </v-calendar>
            </v-sheet>
        </v-col>
        <v-dialog v-model="dialogShown" persistent max-width="600">
            <v-card min-height="300">
                <v-card-title class="headline">添加日程</v-card-title>
                <v-text-field label="日程名称" v-model="eventName"></v-text-field>
                <span>Start:</span>
                <TimePicker :steps="[1, 15]" format="HH:mm" placeholder="选择开始时间" style="width: 112px"></TimePicker>
                <br />
                <span>End:</span>
                <TimePicker :steps="[1, 15]" format="HH:mm" placeholder="选择结束时间" style="width: 112px"></TimePicker>
                <v-textarea solo name="详细" label="可输入详细信息"></v-textarea>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogShown = false">取消</v-btn>
                    <v-btn color="green darken-1" text @click="addEvent">添加</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            today: '2020-02-02',
            weekdays: [1, 2, 3, 4, 5, 6, 0],
            events: [{
                    name: 'Weekly Meeting',
                    start: '2020-02-13 09:00',
                    end: '2020-02-13 11:00',
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
            dialogShown: false
        }),
        mounted() {
            this.today = this.getToday();
            this.$refs.calendar.scrollToTime('08:00');
        },
        methods: {
            getToday() {
                const today = new Date();
                return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            },
            openAddDialog() {
                this.dialogShown = true;
            }
        }
    }
</script>

<style scoped>
    .my-event {
        overflow: hidden;
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
</style>