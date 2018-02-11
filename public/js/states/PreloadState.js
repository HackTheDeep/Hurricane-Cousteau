var PreloadState = {

	preload: function(){
        this.load.image('hurricane', 'assets/hurricane_circle.png')
        this.load.image('vDrifter', 'assets/drifter_circle.png')
	},

	create: function(){
        this.state.start('GameState')
  }
}
