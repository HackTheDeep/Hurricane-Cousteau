var game = new Phaser.Game(800, 600, Phaser.AUTO)

//environment
let windSpeed = 100
let oceanCurrent = 10
let waterResistance = 0.5

game.state.add('GameState', GameState)
game.state.add('PreloadState', PreloadState)
game.state.add('BootState', BootState)
game.state.add('MenuState', MenuState)
game.state.add('JoinGameState', JoinGameState)
game.state.add('HowToPlayState', HowToPlayState)
game.state.start('BootState')
