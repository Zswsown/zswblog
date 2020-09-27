<template>
    <div class="infoContainer">
        <info-item class="infoItem">
            <div slot="item-title">文章</div>
            <div slot="item-num">0</div>
        </info-item>
        <info-item class="infoItem">
            <div slot="item-title">留言</div>
            <div slot="item-num">0</div>
        </info-item>
        <info-item class="infoItem">
            <div slot="item-title">浏览</div>
            <div slot="item-num">0</div>
        </info-item>
    </div>
</template>

<script>
    import InfoItem from './InfoItem'
  export default {
    name: "InfoContainer",
    components:{
      InfoItem,
    }
  }
</script>

<style scoped>
    .infoContainer{
        display: flex;
        justify-content:space-between;
        height:30%;
        width:100%;
    }
    .infoItem{
        flex: 30%;
    }
</style>