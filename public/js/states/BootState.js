var BootState = {

  preload: function(){
    this.load.image('water_texture', 'assets/water_texture.jpg')
  },

  create: function() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    //  A simple background for our game
    this.game.stage.backgroundColor = '#0198E1' //topez
    this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'water_texture')
    this.state.start('MenuState')
  },
}
