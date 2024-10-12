class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Level3Scene' });
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
    this.platforms.create(400, 1100, 'platform');
    this.platforms.create(800, 900, 'platform');
    this.platforms.create(1200, 700, 'platform');
    this.platforms.create(400, 500, 'platform');
    this.platforms.create(800, 300, 'platform');

    // Player
    this.player = this.physics.add.sprite(100, 1100, 'hotdog');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Camera follows player
    this.cameras.main.startFollow(this.player);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.nextLevelKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    this.condiments = this.physics.add.group({
      allowGravity: true,
      bounceY: 0.5
    });
    // Condiments
    //this.condiments.create(400, 1050, 'condiment');
    this.condiments.create(800, 850, 'condiment');
    this.condiments.create(1200, 650, 'condiment');
    this.condiments.create(400, 450, 'condiment');
    this.condiments.create(800, 250, 'condiment');

    // Obstacles
    this.obstacles = this.physics.add.staticGroup();
    this.obstacles.create(600, 1070, 'fork');
    this.obstacles.create(1000, 870, 'knife');
    this.obstacles.create(600, 670, 'fork');
    this.obstacles.create(1000, 470, 'knife');

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
      .text(16, 16, 'Condiments: 0 / 4', { fontSize: '32px', fill: '#000' })
      .setScrollFactor(0);

    // Door (initialize as null)
    this.door = null;
  }

  update() {
    // Player movement
    this.player.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-530);
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
    this.scoreText.setText('Condiments: ' + this.score + ' / 4');

    if (this.condiments.countActive(true) === 0) {
      this.createDoor();
    }
  }

  createDoor() {
    this.door = this.physics.add.sprite(1500, 250, 'door');
    this.door.setImmovable(true);
    this.door.body.allowGravity = false;

    this.physics.add.collider(this.player, this.door, this.enterDoor, null, this);
  }

  enterDoor(player, door) {
    this.skipToNextLevel();
  }

  skipToNextLevel() {
    this.scene.start('Level4Scene');
  }

  hitObstacle(player, obstacle) {
    this.physics.pause();
    player.setTint(0xff0000);

    this.time.delayedCall(1000, () => {
      this.scene.restart();
    }, [], this);
  }
}
