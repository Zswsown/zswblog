<template>
    <div class="insertMaterial">
        <form class="materialForm" action="#" method="post" @submit.prevent="materialCheck">
            <div class="urlAddress">
                <h3>链接地址</h3>
                <p>
                    <input type="url" required v-model="urlAddress">
                </p>
            </div>
            <div class="urlTitle">
                <h3>链接标题</h3>
                <p>
                    <input type="text" required v-model="urlTitle">
                </p>
            </div>
            <div class="urlIcon">
                <h3>链接照片</h3>
                <p>
                    <input id="urlIcon" type="file" accept="image/*" @change="changepic" ref="urlIcon" required>
                    <label for="urlIcon">选择照片</label>
                </p>
                <div class="urlImage" v-show="isShow">
                    <img id="urlImage" :src="getImageSrc" alt="" >
                    <img class="cancleIcon" src="../../../assets/images/cancle.svg" alt="">
                </div>
            </div>
            <div class="materialFormFooter">
                <p>
                    <input type="submit" value="添加" @click="insertMaterial">
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import {$axios,$post} from "../../../network/request";
    const SERVER=require('../../../server/common/const');

    export default {
    name: "InsertMaterial",
    data(){
      return{
        urlAddress:'',
        urlTitle:'',
        imgs:[],
        imgSrc:'',
        fileDom:{},
        material:{},
      }
    },
    computed:{
        getImageSrc(){
          return this.imgSrc;
        },
      isShow(){
          return this.imgSrc.length===0?false:true;
      }
    },
    methods:{
      materialCheck(){

      },

      changepic(){
        this.fileDom=this.$refs.urlIcon;
        console.log(this.fileDom.files[0]);
        // 获取上传文件的url
        let newsrc=this.getObjectURL(this.fileDom.files[0]);
        console.log(newsrc);
        this.imgSrc=newsrc;
      },

      // 建立一个可以存取到该file的url
      getObjectURL(file){
        let url=null;
        if(window.createObjectURL!=undefined){
          url=window.createObjectURL(file);// basic
        }
        else if(window.URL!=undefined){
          url=window.URL.createObjectURL(file);// mozilla(firefox)
        }
        else if (window.webkitURL!=undefined){
          url=window.webkitURL.createObjectURL(file);// webkit or chrome
        }
        return url;
      },

      insertMaterial(){
        let _this=this;
        let formData=new FormData();
        let material_icon_url=this.fileDom.files[0];
        // 2.在form上面添加属于该文件名的key值，便于在后台取到该文件名
        formData.append('material',material_icon_url);

        $axios({
          url: SERVER.BASE_URL+SERVER.api.INSERT_MATERIAL_ICON,
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res=>{
          _this.material={
            material_url:_this.urlAddress,
            material_title:_this.urlTitle,
            material_icon_url:res.data.iconurl,
          }
          console.log(_this.material);
          $post(SERVER.BASE_URL+SERVER.api.INSERT_MATERIAL,{
            material:_this.material
          }).then(res=>{
            console.log(res);
          })
        })
      }
    }
  }
</script>

<style scoped>


    .materialForm{
        width: 100%;
        /*margin: 10px auto;*/
        border-radius: 16px;
        box-shadow: 2px 2px 2px 2px #eee;
    }

    input[type="url"],input[type="text"],input[type="file"]{
        display:inline-block;
        width:400px;
        height:40px;
        padding: 4px;
        font-size: 1em;
        border-radius: 6px;
        border:1px solid #ccc;
        margin:0 10px 6px 10px;
    }

    input[type="submit"]{
        display:inline-block;
        border-radius: 6px;
        border:1px solid #ccc;
        background: #7d3990;
        color: #fff;
    }

    #urlImage{
        width: 360px;
        height: 360px;
        margin: 10px;
        border-radius: 6px;
    }

    #urlIcon{
        position: absolute;
        opacity:0;
    }

    .urlIcon label{
        display:inline-block;
        /*width:100px;*/
        /*height:40px;*/
        padding:6px;

        border-radius: 6px;
        border:1px solid #ccc;
        background: #7d3990;
        color: #fff;
        text-align: center;

        overflow: hidden;
        margin:0 10px 6px 10px;
    }

    .cancleIcon{
        width: 30px;
        height:30px;
        vertical-align: top;
        margin: 10px 10px 0 0;
    }
    p{
        padding: 0;
        margin: 0;
    }

    .materialFormFooter p{
        text-align: center;
        padding: 10px 0;
        margin:0;
    }


    h3{
        margin:0 10px 6px 10px;
    }
</style>