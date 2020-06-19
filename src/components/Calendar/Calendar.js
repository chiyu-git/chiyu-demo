import san from 'san';
import getCalendar from './data';
import './Calendar.less';

export default san.defineComponent({
    template: `
        <div class="ui-datepicker-wrapper">
            <!-- 头部区，选择上或者下 -->
            <div class="ui-datepicker-header">
                <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn" on-click="prevMonth">&lt;</a>
                <!-- 当前月份 -->
                <span class="ui-datepicker-curr-month">{{year}}-{{month}}</span>
                <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn" on-click="nextMonth">&gt;</a>
            </div>
            <!-- body区，显示日历 -->
            <div class="ui-datepicker-body">
                <table>
                    <!-- 日历顶端显示星期几 -->
                    <thead>
                        <tr>
                            <th>一</th><th>二</th><th>三</th><th>四</th>
                            <th>五</th><th>六</th><th>日</th>
                        </tr>
                    </thead>
                    <!-- 日历主体部分，每一行显示七天 -->
                    <tbody>
                        <tr s-for='week in calendar'>
                            <td s-for='date in week'
                                class='{{date.type}}'
                                on-click="pickDate(date)">{{date.day}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>选择的日期：{{picked}}</p>
        </div>
    `,
    initData() {
        // 生成今天的日历
        const date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1;
        const initCalendar = getCalendar(year, month);
        return {
            date,
            year,
            month,
            calendar: initCalendar,
            picked: ''
        };
    },
    // 日历的渲染
    updateCalendar(date, year, month) {
        this.data.set('date', date);
        this.data.set('year', year);
        this.data.set('month', month);
        const newCalendar = getCalendar(year, month);
        this.data.set('calendar', newCalendar);
    },
    prevMonth() {
        const {year, month} = this.data.get(),
            // 获取上个月的最后一天
            prevMonthLastDate = new Date(year, month - 1, 0),
            prevMonthYear = prevMonthLastDate.getFullYear(),
            prevMonth = prevMonthLastDate.getMonth() + 1;

        this.updateCalendar(prevMonthLastDate, prevMonthYear, prevMonth);
    },
    nextMonth() {
        const {year, month} = this.data.get(),
            // 获取下个月的第一天
            nextMonthFirstDate = new Date(year, month, 1),
            nextMonthYear = nextMonthFirstDate.getFullYear(),
            nextMonth = nextMonthFirstDate.getMonth() + 1;

        this.updateCalendar(nextMonthFirstDate, nextMonthYear, nextMonth);
    },
    // 日期选择
    pickDate(date) {
        const {
            year,
            month,
            day
        } = date;
        this.data.set('picked', new Date(year, month - 1, day));
    }
})
