<template>
    <div id="login">
        <h1 id="title">Seesaw</h1>
        <p id="description">“Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...”</p>
        <p>Oyuna başlamadan önce bir kullanıcı adını girmen gerekli</p>
        <input type="text" placeholder="Kullanıcı Adı" v-model="username">
        <button @click="startGame">OYNA</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:null
        }
    },
    methods:{
        startGame() {
            if(this.username == null || this.username == '') {
                alert("Lütfen bir kullanıcı adı yaz!");
            } else {
                this.$store.commit("loginComponentModule/setUsername", this.username);
                this.$store.commit("settingsModule/updateActiveComponent", "Game")
            }
        }
    }
}
</script>

<style lang="less" scoped>
#login {
        text-align: center;
        color: white;
        justify-content: center;
        display: grid;
        transform: translate(0%, 50%);
    #title {
        font-size:96px;
        margin: 0px;
    }
    #description {
        font-size:18px;
        width: 400px;
        margin-bottom: 50px;
    }
    input[type="text"] {
        background-color:#383838;
        border-radius: 26px;
        height: 39px;
        border: none;
        outline: none;
        text-indent: 20px;
        color:white;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    button {
        background-color: #151515;
        border:none;
        color:white;
        width: 150px;
        height: 50px;
        margin:0px auto;
        outline:none;
        cursor: pointer;
        font-size: 18px;
    }
}
</style>