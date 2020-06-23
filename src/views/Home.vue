 <template>
    <div class="home">
        <banner isHome="true"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                <div class="search-result" v-if="hideSlogan">
                    <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
                    <span v-else-if="category">分类 "{{category}}" 相关文章</span>
                </div>
                <quote v-else>{{notice}}</quote>
            </div>

            <!--焦点图-->
            <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">聚焦<small-ico></small-ico></div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item" v-for="item in features" :key="item.title">
                        <Feature :data="item"></Feature>
                    </div>
                </div>
            </div>
            <!--文章列表-->
            <main class="site-main" :class="{'search':hideSlogan}">
                <section-title v-if="!hideSlogan">推荐</section-title>
                <template v-for="item in postList">
                    <post :post="item" :key="item.id"></post>
                </template>
            </main>

            <!--加载更多-->
            <div class="more" v-show="hasNextPage">
                <div class="more-btn" @click="loadMore">More</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Feature from '@/components/feature'
    import sectionTitle from '@/components/section-title'
    import Post from '@/components/post'
    import SmallIco from '@/components/small-ico'
    import Quote from '@/components/quote'
    import {fetchFocus, fetchList} from '../api'

    export default {
        name: 'Home',
        props: ['cate', 'words'],
        data() {
            return {
                features: [
                    {
                        id: 1,
                        img: "https://s1.ax1x.com/2020/05/14/YDfRnU.jpg",
                        title: "Akina"
                    },
                    {
                        id: 2,
                        img: "https://s1.ax1x.com/2020/05/14/YDf4AJ.jpg",
                        title: "使用说明"
                    },
                    {
                        id: 3,
                        img: "https://s1.ax1x.com/2020/05/14/YDfT91.jpg",
                        title: "文章归档"
                    }
                ],
                postList: [
                    {
                        banner: "https://s1.ax1x.com/2020/05/14/YDhagx.jpg",
                        commentsCount: 99,
                        content: "",
                        id: 0,
                        isHot: true,
                        isTop: true,
                        pubTime: 85409409164,
                        summary: "Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。",
                        title: "看一遍闭着眼都会安装Lua了",
                        viewsCount: 4045
                    },
                    {
                        banner: "https://s1.ax1x.com/2020/05/14/YDhagx.jpg",
                        commentsCount: 99,
                        content: "",
                        id: 1,
                        isHot: true,
                        isTop: true,
                        pubTime: 85409409164,
                        summary: "Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。",
                        title: "看一遍闭着眼都会安装Lua了",
                        viewsCount: 4045
                    },
                    {
                        banner: "https://s1.ax1x.com/2020/05/14/YDhagx.jpg",
                        commentsCount: 99,
                        content: "",
                        id: 2,
                        isHot: true,
                        isTop: true,
                        pubTime: 85409409164,
                        summary: "Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。",
                        title: "看一遍闭着眼都会安装Lua了",
                        viewsCount: 4045
                    },
                    {
                        banner: "https://s1.ax1x.com/2020/05/14/YDhagx.jpg",
                        commentsCount: 99,
                        content: "",
                        id: 3,
                        isHot: true,
                        isTop: true,
                        pubTime: 85409409164,
                        summary: "Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。",
                        title: "看一遍闭着眼都会安装Lua了",
                        viewsCount: 4045
                    },
                    {
                        banner: "https://s1.ax1x.com/2020/05/14/YDhagx.jpg",
                        commentsCount: 99,
                        content: "",
                        id: 4,
                        isHot: true,
                        isTop: true,
                        pubTime: 85409409164,
                        summary: "Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。",
                        title: "看一遍闭着眼都会安装Lua了",
                        viewsCount: 4045
                    },
                    {
                        banner: "https://s1.ax1x.com/2020/05/14/YDhagx.jpg",
                        commentsCount: 99,
                        content: "",
                        id: 5,
                        isHot: true,
                        isTop: true,
                        pubTime: 85409409164,
                        summary: "Lua 是一种轻量小巧的脚本语言，能为应用程序提供灵活的扩展和定制功能。",
                        title: "看一遍闭着眼都会安装Lua了",
                        viewsCount: 4045
                    }
                ],
                currPage: 1,
                hasNextPage: false
            }
        },
        components: {
            Banner,
            Feature,
            sectionTitle,
            Post,
            SmallIco,
            Quote
        },
        computed: {
            searchWords() {
                return this.$route.params.words
            },
            category() {
                return this.$route.params.cate
            },
            hideSlogan() {
                return this.category || this.searchWords
            },
            notice() {
                return this.$store.getters.notice
            }
        },
        methods: {
            fetchFocus() {
                fetchFocus().then(res => {
                    this.features = res.data || []
                    console.log('------------features')
                    console.log(res.data || [])
                }).catch(err => {
                    console.log(err)
                })
            },
            fetchList() {
                fetchList().then(res => {
                    this.postList = res.data.items || []
                    this.currPage = res.data.page
                    this.hasNextPage = res.data.hasNextPage
                    console.log('------------postList')
                    console.log(res.data.items || [])
                    console.log('------------currPage')
                    console.log(res.data.page)
                    console.log('------------hasNextPage')
                    console.log(rres.data.hasNextPage)
                }).catch(err => {
                    console.log(err)
                })
            },
            loadMore() {
                fetchList({page:this.currPage+1}).then(res => {
                    this.postList = this.postList.concat(res.data.items || [])
                    this.currPage = res.data.page
                    this.hasNextPage = res.data.hasNextPage
                })
            }
        },
        mounted() {
            // this.fetchFocus();
            // this.fetchList();
        }
    }
</script>
<style scoped lang="less">

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;
            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>
