import san from 'san';

import Rank from './Rank/Rank';

function thousand(number) {
    const reg = /(?!^)(?=(\d{3})+$)/g;
    return (number + '').replace(reg, ',');
}
export default san.defineComponent({
    template: `
        <div>
            <rank 
                title="pixiv标签-累计榜"
                describe="说明：排名-成员-累计-周增"
                type="{{ {item: 'tag', sort: 'total'} }}"
                range="{{range}}"
                rank="{{tagRank}}"
                summary="{{tagRankSummary}}"
                >
            </rank>
            <rank 
                title="pixiv标签-增量榜"
                describe="说明：排名-成员-增量-先周比"
                type="{{ {item: 'tag', sort: 'increase'} }}"
                range="{{range}}"
                rank="{{tagIncreaseRank}}"
                weekNews="{{weekNews}}"
                summary="{{tagIncreaseRankSummary}}"
                >
            </rank>
            <rank 
                title="声优fo数-累计榜"
                describe="说明：排名-成员-累计-周增"
                type="{{ {item: 'fo', sort: 'total'} }}"
                range="{{range}}"
                rank="{{foRank}}"
                >
            </rank>
            <rank 
                title="声优fo数-增量榜"
                describe="说明：排名-成员-增量-先周比"
                type="{{ {item: 'fo', sort: 'increase'} }}"
                range="{{range}}"
                rank="{{foIncreaseRank}}"
                weekNews="{{weekNews}}"
                >
            </rank>
        </div>
  `,
    components: {
        rank: Rank
    },
    async created() {
        let res = null;
        try {
            const response = await fetch('http://127.0.0.1:8000/weekly');
            res = await response.json();
        }
        catch (error) {
            console.log('Request Error: ', error);
        }
        const {
            range,
            weekly,
            totalTag,
            weekTagIncrease,
            weekTagIncreaseRate
        } = res;

        console.log(res);
        this.data.set('range', range);

        /* NOTE:处理summary */
        this.data.set('tagRankSummary', {main: totalTag, minor: weekTagIncrease});
        this.data.set('tagIncreaseRankSummary', {main: weekTagIncrease, minor: weekTagIncreaseRate});

        /*NOTE: 制作4个表，一张图 */
        // 不论是哪个表示，显示数据都是 总量（增量），先排序，再输出html
        // icon 通过member 或者 seiyuu 的名字去绑定就好了

        // 累计排行榜 tags
        const tagRank = weekly.slice()
            .sort((a, b) => b.tag - a.tag)
            .map(memberInfo => {
                const {
                    group,
                    member,
                    tag,
                    tagIncrease
                } = memberInfo;
                return {
                    group,
                    member,
                    main: tag,
                    minor: tagIncrease
                };
            });
        this.data.set('tagRank', tagRank);

        // 增量排行榜 tags
        const tagIncreaseRank = weekly.slice()
            .sort((a, b) => b.tagIncrease - a.tagIncrease)
            .map(memberInfo => {
                const {
                    group,
                    member,
                    tagIncrease,
                    tagIncreaseRate
                } = memberInfo;
                return {
                    group,
                    member,
                    main: tagIncrease,
                    minor: tagIncreaseRate
                };
            });
        this.data.set('tagIncreaseRank', tagIncreaseRank);

        // 增量排行榜 seiyuus
        const foRank = weekly.slice()
            .filter((memberInfo) => memberInfo.seiyuu)
            .sort((a, b) => b.fo - a.fo)
            .map(memberInfo => {
                const {
                    group,
                    seiyuu,
                    fo,
                    foIncrease
                } = memberInfo;
                return {
                    group,
                    member: seiyuu,
                    main: fo,
                    minor: foIncrease
                };
            });
        this.data.set('foRank', foRank);

        // 累计排行榜 seiyuus
        const foIncreaseRank = weekly.slice()
            .filter((memberInfo) => memberInfo.seiyuu)
            .sort((a, b) => b.foIncrease - a.foIncrease)
            .map(memberInfo => {
                const {
                    group,
                    seiyuu,
                    foIncrease,
                    foIncreaseRate
                } = memberInfo;
                return {
                    group,
                    member: seiyuu,
                    main: foIncrease,
                    minor: foIncreaseRate
                };
            });
        this.data.set('foIncreaseRank', foIncreaseRank);

        // 一图流，横坐标总量，纵坐标增量

        /*NOTE: 添加一个textarea，用于描述本周事件 */
        const weekNews = `
6/06 水水 4th day1 上映会

6/07 水水 4th day2 上映会 

6/07 水水 蛋巡主题曲试听公布

6/08 三团生放

6/09 东条希生日

6/09 虹虹 生放 無敵級*ビリーバー 主打&CW pv公布

6/10 虹虹 2ndlive 事前通贩开启

6/10 雪雪 生放 一单 Dazzling White Town pv公布

6/11 frrn宣布solo出道

6/11 虹虹 三专试听 樱坂雫

6/13 小原鞠莉 生日

6/13 GK出演万代fes特别生放`;
        this.data.set('weekNews', weekNews);
    }
})
