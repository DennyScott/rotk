var playState = {
	preload: function() {
	},

	create: function() {
		this.createBoardAssets();
		this.prepareForGame();
	},

	update: function() {

	},

	/**
	 * The current player has selected a card, which sends an event to this function.
	 * The view contains the event of the card selected.
	 * 
	 * @param  {Event} view Event of the card selected
	 */
	useCard: function(view) {
		//Place the current players choice of card into a global scope.
		game.global.round[game.global.currentPlayer.name()] = view.card;
		game.global.currentPlayer.removeCommand(view.card); //Remove the card from their hand


		//We've hit the end of a turn, call the end of turn chain
		if (game.global.endTurn) {
			this.endOfTurnChain();
		}

		this.changePlayersTurn(); //Change to the opponents turn
		game.global.endTurn = !game.global.endTurn;
	},

	endOfTurnChain: function() {
		//Check if either player has not played a card. If they haven't, give them an empty object.
		//This is because some players may 'skip' turns
		playersCardExists(game.global.round[game.global.playerOne.name()]);
		playerCardExists(game.global.round[game.global.playerTwo.name()]);

		//Try both cards in the event chain
		game.eventChain.playCards(game.global.round[game.global.playerOne.name()], game.global.round[game.global.playerTwo.name()]);
		this.drawCards(); //Both players draw a card
	},

	/**
	 * Both Players Draw a Card
	 */
	drawCards: function(){
		game.global.playerOne.drawCards();
		game.global.playerTwo.drawCards();
	},

	/**
	 * If the player passes a card that doesn't exist, we give them an empty object. This
	 * will primarily be used when a player has "skipped" a turn.
	 * 
	 * @param  {Object} card Card to Check
	 */
	playerCardExists: function(card){
		if(typeof card === 'undefined'){
			card = {};
		}
	},

	changePlayersTurn: function() {
		//If a player has caused the other player to 'skip turns', we will make the 
		//current player continue their turns for multiple turns. (Until cancel turns is
		//out of numbers)
		if(typeof game.global.cancelTurns !== 'undefined' && game.global.cancelTurns > 0){
			game.global.cancelTurns--;
		}else{
			game.global.currentPlayer = game.global.currentPlayer.opponent;
			game.global.currentPlayer.opponent.endTurn();
			game.global.currentPlayer.startTurn();
		}
	},

	createBoardAssets: function() {
		game.global.currentBoard = new game.board(game.world.centerX, game.world.centerY, 0.5);
		game.global.playerOne.createView(0, 10);
		game.global.playerTwo.createView(0, game.global.playerOne.getHeight() + 20);
		game.global.arrow = new game.arrow(game.world.centerX + 200,
			0, .5);
	},

	prepareForGame: function() {
		game.global.round = {
			endRound: false
		}

		game.global.playerOne.prepare(this.useCard, this);
		game.global.playerTwo.prepare(this.useCard, this);
		game.global.currentPlayer.startTurn();
	}
};