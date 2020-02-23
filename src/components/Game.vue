<template>
    <div id="game-container">
        <div id="header">
            <div class="score">
                <p>{{username}}</p>
                <p>{{ playerPoints.user }}</p>
            </div>
            <h1>Seesaw</h1>
            <div class="score">
                <p>computer</p>
                <p>{{ playerPoints.computer }}</p>
            </div>
        </div>
        <div id="objects" v-if="!clientLunge && gameLap > 0">
            <div @click="selectObject('circle')" class="object circle" :class="{'select-cricle':object === 'circle'}"></div>
            <div @click="selectObject('triangle')" class="object triangle" :class="{'select-triangle':object === 'triangle'}"></div>
            <div @click="selectObject('square')" class="object square" :class="{'select-square':object === 'square'}"></div>
        </div>
        <div id="play" v-if="!clientLunge && gameLap > 0">
            <p>Ağırlıklardan birini seçerek hamleni yapabilirsin, iyi şanslar.</p>
            <button @click="start">HAMLE YAP</button>
        </div>
        <div id="time" v-if="computerLunge">{{ time }}</div>
        <div id="platform" :style="{ transform:'rotate('+barRotate+')' }">
            <div 
                v-for="clientObject in selectedObjects.clientObjects" 
                class="object" 
                :class="clientObject.type" 
                :style="clientObject.style">
            </div>

            <div 
                v-for="computerObject in selectedObjects.computerObjects" 
                class="object" 
                :class="computerObject.type" 
                :style="computerObject.style">
            </div>
            <div id="bar"></div>
        </div>
        <div id="stand"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            object:null,
            clientLunge:false,
            computerLunge:false,
            time:3,
            bar:0,
            objects:{
                square:10,
                circle:5,
                triangle:3
            }
        }
    },
    computed:{
        username() {
            return this.$store.getters['loginComponentModule/getUsername'];
        },
        gameLap() {
            return this.$store.getters['settingsModule/getGameLap'];
        },
        selectedObjects() {
            return this.$store.getters['gameComponentModule/getSelectedObjects'];
        },
        playerPoints() {
            return this.$store.getters['gameComponentModule/getPoints'];
        },
        barRotate() {
            return this.bar + 'deg';
        }
    },
    methods:{
        selectObject(type) {
            this.object = type;
        },
        start() {
            if(this.object == null) {
                alert("Hamle yapabilmek için önce ağırlık seçmen gerekli!");
            } else {

                this.clientLunge = true;

                let style = ""
                switch(this.selectedObjects.clientObjects.length) {
                    case 0:
                        style = "margin-left:15px";
                        break;
                    case 1:
                        style = "margin-left:65px";
                        break;
                    case 2:
                        style = "margin-left:115px";
                        break;
                }

                this.selectedObjects.clientObjects.push({ type:this.object, style:style });

                this.$store.dispatch('gameComponentModule/updateUserPoint', this.objects[this.object]);

                this.bar += -this.objects[this.object];

                this.computerLunge = true;
                const startComputerLunge = setInterval(() => {
                    this.time -= 1;
                    if(this.time == 0) {

                        const objects = [{ type: "square" }, { type:"circle" }, { type:"triangle" }];
                        const computerSelectedObject = objects[Math.ceil(Math.random() * objects.length) - 1].type;

                        let style = ""
                        switch(this.selectedObjects.computerObjects.length) {
                            case 0:
                                style = "margin-left:374px";
                                break;
                            case 1:
                                style = "margin-left:315px";
                                break;
                            case 2:
                                style = "margin-left:265px";
                                break;
                        }

                        this.selectedObjects.computerObjects.push({ type:computerSelectedObject, style:style });

                        this.bar += this.objects[computerSelectedObject];

                        this.$store.dispatch('gameComponentModule/updateComputerPoint', this.objects[computerSelectedObject]);
                        
                        this.computerLunge = false;
                        this.clientLunge = false;
                        this.object = null;
                        this.time = 3;
                        
                        this.$store.commit('settingsModule/updateGameLap');

                        clearInterval(startComputerLunge);

                        setTimeout(() => {
                            if(this.gameLap == 0) {
                                
                                let message = ''
                                if(this.playerPoints.user === this.playerPoints.computer) {
                                    message = 'BERABERE!';
                                } else if(this.playerPoints.user > this.playerPoints.computer) {
                                    message = 'TEBRİKLER KAZANDIN!';
                                } else {
                                    message = 'KAYBETTİN!';
                                }

                                this.$store.commit('finishComponentModule/setFinishComponentMessage', message);

                                this.$store.commit('settingsModule/updateActiveComponent', 'Finish');
                            }
                        }, 1000)
                        
                       
                    }
                }, 1000);
            } 
        }
    }
}
</script>

<style lang="less" scoped>
    #game-container {
        #header {
            background-color: #000000;
            height: 100px;
            display:flex;
            color:white;
            justify-content: center;
            align-content: center;
            align-items: center;
            font-weight: bold;
            h1 {
                font-size: 50px;
            }
            .score {
                width: 50%;
                text-align: center;

                p:last-child {
                    font-size: 48px;
                }
            }
        }
        #objects {
            padding: 10px 0;
            justify-content: center;
            display: flex;
            .select-cricle, .select-square {
                background-color: green !important;
            }
            .select-triangle {
                border-bottom: 40px solid green !important;
            }
            .circle {
                &:hover {
                    background-color: green;
                }
            }
            .triangle {
                &:hover {
                    border-bottom: 40px solid green;
                }
            }
            .square {
                &:hover {
                    background-color: green;
                }
            }
        }
        .object {
            cursor: pointer;
            outline: none;
            transition: 0.5s all ease-in-out;
        }
        .circle {
            width: 40px;
            height: 40px;
            background-color:#A3A3A3;
            border-radius: 50%;
        }
        .triangle {
            width: 0; 
            height: 0; 
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-bottom: 40px solid #A3A3A3;
            margin: 0 15px 0 10px;
        }
        .square {
            width:40px;
            height: 40px;
            background-color:#A3A3A3;
        }
        #play {
            color:white;
            text-align: center;
            padding-top: 10px;

            p {
                padding: 25px;
            }

            button {
                width:145px;
                height: 45px;
                background-color: #151515;
                border:1px solid #8B8B8B;
                border-radius: 16px;
                color:white;
                font-size:18px;
                font-weight: bold;
                cursor: pointer;
                outline: none;
            }
        }
        #time {
            text-align: center;
            transform: translate(50%, 50%);
            position: absolute;
            left: 44%;
            top: 43%;
            font-size: 70px;
            font-weight: bold;
            color: #a3a3a3;
        }
        #platform {
            width: 425px;
            position: absolute;
            bottom: 100px;
            left: 0;
            right:0;
            margin: 0px auto;
            transform: translate(50%);

            #bar {
                width:425px;
                height: 10px;
                background-color: #A3A3A3;
                transform:rotate(0deg);
            }

            .object {
                position: absolute;
                margin-top:-40px;
                cursor: auto;
            }
        }
        #stand {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid #A3A3A3;
            transform: translate(0%, 0px);
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0px auto;
        }
}
</style>