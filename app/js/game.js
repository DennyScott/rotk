// We initialising Phaser
var game = new Phaser.Game(800, 840, Phaser.AUTO, 'gameDiv');

//Define our 'global variable'
game.global = {
	score: 0
};

//Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('cardSelection', cardSelectionState);
game.state.add('play', playState);


//Start the boot state
game.state.start('boot');