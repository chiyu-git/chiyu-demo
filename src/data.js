const getCalendar = function (year, month) {
    // 当月的天数，同时也是当月的最后一天
    const dayCount = new Date(year, month, 0).getDate();
    // 当月的最后一天是星期几 （0-6），如果是0，则换成7
    const lastDayWeekDay = new Date(year, month, 0).getDay() || 7;
    // 当月的第一天是周几 （0-6），如果是0，则换成7
    const firstDayWeekDay = new Date(year, month - 1, 1).getDay() || 7;

    // 上一个月的日期的数组，这一个月的第一天是x，上个月就会有 x-1 天显示
    const prevMonthLastDate = new Date(year, month - 1, 0),
        prevMonthLastDay = new Date(year, month - 1, 0).getDate(),
        prevMonthYear = prevMonthLastDate.getFullYear(),
        prevMonth = prevMonthLastDate.getMonth() + 1;

    const prevMonthDates = new Array(firstDayWeekDay - 1).fill(0).map((val, i) => {
        const day = prevMonthLastDay - i;
        return {
            type: 'prev',
            year: prevMonthYear,
            month: prevMonth,
            day
        };
    });
    prevMonthDates.reverse();

    const current = new Array(dayCount).fill(0).map((val, i) => {
        const day = i + 1;
        return {
            type: 'current',
            year,
            month,
            day
        };
    });

    // 下一个月的日期的数组，这一个月的最后一天是x，下个月就会有 7-x 天显示
    const nextMonthFirstDate = new Date(year, month, 1),
        nextMonthYear = nextMonthFirstDate.getFullYear(),
        nextMonth = nextMonthFirstDate.getMonth() + 1;

    // 日历最多可能用到6行，所以多留一行 + 7
    const length = 14 - lastDayWeekDay;
    const nextMonthDates = new Array(length).fill(0).map((val, i) => {
        const day = i + 1;
        return {
            type: 'next',
            year: nextMonthYear,
            month: nextMonth,
            day
        };
    });
    const final = [...prevMonthDates, ...current, ...nextMonthDates];
    // 分组
    const ret = Array.from({
        length: 6
    }, (el, i) => final.slice(i * 7, i * 7 + 7));
    return ret;
};

export default getCalendar
