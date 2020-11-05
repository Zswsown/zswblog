<template>
    <div id="material">
        <material-list :material-list="getMaterials"></material-list>
    </div>
</template>

<script>
    import MaterialList from "./MaterialList";
    // const MaterialList=()=>import("./MaterialList");
    import {$get} from '../../network/request';
    import {BASE_URL,api} from "../../common/const";

    export default {
    name: "Material",
    components:{
      MaterialList
    },
      data(){
        return{
            materialList:[],
        }
      },
      computed:{
        getMaterials(){
          return this.materialList;
        }
      },
    created() {
        this.getMaterialList();
    },
    methods:{
      getMaterialList(){
        $get(BASE_URL+api.SELECT_MATERIALS).then(res=>{
          this.materialList=res.data.result;
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
#material{
    display: flex;
    justify-content: center;
    align-items: center;
    width:1920px;
    /*height: 1020px;*/
    height: calc(100vh - 60PX);
    margin-top:60PX;
}
</style>