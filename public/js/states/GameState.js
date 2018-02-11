const GameState = {

    // applyWind: function(hurricane, drifters) {
    //     console.log('a drifter!')
    // },

    preload: function() {
        this.globalTimer = 1
        this.frameCount = 0
        this.frameLength = 3
        this.distanceMultiplier = 23
        this.endtext = null
    },

    create: function() {
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')

        hurricane = game.add.sprite(800, 600, 'hurricane')
        hurricane.anchor.set(0.5)
        game.physics.arcade.enable(hurricane)
        hurricane.scale.setTo(0.05, 0.05)
        hurricane.body.angularVelocity = -200

        windText = game.add.text(800, 600, storm_stats[1][5] + ' mph' , {font: '12pt Arial', fill: 'black'})
        windText.anchor.set(0.5)

        drifters = game.add.group()
        drifters.enableBody = true

        drifters.createMultiple(100, 'vDrifter');
        drifters.setAll('anchor.x', 0.5)
        drifters.setAll('anchor.y', 0.5)

        let driftX = 0
        let driftY = 0
        let tempDrifter

        for(let i = 1; i <= 124; i++){
            tempDrifter = drifters.create(driftX, driftY, 'vDrifter')
            tempDrifter.scale.setTo(0.02, 0.02)
            driftX += 50
            if (driftX > 800){
                driftY += 100
                driftX = 0
            }
        }

        this.timeStamp = game.add.text(8, 8, storm_stats[this.globalTimer][1] + ' ' + storm_stats[this.globalTimer][0] + ', ' + storm_stats[this.globalTimer][2] + ':00', {font: '24pt Arial', fill: 'black'})

        //  Our controls.
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)
    },

    update: function(){

        //game.physics.arcade.overlap(hurricane, drifters, this.applyWind, null, this)

        let currentStormStats = storm_stats[this.globalTimer]
        if (currentStormStats){
            this.frameCount++
            if (this.frameCount >= this.frameLength){
                drifters.children.forEach(drifter => {
                    let distance = game.physics.arcade.distanceBetween(hurricane, drifter)
                    if (distance < maxEffectDist){
                        let angle = game.math.angleBetweenPoints(hurricane.position, drifter.position)
                        game.physics.arcade.velocityFromRotation(angle - Math.PI / 2, (50 * (maxEffectDist/distance)) * (currentStormStats[5] * windMultiplier), drifter.body.velocity)
                    }
                    if (drifter.body.velocity.x !== 0){
                       drifter.body.velocity.x *= waterResistance
                    }
                    if (drifter.body.velocity.y !== 0){
                       drifter.body.velocity.y *= waterResistance
                    }
                })

                this.frameCount = 0
                let stormXY = {
                    x: (800 - storm_stats[1][4] * this.distanceMultiplier) + (currentStormStats[4] * this.distanceMultiplier),
                    y: (600 + storm_stats[1][3] * this.distanceMultiplier) - (currentStormStats[3] * this.distanceMultiplier)
                }
                hurricane.position.x = stormXY.x
                hurricane.position.y = stormXY.y
                windText.destroy()
                windText = game.add.text(stormXY.x, stormXY.y, currentStormStats[5] + ' mph', {font: '12pt Arial', fill: 'black'})
                windText.anchor.set(0.5)

                this.timeStamp.destroy()
                this.timeStamp = game.add.text(8, 8, currentStormStats[1] + ' ' + currentStormStats[0] + ', ' + storm_stats[this.globalTimer][2] + ':00' , {font: '24pt Arial', fill: 'black'})
                this.globalTimer++
            }
        } else if(!this.endtext) {
            this.endtext = game.add.text(400, 300, 'Simulation Over', {font: '36pt Arial', fill: 'black'})
            this.endtext.anchor.set(0.5)
        }
        if (this.backspace.isDown){
            this.state.start('MenuState')
        }
    }
}
