<template>
    <div class="infoItem">
        <div class="itemNum"><slot name="item-num"></slot></div>
        <div class="itemTitle"><slot name="item-title"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "InfoItem"
  }
</script>

<style scoped>
    .infoItem{
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-items: center;
    }
    .itemTitle{
        font-size:16px;
        font-weight:700;
    }
    .itemNum{
        font-size:18px;
        font-weight:700;
        color: #000;
    }
</style>
