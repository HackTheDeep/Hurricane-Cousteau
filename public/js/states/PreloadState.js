var PreloadState = {

	preload: function(){
    this.load.image('hurricane', 'assets/hurricane_circle.png')
    this.load.image('vDrifter', 'assets/orange_drifter.png')
    this.load.image('rDrifter', 'assets/green_drifter.png')
	},

	create: function(){
		fetch('/api/drifters')
		.then(result => result.json())
		.then(data => {
			drifterData = data
			this.state.start('GameState')
		})
  }
}
