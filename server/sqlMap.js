// sql语句
var sqlMap = {
    myDaily: {
        getAllData: `
            select
                timeInterval,
                weeks,
                coding,
                testing,
                documentWriting,
                selfStudying,
                translate,
                useless,
                weekWorkload,
                weekday,
                averageWorkload,
                workSaturation,
                weekData
            from
                originInfo
            where
                1=1
            order by
                weeks asc
        `,
        importOriginData: `
            insert into 
                originInfo(
                    timeInterval,
                    weeks,
                    coding,
                    testing,
                    documentWriting,
                    selfStudying,
                    translate,
                    useless,
                    weekWorkload,
                    weekday,
                    averageWorkload,
                    workSaturation,
                    weekData
                ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        getSelectedWeek: `
            select
                timeInterval,
                weeks,
                coding,
                testing,
                documentWriting,
                selfStudying,
                translate,
                useless,
                weekWorkload,
                weekday,
                averageWorkload,
                workSaturation,
                weekData
            from
                originInfo
            where
                weeks = ?
        `,
        updateWeekData: `
            update
                originInfo
            set timeInterval = ?,
                weeks = ?,
                coding = ?,
                testing = ?,
                documentWriting = ?,
                selfStudying = ?,
                translate = ?,
                useless = ?,
                weekWorkload = ?,
                weekday = ?,
                averageWorkload = ?,
                workSaturation = ?,
                weekData = ?
            where
                weeks = ?
        `,
        deleteTargetInfo: `
            delete from
                originInfo
            where
                weeks = ?
        `,
        getSettings: `
            select
                locations,
                groupNames,
                workCategories
            from
                setting
            where
                userName = ?
            and
                team = ?
        `,
        updateSettings: `
            update
                setting
            set
                locations = ?,
                groupNames = ?,
                workCategories = ?
            where
                userName = ?
            and 
                team = ?
        `,
        addOvertimeRecord: `
            insert into
                overtime(
                    userName,
                    team,
                    overtimeDate,
                    offWorkTime,
                    worktime,
                    overtimeHours,
                    workContent,
                    isVolunteer,
                    location,
                    groupName,
                    note
                ) values ?
        `,
        updateOvertimeRecord:`
            update 
                overtime
            set
                overtimeDate = ?,
                offWorkTime = ?,
                worktime = ?,
                overtimeHours = ?,
                workContent = ?,
                isVolunteer = ?,
                location = ?,
                groupName = ?,
                note = ?
            where
                overtimeDate = ?
        `,
        getAllOvertimeRecord: `
            select
                overtimeDate,
                offWorkTime,
                worktime,
                overtimeHours,
                workContent,
                isVolunteer,
                location,
                groupName,
                note
            from
                overtime
            where
                userName = ?
            and 
                team = ?
            order by
                overtimeDate asc
        `,
        getSelectedOvertimeRecord: `
            select
                overtimeDate,
                offWorkTime,
                worktime,
                overtimeHours,
                workContent,
                isVolunteer,
                location,
                groupName,
                note
            from
                overtime
            where
                overtimeDate = ?
            and 
                userName = ?
            and
                team = ?
        `,
        deleteSelectedOvertimeRecord: `
            delete from
                overtime
            where
                overtimeDate = ?
            and
                userName = ?
            and
                team = ?
        `
    }
}

module.exports = sqlMap;