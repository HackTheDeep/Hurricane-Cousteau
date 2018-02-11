var PreloadState = {

	preload: function(){
        this.load.image('hurricane', 'assets/hurricane_circle.png')
        this.load.image('vDrifter', 'assets/orange_drifter.png')
	},

	create: function(){
        this.state.start('GameState')
  }
}
