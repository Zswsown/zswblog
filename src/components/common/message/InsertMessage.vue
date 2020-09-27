<template>
    <div class="insertMessage">
        <div class="h"><h2>我要发表看法</h2></div>
        <div class="messageForm">
            <form action="#">
                <div class="messageOpenData">
                    <div class="messageOpenText">
                        <p>
                            <label for="messageText">您的留言</label>
                        </p>
                        <p>
                            <textarea id="messageText" cols="50" rows="10"></textarea>
                        </p>
                    </div>
                    <div class="messageFormName">
                        <p>
                            <label for="messageAuthor">您的大名</label>
                        </p>
                        <p>
                            <input type="text" id="messageAuthor" size="30" placeholder="请输入您的大名">
                        </p>
                    </div>
                    <div class="messageFormEmail">
                        <p>
                            <label for="messageEmail">您的邮箱</label>
                        </p>
                        <p>
                            <input type="email" id="messageEmail" size="30" placeholder="请输入您的邮箱">
                        </p>
                    </div>
                </div>
                <div class="messageOpenDataFooter">
                    <p>
                        <input type="submit" id="post" value="发表">
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: "InsertMessage"
  }
</script>

<style scoped>
.insertMessage{

    height: 544px;
    width:940px;
    background:#fff;
    border-radius: 16px;
    box-shadow: 2px 2px 2px 2px #eee;
}
    .h{
        font-weight: 500;
        height:50px;
        line-height:50px;
        width:920px;
        margin:0 10px;
        background:#fff;
        border-bottom:1px solid #eee;
    }
    label{
        display: block;
        line-height: 30px;
        font-weight:600;
       height:30px;
        padding:1px 0;
    }
    .messageOpenData{
        width:920px;
        margin:0 10px;
    }
    .messageOpenDataFooter{
        width:920px;
        margin:10px 10px;
    }

    input{
        display:inline-block;
        width:300px;
        height:40px;
        padding: 4px;

        border-radius: 6px;
        border:1px solid #ccc;
    }

    input[type="submit"]{
        display:inline-block;
        width:100px;
        height:40px;

        border-radius: 6px;
        border:1px solid #ccc;
        background: #7d3990;
        color: #fff;
    }

    textarea{
        border-radius: 6px;
        width: 920px;
        resize:none;
        padding: 4px;
        border:1px solid #ccc;
    }
</style>