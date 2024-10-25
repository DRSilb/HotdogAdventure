// Default.js

export default class Default extends Phaser.Scene {
  constructor(config) {
    super(config);
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

  startStopwatch() {
    if (!this.stopwatchStarted) {
      this.stopwatch.start();
      this.stopwatchStarted = true;
    }
  }

  hitObstacle(player, obstacle) {
    this.physics.pause();
    player.setTint(0xff0000);

    this.stopwatch.stop(); // Stop the stopwatch
    this.time.delayedCall(
      1000,
      () => {
        this.stopwatch.reset(); // Reset the stopwatch
        this.stopwatchStarted = false; // Reset the flag
        this.scene.restart();
      },
      [],
      this
    );
  }

  jump(jumpHeight) {
    if (
      (this.cursors.up.isDown || this.wKey.isDown || this.jumpInput) &&
      this.player.body.touching.down
    ) {
      this.player.setVelocityY(jumpHeight);
      this.player.anims.play('jump', true);
    }
  }

  initializeInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.nextLevelKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
  }

  createDoor(x, y) {
    this.door = this.physics.add.sprite(x, y, 'door');
    this.door.setImmovable(true);
    this.door.body.allowGravity = false;

    this.physics.add.collider(this.player, this.door, this.enterDoor, null, this);
  }

  speed(speed) {
    if (this.cursors.left.isDown || this.aKey.isDown || this.leftInput) {
        this.player.setVelocityX(-speed);
        this.player.anims.play('run', true);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown || this.dKey.isDown || this.rightInput) {
        this.player.setVelocityX(speed);
        this.player.anims.play('run', true);
        this.player.flipX = false;
      } else {
        this.player.anims.play('idle', true);
      }
  }

  collectCondiment(amount, x_door, y_door, player, condiment) {
    // Remove condiment
    condiment.disableBody(true, true);
  
    // Update score
    this.score += 1;
    this.scoreText.setText('Condiments: ' + this.score + ' / ' + amount);
  
    if (this.condiments.countActive(true) === 0) {
      this.createDoor(x_door, y_door);
    }
  }

  createDefaults(config) {
    const {
      playerConfig,
      worldBounds = { width: 1600, height: 1200 },
      cameraBounds = { width: 1600, height: 1200 },
      platformsConfig = {},
      condimentsConfig = {},
      obstaclesConfig = {},
    } = config;

    // Set world bounds and camera settings
    this.physics.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    this.cameras.main.setBounds(0, 0, cameraBounds.width, cameraBounds.height);
    this.cameras.main.centerOn(cameraBounds.width / 2, cameraBounds.height / 2);

    // Platforms
    this.platforms = this.physics.add.staticGroup();

    // Add platforms along the floor
    const floorConfig = platformsConfig.floor || { xStart: 0, xEnd: worldBounds.width, xStep: 200, y: 1184, sprite: 'platform' };
    for (let x = floorConfig.xStart; x <= floorConfig.xEnd; x += floorConfig.xStep) {
      this.platforms.create(x, floorConfig.y, floorConfig.sprite).setOrigin(0.5, 0.5);
    }

    // Additional platforms
    const additionalPlatforms = platformsConfig.additional || [];
    additionalPlatforms.forEach(platform => {
      this.platforms.create(platform.x, platform.y, platform.sprite || 'platform');
    });

    // Player
    const { x: playerX = 100, y: playerY = 1100, sprite: playerSprite = 'player' } = playerConfig;
    this.player = this.physics.add.sprite(playerX, playerY, playerSprite);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.player);

    // Condiments
    this.condiments = this.physics.add.group({
      allowGravity: true,
      bounceY: 0.5,
    });

    const condimentPositions = condimentsConfig.positions || [];
    condimentPositions.forEach(pos => {
      this.condiments.create(pos.x, pos.y, 'condiment');
    });

    // Obstacles
    this.obstacles = this.physics.add.staticGroup();
    const obstaclePositions = obstaclesConfig.positions || [];
    obstaclePositions.forEach(obstacle => {
      this.obstacles.create(obstacle.x, obstacle.y, obstacle.sprite);
    });

    // Collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.condiments, this.platforms);
    this.physics.add.collider(this.obstacles, this.platforms);
    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
  }
  
}
