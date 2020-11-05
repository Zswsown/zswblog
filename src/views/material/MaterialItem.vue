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

    .materialItem a{
        outline: none;
        text-decoration:none;
        color: #333;
    }
.materialItem{
    margin:16PX;
    padding-top: 16PX;
    width: 112PX;
    height:112PX;
    background: #fff;
    border-radius: 6PX;
    box-shadow: 1PX 1PX 1PX 1PX #cccccc;
}
img{
    margin:0 auto 24PX;
    width: 48PX;
    height:48PX;
}
.materialItemImg{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
    .materialItemTitle{
        width:88PX;
        height: 24PX;
        font-size: 0.89em;
        line-height: 0.89em;

        text-align: center;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>