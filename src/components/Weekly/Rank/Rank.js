import san from 'san';
import './Rank.less';

/**
 * @props 
 * 接受一个title属性，显示标题
 * 接受一个range，显示统计的范围
 * 接受一个rankType,处理不同的rank
 * 接受一个数组rank，处理后append到ul内
 *     item.group
 *     item.member
 *     item.main
 *     item.minor
 */
export default san.defineComponent({
    template: `
        <div class='rank-wrap'>
            <p class='rank-title'>
                <span class='describe'>{{describe}}</span>
                <span class='title'>{{title}}</span>
                <span class='range'>集计范围:{{range}}</span>
            </p>
            <ul class="{{type.item}}-content">
                <li
                    s-for="info,index in rank"
                    class="rank-detail {{info.group}}"
                >
                    <span class='rank'>{{index + 1}}</span>
                    <img src='/src/assets/icon/{{info.group}}/{{info.member}}.png'>
                    <span class='member'>{{info.member}}</span>
                    <span class='main'>{{info.main|thousand}}</span>
                    <span class='minor'>({{ (info.minor|| 0) | thousand}})</span>
                </li>
                <li s-if="summary" class="rank-detail">
                    <span class='member'>&ensp;总计：</span>
                    <span class='main'>{{summary.main|thousand}}</span>
                    <span class='minor'>({{ (summary.minor|| 0) | thousand}})</span>
                </li>
                <textarea s-if="weekNews">{{weekNews}}</textarea>
            </ul>
        </div>
    `,
    async attached() {
        console.log(this);
        console.log(this.data.get('title'));
    },
    filters: {
        thousand(number) {
            const reg = /(?!^)(?=(\d{3})+$)/g;
            return (number + '').replace(reg, ',');
        }
    }

})
