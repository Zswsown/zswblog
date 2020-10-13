<template>
    <div id="materialManage">
        <insert-material></insert-material>
    </div>
</template>

<script>
    import InsertMaterial from "../../../../components/common/material/InsertMaterial";
  export default {
    name: "MaterialManage",
    components:{
      InsertMaterial,
    }

  }
</script>

<style scoped>
#materialManage{
    height:1080px;
    width:1368px;
    background: #fff;
}
</style>