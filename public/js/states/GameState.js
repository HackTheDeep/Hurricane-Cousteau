const GameState = {

    applyWind: function(hurricane, drifters) {
        console.log('a drifter!')
    },

    preload: function() {

        this.globalTimer = 1
        this.frameCount = 0
        this.frameLength = 5
        this.distanceMultiplier = 23
        this.endtext = null
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
        // hurricane.body.velocity.x = -10
        // hurricane.body.velocity.y = -10
        hurricane.scale.setTo(0.05, 0.05)
        hurricane.body.angularVelocity = -200

        drifters = game.add.group()
        drifters.enableBody = true

        drifters.createMultiple(100, 'vDrifter');
        drifters.setAll('anchor.x', 0.5)
        drifters.setAll('anchor.y', 0.5)

        this.timeStamp = game.add.text(8, 8, storm_stats[this.globalTimer][0] + ' || ' + storm_stats[this.globalTimer][1] , {font: '24pt Arial', fill: 'black'})

        //  Our controls.
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)

    },

    update: function(){

        game.physics.arcade.overlap(hurricane, drifters, this.applyWind, null, this)

        if (storm_stats[this.globalTimer]){
            this.frameCount++
            if (this.frameCount >= this.frameLength){
                this.frameCount = 0
                let latString = storm_stats[this.globalTimer][2]
                let longString = storm_stats[this.globalTimer][3]
                hurricane.position.x = (800 + Number(storm_stats[1][2].slice(0, storm_stats[1][2].length - 1)) * this.distanceMultiplier) - (Number(latString.slice(0,latString.length - 1)) * this.distanceMultiplier)
                hurricane.position.y = (600 - Number(storm_stats[1][3].slice(0, storm_stats[1][3].length - 1)) * this.distanceMultiplier) + (Number(longString.slice(0,longString.length - 1)) * this.distanceMultiplier)
                this.timeStamp.destroy()
                this.timeStamp = game.add.text(8, 8, storm_stats[this.globalTimer][0] + ' || ' + storm_stats[this.globalTimer][1] , {font: '24pt Arial', fill: 'black'})
                this.globalTimer++
            }
        } else if(!this.endtext) {
            this.endtext = game.add.text(200, 200, 'Simulation Over', {font: '36pt Arial', fill: 'black'})
        }
        if (this.backspace.isDown){
            this.state.start('MenuState')
        }

    }

}
