// We initialising Phaser
var game = new Phaser.Game(800, 840, Phaser.AUTO, 'gameDiv');

//Define our 'global variable'
game.global = {
	fullHand: 7,
	comboValue: 10,
	turnDamage: 5,
	aweDamage: 5
};

game.chainProperties = {}; //Used For Different Chains (Attack, defense, etc)

//Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('cardSelection', cardSelectionState);
game.state.add('play', playState);


//Start the boot state
game.state.start('boot');