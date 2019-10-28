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
                weeks   asc
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
                ) values ?
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
        addWeekdayInfo: `
            insert into
                weekdayInfo(
                    date,
                    weeks,

                
                ) values ?

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
        deleteTargetWeek: `
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
        `
    }
}

module.exports = sqlMap;