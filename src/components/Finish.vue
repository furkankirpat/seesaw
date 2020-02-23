<template>
    <div id="login">
        <h1 id="title">Seesaw</h1>
        <p id="description">“Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...”</p>
        <h1>{{ finishMessage }}</h1>
        
        <div id="controllers">
            <button @click="tryAgain">TEKRAR</button>
            <button @click="newGame">YENİ OYUN</button>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        finishMessage() {
            return this.$store.getters['finishComponentModule/getFinishComponentMessage'];
        }
    },
    methods: {
        tryAgain() {
            this.$store.commit('gameComponentModule/resetSelectedObjects');
            this.$store.commit('settingsModule/resetGameLap');
            this.$store.commit('settingsModule/updateActiveComponent', 'Game');
        },
        newGame() {
            this.$store.commit('gameComponentModule/resetSelectedObjects');
            this.$store.commit('settingsModule/resetGameLap');
            this.$store.commit('loginComponentModule/setUsername', null);
            this.$store.commit('settingsModule/updateActiveComponent', 'Login');
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
    #controllers {
        padding-top: 20px;
        button {
            background-color: #151515;
            border:none;
            color:white;
            width: 150px;
            height: 50px;
            outline:none;
            cursor: pointer;
            font-size: 18px;
            margin: 0 5px;
        }
    }
}
</style>