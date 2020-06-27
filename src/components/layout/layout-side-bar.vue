<template>

<div  class="am-u-lg-4 am-u-sm-12 am-u-lg-offset-0 am-u-sm-offset-0 sidebar-container">
    <section>
        <section>
            <div class="sidebar-header">
                <span class="sidebar-header-title">
                    搜索文章
                </span>
            </div>
            <div class="sidebar-search">
                <form method="get" onsubmit="return false;" accept-charset="utf-8">
                    <div class="search-input">
                        <input type="text" name="keyword" id="searchbox" placeholder="输入关键字搜索">
                        <button type="submit" class="search-submit" onclick="search()"></button>
                        <div>
                </form>
            </div>
        </section>
        <section>
            <div class="sidebar-header">
                <span class="sidebar-header-title">
                    热门标签
                </span>
            </div>
            <div class="tags ">
                <th:block th:if="${null != hotTags}">
                    <th:block th:each="hotTag : ${hotTags}">
                        <a rel="tag" th:href="@{'/tag/' + ${hotTag.tagName}}">
                            <th:block th:text="${hotTag.tagName}+'('+${hotTag.tagCount}+')'"></th:block>
                        </a>
                    </th:block>
                </th:block>
            </div>
        </section>
        <section>
            <div class="sidebar-header">
                <span class="sidebar-header-title">
                    最新发布
                </span>
            </div>
            <div class="sidebar-list">
                <ul class="sidebar-list-body sidebar-list-items">
                    <th:block th:if="${null != newBlogs}">
                        <th:block th:each="newBlog : ${newBlogs}">
                            <li class="sidebar-list-item"><a th:href="@{'/blog/' + ${newBlog.blogId}}"
                                                             class="tag tooltipped tooltipped-n">
                                <th:block th:text="${newBlog.blogTitle}"></th:block>
                            </a></li>
                        </th:block>
                    </th:block>
                </ul>
            </div>
        </section>
        <section>
            <div class="sidebar-header">
                <span class="sidebar-header-title">
                    点击最多
                </span>
            </div>
            <main class="sidebar-lists">
                <ul>
                    <th:block th:if="${null != hotBlogs}">
                        <th:block th:each="hotBlog : ${hotBlogs}">
                            <li class="sidebar-list-item"><a class="tag tooltipped tooltipped-n"
                                                             th:href="@{'/blog/' + ${hotBlog.blogId}}">
                                <th:block th:text="${hotBlog.blogTitle}"></th:block>
                            </a></li>
                        </th:block>
                    </th:block>
                </ul>
            </main>
        </section>
</div>

</template>

<script>

    import MarkdownItVue from 'markdown-it-vue'
    import 'markdown-it-vue/dist/markdown-it-vue.css'
    import Markdown from '@/components/markdown'
    import Banner from '@/components/banner'
    import sectionTitle from '@/components/section-title'
    import comment from '@/components/comment'
    import {fetchComment} from '../api'
    import axios from 'axios'
    export default {
        name: 'articles',
        data(){
          return{
              content: '',
              showDonate: false,
              comments: []
          }
        },
        components: {
            Banner,
            sectionTitle,
            comment,
            Markdown,
            MarkdownItVue
        },
        methods: {
        
          getComment(){
            //   fetchComment().then(res => {
            //       this.content = res.data
            //       console.log(res.data)
            //   }).catch(err => {
            //       console.log(err)
            //       console.log('----------')
            //   })


            axios.get('http://localhost:8081/23.md')
            .then((response) => {
                console.log(response);
                this.content = response.data
            })
            .catch(function (error) {
                console.log(error);
            });

          }
        },
        created() {
            const id = this.$route.params.id
            // console.log(id)
            this.getComment()
        }
        
    }

</script>
<style scoped lang="less">


 .sidebar-container .sidebar-header {
   position: relative;
   padding-bottom: 13px;
   padding-top: 40px;
   margin-left: 0px;
 }
 
 .sidebar-header {
   margin: 0 0 0 20px;
   padding-top: 8px;
   padding-bottom: 8px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.0785);
 }
 
 .sidebar-header .sidebar-header-title {
   font-size: 1.25em;
   font-weight: bold;
   color: rgba(0, 0, 0, 0.8);
   height: 22px;
   vertical-align: top;
 }
 
 .sidebar-container {
   color: #bfbfbf;
   font-size: 14px;
   padding: 0 3%;
 }
 
 .sidebar-container .tags a:hover {
   color: #0085a1 !important;
 }
 
 .sidebar-container .tags a {
   border-color: #f5f5f5;
 }
 
 .sidebar-container .tags a:hover,
 .sidebar-container .tags a:active {
   border-color: #0085a1;
 }
 
 .sidebar-container .list-inline>li {
   padding-left: 0px;
 }
 
 .sidebar-user {
   margin-top: 20px;
 }
 
 .sidebar-user:after {
   clear: both;
   display: table;
   content: '';
 }
 
 .sidebar-user img {
   float: left;
   height: 80px;
   width: 80px;
   border-radius: 5px;
   vertical-align: middle;
   border: 0;
 }
 
 .sidebar-user .fn-right {
   float: right
 }
 
 .sidebar-lists {
   list-style: none;
   line-height: 40px;
 }
 
 .sidebar-lists ul {
   padding: 0;
 }
 
 .sidebar-lists li {
   list-style: none;
   border-bottom: 1px solid #eee;
   line-height: 40px;
 }
 
 .sidebar-lists a {
   text-decoration: none;
   display: block;
 }
 
 .list-inline>li {
   display: inline-block;
   padding-right: 5px;
   padding-left: 5px;
   position: relative;
   cursor: pointer;
 }
 
 .sidebar-list ul {
   list-style: none;
   padding: 0;
 }
 
 .sidebar-list-body li.sidebar-list-item:first-child {
   margin-top: 15px;
 }
 
 .sidebar-list-body li.sidebar-list-item {
   margin-top: 25px;
   margin-bottom: 0px;
   margin-left: 0px;
 }
 
 .sidebar-list .sidebar-list-item {
   margin: 20px 0px 20px 20px;
 }
 
 .sidebar-header .sidebar-header-title:after {
   position: absolute;
   bottom: -1px;
   left: 0;
   right: 0;
   height: 1px;
   width: 70px;
   background: #2f2f2d;
   content: '';
 }
</style>