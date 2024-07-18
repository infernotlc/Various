class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }
   
    preload(){
        this.load.image("background", "assets/background/backgroundasda.jpg");
        this.load.spritesheet("character_spritesheet", "assets/character/witch_idle.png",{frameWidth: 32, frameHeight: 48}); 
        this.load.spritesheet("character_run_spritesheet","assets/character/witch_run.png",{frameWidth: 32,frameHeight:48});   
        this.load.spritesheet("character_fly_spritesheet","assets/character/witch_charge.png",{frameWidth: 48,frameHeight:48}); 
        this.load.spritesheet("character_attack_spritesheet","assets/character/witch_attack.png",{frameWidth: 40,frameHeight:40}); 
    }
    
    create() { 
        this.scene.start("playGame");
    }
}