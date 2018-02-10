var game = new Phaser.Game(800, 600, Phaser.AUTO)

//environment
let windSpeed = 100
let oceanCurrent = 10
let waterResistance = 0.5
const inputDelay = 15

game.state.add('GameState', GameState)
game.state.add('PreloadState', PreloadState)
game.state.add('BootState', BootState)
game.state.add('MenuState', MenuState)
game.state.add('SetConditionsState', SetConditionsState)
game.state.add('AboutState', AboutState)
game.state.start('BootState')
