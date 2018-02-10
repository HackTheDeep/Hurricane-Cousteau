const MenuState = {

    preload: function() {
        //environment
        this.selected = 0
        this.selectArray = ['RUN', 'ABOUT']
        this.canMove = false
        this.moveCounter = 0
	    this.shadowX = 430
        this.shadowY = 400
    },

    create: function() {

        //Load Background and Title
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')

        game.add.text(254, 50, 'Hurricane', {font: '72pt Arial', fill: 'black'})
        game.add.text(414, 126, 'Simulator', {font: '84pt Arial', fill: 'black'})
        game.add.text(430, 400, this.selectArray[this.selected], {font: '42pt Megrim', fill: '#5C804B'})
        shadow = game.add.text(this.shadowX, this.shadowY, 'PLAY', {font: '42pt Megrim', fill: '#66FB21'})
        game.add.text(430, 475, 'ABOUT', {font: '42pt Megrim', fill: '#5C804B'})

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S)
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

        //xbox 360 controller setup
        game.input.gamepad.start()
        pad1 = game.input.gamepad.pad1
    },
    update: function(){
        //Select Mode
        if (this.wKey.isDown || this.cursors.up.isDown /*|| pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) */|| pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1){
            if (this.canMove && this.selectArray[this.selected] !== 'PLAY'){
                this.selected--
                shadow.destroy()
                this.shadowY -= 75
                shadow = game.add.text(this.shadowX, this.shadowY, this.selectArray[this.selected], {font: '42pt Megrim', fill: '#66FB21'})
                this.canMove = false
            }
        }
        if (this.sKey.isDown || this.cursors.down.isDown /*|| pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) */|| pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1){
            if (this.canMove && this.selectArray[this.selected] !== 'HOW TO PLAY'){
                this.selected++
                shadow.destroy()
                this.shadowY += 75
                shadow = game.add.text(this.shadowX, this.shadowY, this.selectArray[this.selected], {font: '42pt Megrim', fill: '#66FB21'})
                this.canMove = false
            }
        }

        if (!this.canMove){
            this.moveCounter++
        }

        if (this.moveCounter > inputDelay){
            this.canMove = true
            this.moveCounter = 0
        }

        //Start mode
        if (this.canMove && (this.spaceBar.isDown || this.enter.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_A))){
            let selection = this.selectArray[this.selected]
            if (selection === 'PLAY'){
                this.state.start('JoinGameState')
            } else if (selection === 'HIGH SCORES'){
                // game.add.text(465, 530, 'CANNOT SEE HIGH SCORES YET', {font: '14pt Megrim', fill: '#5C804B'})
                this.state.start('HighScore')
            } else if (selection === 'HOW TO PLAY'){
                this.state.start('HowToPlayState')
            }
        }
    }
}
