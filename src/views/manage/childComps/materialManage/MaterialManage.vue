<template>
    <div id="materialManage">
        <insert-material></insert-material>
    </div>
</template>

<script>
    import InsertMaterial from "../../../../components/common/material/InsertMaterial";
    // const InsertMaterial=()=>import("../../../../components/common/material/InsertMaterial");
  export default {
    name: "MaterialManage",
    components:{
      InsertMaterial,
    }

  }
</script>

<style scoped>
#materialManage{

    background: #fff;
}
</style>