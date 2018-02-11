const GameState = {

    applyWind: function(hurricane, drifters) {
        console.log('a drifter!')
    },

    preload: function() {

        // //Player
        // this.canAttack = true
        // this.attackCooldown = 0
        // this.attackWaitTime = mainAttackCooldown
        // this.superAttackCounter = 0
        // this.superAttackTimes = 0
        // this.superAttack = false
        // this.isAlive = true
        // this.gameOverTimer = 0
        // this.isLeveling = false
        // this.levelTimer = 0
    },

    create: function() {
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')

        hurricane = game.add.sprite(800, 600, 'hurricane')
        hurricane.anchor.set(0.5)
        game.physics.arcade.enable(hurricane)
        hurricane.body.velocity.x = -10
        hurricane.body.velocity.y = -10
        hurricane.scale.setTo(0.05, 0.05)
        hurricane.body.angularVelocity = -50

        drifters = game.add.group()
        drifters.enableBody = true

        drifters.createMultiple(100, 'vDrifter');
        drifters.setAll('anchor.x', 0.5)
        drifters.setAll('anchor.y', 0.5)

        //  Our controls.
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)

    },

    update: function(){

        game.physics.arcade.overlap(hurricane, drifters, this.applyWind, null, this)

        if(this.backspace.isDown){
            this.state.start('MenuState')
        }

    }

}
