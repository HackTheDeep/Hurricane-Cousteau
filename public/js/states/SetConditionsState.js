const SetConditionsState = {

    preload: function() {
        //Environment
        this.canMove = false
        this.moveCounter = 0
        this.isReady = false
        this.glowCounter = 0
	    this.isGlowing = false
    },

    create: function() {

      //Load Background and Title
      this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')
			game.add.text(100, 100, 'Press enter to run', {font: '32pt Arial', fill: 'black'})

      //  Our controls.
      this.cursors = this.game.input.keyboard.createCursorKeys()
      this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
      this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)
    },

    update: function(){
		//Select Ready
		if (!this.canMove){
			this.moveCounter++
		}

		if (this.moveCounter > inputDelay){
			this.canMove = true
			this.isReady = true
			this.moveCounter = 0
		}

		//Start Game

		if (this.isReady){
			if (this.spaceBar.isDown || this.enter.isDown){
				this.state.start('PreloadState')
			}
		}

		//Back to Menu
		if (this.backspace.isDown){
		this.state.start('MenuState')
		}
    }
}
