<template>
    <div id="materialList">
        <material-item v-for="(item,index) in materialList"
                       :material-item="item"
                       :key="index"></material-item>
    </div>
</template>

<script>
    import MaterialItem from "./MaterialItem";
  export default {
    name: "MaterialList",
    components:{
      MaterialItem
    },
    props:{
      materialList: {
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
      }
    }
  }
</script>

<style scoped>
#materialList{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    width: 640px;
}
</style>