class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }
  init(data) {
    // Store the selected hotdog from the TitleScene
    this.selectedHotdog = data.selectedHotdog || 'hotdog1'; // Default to 'hotdog1' if no data is provided
  }

  create() {
    // Set world bounds and camera settings
    this.physics.world.setBounds(0, 0, 1600, 1200);
    // Adjust camera to show entire map
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    //this.cameras.main.setZoom(1); // default is one
    this.cameras.main.centerOn(1600, 1200);

    // Platforms
    this.platforms = this.physics.add.staticGroup();

    // Add platforms along the floor
    for (let x = 0; x <= 1600; x += 200) {
      this.platforms.create(x, 1184, 'platform').setOrigin(0.5, 0.5);
    }

    // Existing platforms
    this.platforms.create(400, 1100, 'platform');
    this.platforms.create(800, 900, 'platform');
    this.platforms.create(1200, 700, 'platform');

    // Player
    this.player = this.physics.add.sprite(100, 1100, this.selectedHotdog);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.player);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.nextLevelKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    // Condiments
    this.condiments = this.physics.add.group({
      allowGravity: true,
      bounceY: 0.5,
    });
    this.condiments.create(400, 750, 'condiment');
    this.condiments.create(800, 1000, 'condiment');
    this.condiments.create(1200, 650, 'condiment');

    // Obstacles
    this.obstacles = this.physics.add.staticGroup();
    this.obstacles.create(600, 1070, 'fork');
    this.obstacles.create(1000, 870, 'knife');

    // Collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.condiments, this.platforms);
    this.physics.add.collider(this.obstacles, this.platforms);
    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

    // Overlaps
    this.physics.add.overlap(this.player, this.condiments, this.collectCondiment, null, this);

    // Score
    this.score = 0;
    this.scoreText = this.add
      .text(16, 16, 'Condiments: 0 / 3', { fontSize: '32px', fill: '#000' })
      .setScrollFactor(0);

    // Door (initialize as null)
    this.door = null;

    // Add WASD keys
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.leftInput = false;
    this.rightInput = false;
    this.jumpInput = false;

    this.buttonY = this.sys.game.config.height / 6;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
      this.createTouchControls();
    }

    // Resize event
    window.addEventListener('resize', this.resizeGame.bind(this));
    this.resizeGame();
  }

  createTouchControls() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Left button
    this.leftButton = this.add
      .image(80, screenHeight - this.buttonY, 'leftButton')
      .setInteractive()
      .setAlpha(0.5);
    this.leftButton.setScrollFactor(0);
    this.leftButton.on('pointerdown', () => {
      this.leftInput = true;
    });
    this.leftButton.on('pointerup', () => {
      this.leftInput = false;
    });
    this.leftButton.on('pointerout', () => {
      this.leftInput = false;
    });

    // Right button
    this.rightButton = this.add
      .image(200, screenHeight - this.buttonY, 'rightButton')
      .setInteractive()
      .setAlpha(0.5);
    this.rightButton.setScrollFactor(0);
    this.rightButton.on('pointerdown', () => {
      this.rightInput = true;
    });
    this.rightButton.on('pointerup', () => {
      this.rightInput = false;
    });
    this.rightButton.on('pointerout', () => {
      this.rightInput = false;
    });

    // Jump button
    this.jumpButton = this.add
      .image(screenWidth - 80, screenHeight - this.buttonY, 'jumpButton')
      .setInteractive()
      .setAlpha(0.5);
    this.jumpButton.setScrollFactor(0);
    this.jumpButton.on('pointerdown', () => {
      this.jumpInput = true;
    });
    this.jumpButton.on('pointerup', () => {
      this.jumpInput = false;
    });
    this.jumpButton.on('pointerout', () => {
      this.jumpInput = false;
    });

    // Enable multitouch
    this.input.addPointer(3);
  }

  update() {
    // Reset player velocity
    this.player.setVelocityX(0);

    // Horizontal movement
    if (this.cursors.left.isDown || this.aKey.isDown || this.leftInput) {
      this.player.setVelocityX(-200);
      this.player.anims.play('run', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown || this.dKey.isDown || this.rightInput) {
      this.player.setVelocityX(200);
      this.player.anims.play('run', true);
      this.player.flipX = false;
    } else {
      this.player.anims.play('idle', true);
    }

    // Jumping
    if ((this.cursors.up.isDown || this.wKey.isDown || this.jumpInput) && this.player.body.touching.down) {
      this.player.setVelocityY(-350);
      this.player.anims.play('jump', true);
    }

    // Check for 'N' key press to skip level
    if (Phaser.Input.Keyboard.JustDown(this.nextLevelKey)) {
      this.skipToNextLevel();
    }
  }

  resizeGame() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Recalculate button Y position
    this.buttonY = height / 6;

    // Update button positions
    if (this.leftButton) {
      this.leftButton.setPosition(80, height - this.buttonY);
      this.rightButton.setPosition(200, height - this.buttonY);
      this.jumpButton.setPosition(width - 80, height - this.buttonY);
    }
  }

  collectCondiment(player, condiment) {
    condiment.disableBody(true, true);

    // Update score
    this.score += 1;
    this.scoreText.setText('Condiments: ' + this.score + ' / 3');

    if (this.condiments.countActive(true) === 0) {
      this.createDoor();
    }
  }

  createDoor() {
    this.door = this.physics.add.sprite(1500, 500, 'door');
    this.door.setImmovable(true);
    this.door.body.allowGravity = false;

    this.physics.add.collider(this.player, this.door, this.enterDoor, null, this);
  }

  enterDoor(player, door) {
    this.skipToNextLevel();
  }

  skipToNextLevel() {
    this.scene.start('Level2Scene', { selectedHotdog: this.selectedHotdog });
  }

  hitObstacle(player, obstacle) {
    this.physics.pause();
    player.setTint(0xff0000);

    this.time.delayedCall(
      1000,
      () => {
        this.scene.restart();
      },
      [],
      this
    );
  }
}

//export default GameScene;
