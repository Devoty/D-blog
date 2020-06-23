<template>
    <div id="app" v-cloak>
        <!-- <loading></loading> -->
        <layout-header></layout-header>
        <layout-body></layout-body>
        <layout-footer></layout-footer>
    </div>
</template>
<script>
    import layoutHeader from '@/components/layout/layout-header'
    import layoutBody from '@/components/layout/layout-body'
    import layoutFooter from '@/components/layout/layout-footer'
    import Loading from '@/components/loading'
    export default {
        name: "app",
        components: {
            layoutHeader,
            layoutBody,
            layoutFooter,
            Loading
        }
    }
</script>
<style lang="less">
    #app {
        font-size: 17px;
        color: #6f6f6f;
        
    }
    ::-webkit-scrollbar {
    width: 10px;
    height: 1px;
    overflow: hidden;
    }
    ::-webkit-scrollbar-thumb { //滑块部分
    border-radius: 5px;
    background-color: rgb(175, 74, 240);
    }
    ::-webkit-scrollbar-track { //轨道部分
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #ededed;
    border-radius: 5px;
    }
</style>
