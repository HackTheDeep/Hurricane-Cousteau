const AboutState = {

    preload: function() {
        this.startingWait = 0
        this.canMove = false

    },

    create: function() {
        //Load Background and Text
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')
        game.add.text(125, 60, 'This is the About page...', {font: '24pt Arial', fill: 'yellow'})

        //  Controls.
        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)
    },
    update: function(){
        if(!this.canMove){
            this.startingWait++
        }

        if(this.startingWait > 30){
            this.canMove = true
        }

        //Start mode
        if (this.canMove){
            if (this.backspace.isDown){
                this.state.start('MenuState')
            }
        }
    }
}
