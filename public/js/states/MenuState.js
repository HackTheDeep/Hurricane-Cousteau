const MenuState = {

    preload: function() {
        //environment
        this.selected = 0
        this.selectArray = ['RUN', 'ABOUT']
        this.canMove = false
        this.moveCounter = 0
	    this.shadowX = 300
        this.shadowY = 400
    },

    create: function() {

        //Load Background and Title
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')

        game.add.text(200, 50, 'Hurricane', {font: '72pt Arial', fill: 'black'})
        game.add.text(200, 126, 'Simulator', {font: '72pt Arial', fill: 'black'})
        game.add.text(300, 400, this.selectArray[this.selected], {font: '42pt Arial', fill: 'black'})
        shadow = game.add.text(this.shadowX, this.shadowY, 'RUN', {font: '42pt Arial', fill: 'yellow'})
        game.add.text(300, 475, 'ABOUT', {font: '42pt Arial', fill: 'black'})

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S)
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    },

    update: function(){
        //Select Mode
        if (this.wKey.isDown || this.cursors.up.isDown){
            if (this.canMove && this.selectArray[this.selected] !== 'RUN'){
                this.selected--
                shadow.destroy()
                this.shadowY -= 75
                shadow = game.add.text(this.shadowX, this.shadowY, this.selectArray[this.selected], {font: '42pt Arial', fill: 'yellow'})
                this.canMove = false
            }
        }
        if (this.sKey.isDown || this.cursors.down.isDown){
            if (this.canMove && this.selectArray[this.selected] !== 'ABOUT'){
                this.selected++
                shadow.destroy()
                this.shadowY += 75
                shadow = game.add.text(this.shadowX, this.shadowY, this.selectArray[this.selected], {font: '42pt Arial', fill: 'yellow'})
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
        if (this.canMove && (this.spaceBar.isDown || this.enter.isDown )){
            let selection = this.selectArray[this.selected]
            if (selection === 'RUN'){
                this.state.start('SetConditionsState')
            } else if (selection === 'ABOUT'){
                window.location.href = "https://github.com/HackTheDeep/Hurricane-Cousteau";
            }
        }
    }
}
