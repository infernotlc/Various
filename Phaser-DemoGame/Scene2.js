class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    create(){
        // Arka plan ekleniyor
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        
        // Karakter animasyonları oluşturuluyor
        this.anims.create({
            key: 'character_idle',
            frames: this.anims.generateFrameNumbers('character_spritesheet', { start: 5, end: 3 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'character_run',
            frames: this.anims.generateFrameNumbers('character_run_spritesheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'character_fly',
            frames: this.anims.generateFrameNumbers('character_fly_spritesheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'character_attack',
            frames: this.anims.generateFrameNumbers('character_attack_spritesheet', { start: 0, end: 9 }),
            frameRate: 6,
            repeat: -1
        });

        // Karakter sprite'ı oluşturuluyor ve başlangıçta idle animasyonu başlatılıyor
        this.character = this.add.sprite(100, 450, 'character_spritesheet');
        this.character.play('character_idle');

        // Klavye olayları dinleniyor
        this.input.keyboard.on('keydown-A', this.startRunningLeft, this);
        this.input.keyboard.on('keyup-A', this.stopRunning, this);

        this.input.keyboard.on('keydown-D', this.startRunningRight, this);
        this.input.keyboard.on('keyup-D', this.stopRunning, this);

        this.input.keyboard.on('keydown-W', this.startFlyingUp, this);
        this.input.keyboard.on('keyup-W',this.stopFlying, this);
        
        this.input.keyboard.on('keydown-S', this.startFlyingDown, this);
        this.input.keyboard.on('keyup-S',this.stopFlying, this);
       
        this.input.keyboard.on('keydown-P', this.startAttack, this);
        this.input.keyboard.on('keyup-P',this.stoptAttack, this);

        // Koşma durumu kontrolü için değişken tanımlanıyor
        this.isRunning = false;
        this.isFlying=false;
        this.isAttack=false;
    }

    startRunningLeft(){
        // Karakterin koşma animasyonu başlatılıyor
        this.character.play('character_run');
        // Koşma durumu değişkeni güncelleniyor
        this.isRunning = true;
        // Karakterin yönü tersine çevriliyor
        this.character.flipX = true;
    }

    startRunningRight(){
        // Karakterin koşma animasyonu başlatılıyor
        this.character.play('character_run');
        // Koşma durumu değişkeni güncelleniyor
        this.isRunning = true;
        // Karakterin yönü normal hale getiriliyor
        this.character.flipX = false;
    }

    stopRunning(){
        // Koşma durumu değişkeni güncelleniyor
        this.isRunning = false;
        // Karakterin koşma animasyonu durduruluyor
        this.character.play('character_idle');
    }

    startFlyingUp(){
        this.character.play ('character_fly');
        this.isFlying= true;
        this.character.flipY=false;
    
      
    }
    startFlyingDown(){
        this.character.play('character_fly');
        this.isFlying=true;
        this.character.flipY=true;
    }

    stopFlying(){
        this.character.play('character_idle');
        this.isFlying=false;
    }
    startAttack(){
    this.character.play('character_attack');
    this.isAttack=true;
    }
    stoptAttack(){
    this.character.play('character_attack');
    this.isAttack=false;
    }

    update(){
        // Koşma durumu aktif olduğunda karakterin konumu değiştiriliyor
        if(this.isRunning){
            // Karakterin hızı istediğiniz değere göre ayarlanabilir
            if(this.character.flipX){
                this.character.x -= 2; // Ters yöne koşma
            } else {
                this.character.x += 2; // Normal yöne koşma
            }
        }
    if(this.isFlying){
        if(this.character.flipY){
            this.character.y += 2;
        } else{
            this.character.y -= 2;
        }
    }
    
    
    }
}
