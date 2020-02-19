<template>
  <div>
    <!-- 头部组件 -->
    <Header/>
    <!-- 作用就是router-view，页面的占位符 -->
    <nuxt />
    <!-- 页脚组件 -->
    <Footer/>
  </div>
</template>

<script>
// 导入公共的组件
import Header from "@/components/header"
import Footer from "@/components/footer"

export default {
  // 注册组件 
  components: {
    Header,
    Footer
  }
}
</script>

<style>
 *{
   margin: 0;
   padding: 0;
 }

 ul, li, ol{
   list-style: none;
 }

 a{
   color: inherit;
   text-decoration:none;
 }

 a:hover{
   color: inherit;
 }

 i,em{
   font-style: normal;
 }
 .clearfix:after {
  content: ''; /*设置内容为空*/
  height: 0; /*高度为0*/
  line-height: 0; /*行高为0*/
  display: block; /*将文本转为块级元素*/
  visibility: hidden; /*将元素隐藏*/
  clear: both; /*清除浮动*/
}
.clearfix {
  zoom: 1; /*为了兼容IE*/
}
</style>
