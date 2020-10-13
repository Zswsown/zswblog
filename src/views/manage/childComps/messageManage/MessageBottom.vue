<template>
    <tbody>
        <tr>
            <td>
                <input class="selectAll"
                       type="checkbox"
                       name="messageSelect"
                       :checked="getSelectAllState"
                       @click="selectAll">
            </td>
            <td colspan="5">全选</td>
            <td>
                <input class="delete" type="button" value="删除" @click="deleteSelectMessages">
            </td>
        </tr>
    </tbody>
</template>

<script>
  export default {
    name: "MessageBottom",
    props:{
      selectAllState:{
        type:Number,
        default(){
          return 0
        }
      }
    },
    data(){
      return{
        // 全选按钮的状态
        state:this.selectAllState,
      }
    },
    computed:{
      // 计算属性监听state的状态
      getSelectAllState(){
        return this.state===0?false:true;
      }
    },
    watch:{
      // 监听prop中selectAllState属性的值（主要是单击每一条留言时，动态改变全选按钮的状态）
      selectAllState:function(newValue,oldValue){
        this.state=newValue;
      }
    },
    methods:{
      // 点击全选按钮，发出事件，让外部知道全选按钮被点击了，且传出此时全选按钮的状态值，方便改变外部每条留言的单选框的状态与全选按钮的状态一致
      selectAll(){
        // 取反
        this.state=this.state===0?1:0;
        // 发出事件
        this.$emit('selectAll',this.state);
      },
      deleteSelectMessages(){
        this.$emit('deleteSelectMessages',this.state);
      }
    }
  }
</script>

<style scoped>
    td{
        padding:6px 8px;
        text-align: center;
        border:1px solid transparent;
        background: rgba(125, 57, 144,0.6);
    }

    td:nth-child(2){
        text-align: left;
        color: #fff;
    }

    .delete{
        display:inline-block;
        width:100px;
        height:40px;
        margin:0 8px;

        border-radius: 5px;
        border:1px solid #ccc;
        color: #fff;
        background: #7d3990;
    }

    .delete:focus{
        border:1px solid #d9d9d9;
        outline: none;
    }

    .selectAll{
        border: 1px solid #d9d9d9;
    }
</style>