import san from 'san';
import Calendar from './components/Calendar/Calendar.js';
import Weekly from './components/Weekly/Weekly';

import './assets/reset.css';

export default san.defineComponent({
    template: `
        <div>
            <calendar></calendar>
            <calendar></calendar>
            <weekly></weekly>
        </div>
    `,
    components: {
        calendar: Calendar,
        weekly: Weekly
    },
    async created() {
        // 先把基础日历生成了，再去更新有标记的部分即可
        // 应该是整一个函数让组件自己执行，每次换月都要去获取当前月有数据的日期进行标记
        // 我要给组件传一个函数让他执行，要怎么整
        // 直接传一个标记数组就行了，关键在于怎么传
    }
})
