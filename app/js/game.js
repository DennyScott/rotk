var Phaser = window.Phaser || {};
// We initialising Phaser
var game = new Phaser.Game(1000, 680, Phaser.AUTO, 'gameDiv');

//Define our 'global variable'
game.global = {
	fullHand: 7,
	comboValue: 25,
	turnDamage: 10,
	aweDamage: 5,
	allNumbers: 27, //To get a 1 to 9 of each color (i.e Red, Blue, and Green)
	neededAmountOfCards: 30,
	amountOfColors: 3
};

game.chainProperties = {}; //Used For Different Chains (Attack, defense, etc)

//Add all the states
game.state.add('boot', window.states.bootState);
game.state.add('load', window.states.loadState);
game.state.add('menu', window.states.menuState);
game.state.add('cardSelection', window.states.cardSelectionState);
game.state.add('play', window.states.playState);
game.state.add('victory', window.states.victoryState);


//Start the boot state
game.state.start('boot');