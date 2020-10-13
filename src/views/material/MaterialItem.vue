<template>
    <div class="materialItem">
        <a :href="materialItem.material_url">
            <div class="materialItemImg">
<!--                <img :src="materialItem.img" alt="">-->
                <img :src="materialItem.material_icon_url" alt="">
                <div class="materialItemTitle">
                    <span>{{materialItem.material_title}}</span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
  export default {
    name: "MaterialItem",
    props:{
      materialItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
.materialItem{
    margin: 0 16px 16px 0;
    padding-top: 16px;
    width: 112px;
    height:112px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 1px 1px #cccccc;
}
img{
    margin:0 auto 24px;
    width: 48px;
    height:48px;
}
.materialItemImg{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
    .materialItemTitle{
        width:88px;
        height: 24px;

        text-align: center;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>