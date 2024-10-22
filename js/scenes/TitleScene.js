class TitleScene extends Phaser.Scene {
    constructor() {
      super({ key: 'TitleScene' });
      this.hotdogSprites = ['hotdog1', 'hotdog2', 'hotdog3']; // Different hotdog images
      this.currentHotdogIndex = 0;
    }
  
    create() {
      // Set background color
      this.cameras.main.setBackgroundColor('#87CEEB'); // Light blue background
  
      // Title Text
      this.titleText = this.add.text(
        this.cameras.main.centerX, 
        this.cameras.main.centerY - 150, 
        'Hotdog Adventure', 
        { fontSize: '64px', fill: '#000', fontStyle: 'bold' }
      ).setOrigin(0.5);
  
      // Instructions Text
      this.instructionsText = this.add.text(
        this.cameras.main.centerX, 
        this.cameras.main.centerY + 150, 
        'Press Space or Tap to Start', 
        { fontSize: '32px', fill: '#000' }
      ).setOrigin(0.5);
  
      // Display current hotdog
      this.currentHotdog = this.add.sprite(
        this.cameras.main.centerX, 
        this.cameras.main.centerY, 
        this.hotdogSprites[this.currentHotdogIndex]
      ).setOrigin(0.5);
  
      // Add input listeners for keyboard or pointer
      this.input.keyboard.on('keydown-SPACE', this.startGame, this);
      this.input.keyboard.on('keydown-LEFT', this.previousHotdog, this);
      this.input.keyboard.on('keydown-RIGHT', this.nextHotdog, this);
      //this.input.on('pointerdown', this.startGame, this);
  
      // Left and Right arrows for mobile/touch
      this.leftArrow = this.add.image(
        this.cameras.main.centerX - 200, 
        this.cameras.main.centerY + 75, 
        'leftButton'
      ).setInteractive().setAlpha(0.5);
      this.leftArrow.on('pointerdown', () => {
        this.leftArrow.setTint(0xaaaaaa);
        this.previousHotdog();
      });
      this.leftArrow.on('pointerup', () => {
        this.leftArrow.clearTint();
      });
      this.leftArrow.on('pointerout', () => {
        this.leftArrow.clearTint();
      });
  
      this.rightArrow = this.add.image(
        this.cameras.main.centerX + 200, 
        this.cameras.main.centerY + 75, 
        'rightButton'
      ).setInteractive().setAlpha(0.5);
      this.rightArrow.on('pointerdown', () => {
        this.rightArrow.setTint(0xaaaaaa);
        this.nextHotdog();
      });
      this.rightArrow.on('pointerup', () => {
        this.rightArrow.clearTint();
      });
      this.rightArrow.on('pointerout', () => {
        this.rightArrow.clearTint();
      });
  
      // Play Button
      this.playButton = this.add.image(
        this.cameras.main.centerX, 
        this.cameras.main.centerY + 250, 
        'startButton'
      ).setInteractive().setAlpha(0.5);
      this.playButton.on('pointerdown', () => {
        this.playButton.setTint(0xaaaaaa);
        this.startGame();
      });
      this.playButton.on('pointerup', () => {
        this.playButton.clearTint();
      });
      this.playButton.on('pointerout', () => {
        this.playButton.clearTint();
      });

      // Enable multitouch for mobile devices
      this.input.addPointer(3);
  
      // Add WASD and Arrow Keys on Title Screen
      this.add.text(75, 150, '   W \n A S D', { fontSize: '96px', fill: '#000' });
      this.add.text(1325, 150, '   ↑\n ← ↓ →', { fontSize: '96px', fill: '#000' });
    }
  
    previousHotdog() {
      this.currentHotdogIndex = (this.currentHotdogIndex - 1 + this.hotdogSprites.length) % this.hotdogSprites.length;
      this.updateHotdogSprite();
    }
  
    nextHotdog() {
      this.currentHotdogIndex = (this.currentHotdogIndex + 1) % this.hotdogSprites.length;
      this.updateHotdogSprite();
    }
  
    updateHotdogSprite() {
      this.currentHotdog.setTexture(this.hotdogSprites[this.currentHotdogIndex]);
    }
  
    startGame() {
      // Pass selected hotdog to the GameScene
      this.scene.start('GameScene', { selectedHotdog: this.hotdogSprites[this.currentHotdogIndex] });
    }
  }