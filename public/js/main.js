var game = new Phaser.Game(800, 600, Phaser.AUTO)

//environment
let windMultiplier = 0.05
let oceanCurrent = 10
let waterResistance = 0.90
let maxEffectDist = 100
const inputDelay = 15

let drifterData = ['test']

console.log(storm_stats)

game.state.add('GameState', GameState)
game.state.add('PreloadState', PreloadState)
game.state.add('BootState', BootState)
game.state.add('MenuState', MenuState)
game.state.add('SetConditionsState', SetConditionsState)
game.state.add('AboutState', AboutState)
game.state.start('BootState')
