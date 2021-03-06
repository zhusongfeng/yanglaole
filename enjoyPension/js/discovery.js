// var set = new Set(JSON.parse(localStorage.getItem('history-discovery')));
var app = new Vue({
    el: '#app',
    data: {
        //选中的选项卡
        activeIndex: 0,
        //选项卡
        tabList: [
            {
                id: 0,
                name: '推荐'
            },
            {
                id: 1,
                name: '资讯'
            },
            {
                id: 2,
                name: '日常'
            },
            {
                id: 3,
                name: '兴趣'
            },
            {
                id: 4,
                name: '科技'
            }
        ],
        //搜索返回的结果
        searchList: [
            {
                "id": 0,
                "img": "img/show.jpg",
                "label": "养生",
                "title": "这是标题",
                "content": "这是内容",
                "date": "2018-02-25",
                "times": 2000,
                "comments": 100
            },
            {
                "id": 1,
                "img": "img/show.jpg",
                "label": "养生",
                "title": "这是标题",
                "content": "这是内容",
                "date": "2018-02-25",
                "times": 2000,
                "comments": 100
            },
            {
                "id": 2,
                "img": "img/show.jpg",
                "label": "养生",
                "title": "这是标题",
                "content": "这是内容",
                "date": "2018-02-25",
                "times": 2000,
                "comments": 100
            }
        ],
        //tab页内容
        tabContent: new Map(),
        //手动改变值变化
        tabContentTracker: 0,
        //历史记录
        historyList: '',
        //搜索的关键字
        searchKeys: '',
        //显示的页面标记
        currentPage: 1,
        //显示历史记录还是搜索内容
        isInput: true
    },
    methods: {
        loadTabContent: function (tabId, index) {
            this.activeIndex = index;
            this.getItemList(tabId);
        },
        getItemList: function (tabId) {
            var vm = this;
            if (vm.tabContent.get(tabId)) {
                return vm.tabContent.get(tabId);
            }
            else {
                //请求获取数据
                var list = [
                    {
                        "id": 0,
                        "type": 0,
                        "img": "img/show.jpg",
                        "label": "养生",
                        "title": "这是标题",
                        "content": "这是内容",
                        "date": "2018-02-25",
                        "times": 2000,
                        "comments": 100
                    },
                    {
                        "id": 1,
                        "type": 1,
                        "img": "img/show.jpg",
                        "label": "养生",
                        "title": "这是标题",
                        "content": "这是内容",
                        "date": "2018-02-25",
                        "times": 2000,
                        "comments": 100
                    },
                    {
                        "id": 2,
                        "type": 2,
                        "img": "img/show.jpg",
                        "label": "养生",
                        "title": "这是标题",
                        "content": "这是内容",
                        "date": "2018-02-25",
                        "times": 2000,
                        "comments": 100
                    }
                ];

                vm.tabContent.set(tabId, list);
                vm.tabContentTracker += 1;
                return vm.tabContent.get(tabId);
                // $.getJSON('data/tabContent.json', {id: tabId}, function (data) {
                //     vm.tabContent.set(tabId, data);
                //     vm.tabContentTracker += 1;
                //     return vm.tabContent.get(tabId);
                // });
            }
        },
        showSearch: function () {
            //显示搜索页面
            this.currentPage = 2;
            setTimeout(function () {
                document.getElementById('search-keys').focus();
            }, 100);
        },
        //返回首页
        goBack: function () {
            this.isInput = false;
            this.currentPage = 1;
            this.searchKeys = '';
        },
        //清除历史记录
        clearHistory: function () {
            // localStorage.removeItem('history-discovery');
            // app.historyList = JSON.parse(localStorage.getItem('history-discovery'));
            set.clear();
        },
        //立即搜索
        searchContent: function (content) {
            if (content) {
                this.searchKeys = content;
            }
            //改变显示状态
            this.isInput = false;
            if (this.searchKeys.trim() != '') {
                set.add(this.searchKeys);
                // localStorage.setItem('history-discovery', JSON.stringify(Array.from(set)));
                // app.historyList = Array.from(set);
            }
        },
        goInner: function (id) {
            mui.openWindow({
                url: 'discovery-detail.html'
            })
        },
        //显示历史记录
        showHistory: function () {
            //改变显示状态
            this.isInput = true;
        }
    },
    created: function () {
        //获取第一个tab页内容
        this.getItemList(this.tabList[0].id);
    }
});
/**
 * 固定tab
 */
    //获取 id="course_container" 元素，offsetTop是当前元素·距离网页窗口顶部的距离
var offset_top = document.getElementById("tab-container").offsetTop;
var isSetHeight = false;
$(window).scroll(function () {
    //获取垂直滚动的距离（scrollTop()是从顶部开始滚动产生的距离）
    var scroll_top = $(document).scrollTop();
    //防止重复设置高度页面抖动
    if (scroll_top > offset_top) {
        // 到达顶部位置，动态的添加元素属性，并给元素添加相应的元素样式
        document.getElementById("tab-container").classList.add("fixed");
    }
    else {
        // 同理，把之前添加的元素移除即可
        document.getElementById("tab-container").classList.remove("fixed");
    }
});
var slider = mui("#slider");
slider.slider({
    interval: 2000
});