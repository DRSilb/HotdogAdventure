class Level5Scene extends Phaser.Scene {
    constructor() {
      super({ key: 'Level5Scene' });
    }
  
    create() {
      // Set world bounds and camera settings
      this.physics.world.setBounds(0, 0, 1600, 1200);
      this.cameras.main.setBounds(0, 0, 1600, 1200);
  
      // Background
      //this.add.image(800, 600, 'background').setScrollFactor(0);
  
      // Platforms
      this.platforms = this.physics.add.staticGroup();
  
      // Add platforms along the floor
      for (let x = 0; x <= 1600; x += 200) {
        this.platforms.create(x, 1184, 'platform').setOrigin(0.5, 0.5);
      }
  
      
      // Existing platforms
      
      this.platforms.create(800, 750, 'platform');
      //this.platforms.create(600, 900, 'platform');
      //this.platforms.create(1000, 700, 'platform');
      //this.platforms.create(1400, 500, 'platform');
      //this.platforms.create(800, 300, 'platform');
  
      // Player
      this.player = this.physics.add.sprite(75, 1100, 'hotdog');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
  
      // Camera follows player
      this.cameras.main.startFollow(this.player);
  
      // Input
      this.cursors = this.input.keyboard.createCursorKeys();
      this.nextLevelKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  
      // Condiments
      this.condiments = this.physics.add.group({
        allowGravity: true,
        bounceY: 0.5
      });
      this.condiments.create(200, 1000, 'condiment');
      this.condiments.create(600, 850, 'condiment');
      this.condiments.create(1000, 650, 'condiment');
  
      // Obstacles
      this.obstacles = this.physics.add.staticGroup();
      this.obstacles.create(150, 1125, 'knife');
      this.obstacles.create(250, 1125, 'knife');
      this.obstacles.create(350, 1125, 'knife');
      this.obstacles.create(450, 1125, 'knife');
      this.obstacles.create(550, 1125, 'knife');
      this.obstacles.create(650, 1125, 'knife');
  
      // Collisions
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.condiments, this.platforms); // Add this line
      this.physics.add.collider(this.obstacles, this.platforms);
      this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
  
      // Remove collider between player and condiments
      // this.physics.add.collider(this.player, this.condiments);
  
      // Overlaps
      this.physics.add.overlap(this.player, this.condiments, this.collectCondiment, null, this);
  
      // Score
      this.score = 0;
      this.scoreText = this.add
        .text(16, 16, 'Condiments: 0 / 3', { fontSize: '32px', fill: '#000' })
        .setScrollFactor(0);
  
      // Door (initialize as null)
      this.door = null; 
      this.cursors = this.input.keyboard.createCursorKeys();
      this.nextLevelKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  
      // Add WASD keys
      this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      this.leftInput = false;
      this.rightInput = false;
      this.jumpInput = false;

      if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.createTouchControls();
      }
    }

    createTouchControls() {
      // Left button
      this.leftButton = this.add.image(80, this.sys.game.config.height - 80, 'leftButton').setInteractive().setAlpha(0.5);
      this.leftButton.setScrollFactor(0);
      this.leftButton.on('pointerdown', () => { this.leftInput = true; });
      this.leftButton.on('pointerup', () => { this.leftInput = false; });
  
      // Right button
      this.rightButton = this.add.image(160, this.sys.game.config.height - 80, 'rightButton').setInteractive().setAlpha(0.5);
      this.rightButton.setScrollFactor(0);
      this.rightButton.on('pointerdown', () => { this.rightInput = true; });
      this.rightButton.on('pointerup', () => { this.rightInput = false; });
  
      // Jump button
      this.jumpButton = this.add.image(this.sys.game.config.width - 80, this.sys.game.config.height - 80, 'jumpButton').setInteractive().setAlpha(0.5);
      this.jumpButton.setScrollFactor(0);
      this.jumpButton.on('pointerdown', () => { this.jumpInput = true; });
      this.jumpButton.on('pointerup', () => { this.jumpInput = false; });
    }
    
  
    update() {
      // Reset player velocity
      this.player.setVelocityX(0);
  
      // Horizontal movement
      if (this.cursors.left.isDown || this.aKey.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown || this.dKey.isDown) {
        this.player.setVelocityX(160);
      }
  
      // Jumping
      if ((this.cursors.up.isDown || this.wKey.isDown) && this.player.body.touching.down) {
        this.player.setVelocityY(-400);
      }
  
      // Check for 'N' key press to skip level
      if (Phaser.Input.Keyboard.JustDown(this.nextLevelKey)) {
        this.skipToNextLevel();
      }
    }
  
    collectCondiment(player, condiment) {
      condiment.disableBody(true, true);
  
      // Update score
      this.score += 1;
      this.scoreText.setText('Condiments: ' + this.score + ' / 5');
  
      if (this.condiments.countActive(true) === 0) {
        this.createDoor();
      }
    }
  
    createDoor() {
      this.door = this.physics.add.sprite(1500, 900, 'door');
      this.door.setImmovable(true);
      this.door.body.allowGravity = false;
  
      this.physics.add.collider(this.player, this.door, this.enterDoor, null, this);
    }
  
    enterDoor(player, door) {
      this.skipToNextLevel();
    }
  
    skipToNextLevel() {
      this.scene.start('VictoryScene'); // Or 'GameScene' to restart
    }
  
    hitObstacle(player, obstacle) {
      this.physics.pause();
      player.setTint(0xff0000);
  
      this.time.delayedCall(1000, () => {
        this.scene.restart();
      }, [], this);
    }
  }
  