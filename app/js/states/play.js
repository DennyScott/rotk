var game;
var Phaser;
window.states = window.states || {};

window.states.playState = {
	preload: function() {
		game = window.game || {};
		Phaser = window.Phaser || {};
	},

	create: function() {
		// this.startTime();
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
		game.global.useAudio.play();


		//We've hit the end of a turn, call the end of turn chain
		if (game.global.endTurn) {
			this.endOfTurnChain();
		} else {
			this.changePlayersTurn(); //Change to the opponents turn
		}
		game.global.endTurn = !game.global.endTurn;
	},

	endOfTurnChain: function() {
		//Check if either player has not played a card. If they haven't, give them an empty object.
		//This is because some players may 'skip' turns
		this.playerCardExists(game.global.round[game.global.playerOne.name()]);
		this.playerCardExists(game.global.round[game.global.playerTwo.name()]);

		var callback = function() {
			var found;
			if (game.global.playerOne.health() <= 0) {
				found = game.global.playerOne;
			} else if (game.global.playerTwo.health() <= 0) {
				found = game.global.playerTwo;
			}
			if (typeof found !== 'undefined') {
				game.global.winner = found.opponent;
				found.hand = [];
				found.opponent.hand = [];
				game.state.start('victory');
			} else {
				this.drawCards();
				this.changePlayersTurn();
				this.clearRound();
			}
		};

		//Try both cards in the event chain
		game.eventChain.playCards(game.global.round[game.global.playerOne.name()], game.global.round[game.global.playerTwo.name()], callback, this);

	},

	/**
	 * Both Players Draw a Card
	 */
	drawCards: function() {
		game.global.playerOne.drawCards();
		game.global.playerTwo.drawCards();
	},

	/**
	 * If the player passes a card that doesn't exist, we give them an empty object. This
	 * will primarily be used when a player has "skipped" a turn.
	 *
	 * @param  {Object} card Card to Check
	 */
	playerCardExists: function(card) {
		if (typeof card === 'undefined') {
			card = {};
		}
	},

	changePlayersTurn: function() {
		//If a player has caused the other player to 'skip turns', we will make the 
		//current player continue their turns for multiple turns. (Until cancel turns is
		//out of numbers)
		if (typeof game.global.cancelTurns !== 'undefined' && game.global.cancelTurns > -1) {
			game.global.cancelTurns--;
			game.global.endTurn = true;
			this.showMissingTurnsLabel();

			if (game.global.cancelTurns === -1) {
				game.global.endTurn = false;
				game.global.cancelTurns = undefined;
				this.hideMissingTurnsLabel();
				this.flipTurn(game.global.playerOne);
			} else {
				this.waitForTurn();
			}
		} else {
			this.flipTurn(game.global.currentPlayer.opponent);
		}
	},

	flipTurn: function(player) {
		game.global.currentPlayer = player;
		game.global.currentPlayer.opponent.endTurn();
		this.waitForTurn();
	},

	createBoardAssets: function() {
		game.global.currentBoard = new game.board(game.world.centerX, game.world.height * 0.45, 0.6);
		game.global.playerOne.createView(10, 10, 0, 0);
		game.global.playerTwo.createView(game.world.width - 10, 10, 1, 0);
		game.global.arrow = new game.arrow(game.world.width * 0.80,
			game.world.height * 0.45, 0.5);
		game.global.currentTurnIndicatior = game.add.text(game.world.centerX, -50,
			'Current Player: ' + game.global.currentPlayer.name(), {
				font: '25px Geo',
				fill: '#ffffff',
				align: 'center'
			});
		game.add.tween(game.global.currentTurnIndicatior).to({
			y: game.world.height * 0.10,
		}, 1000, Phaser.Easing.Bounce.Out, true);
		game.global.currentTurnIndicatior.anchor.setTo(0.5, 0.5);
	},

	clearBoard: function() {
		game.global.playerOne.clearCards();
		game.global.playerTwo.clearCards();
	},

	clearRound: function() {
		game.global.round = {};
	},

	hideMissingTurnsLabel: function() {
		game.global.currentPlayer.opponent.hideMissingTurnsView();
	},

	showMissingTurnsLabel: function() {
		game.global.currentPlayer.opponent.showMissingTurnsView();
	},

	prepareForGame: function() {
		this.clearRound();

		game.global.playerOne.prepare(this.useCard, this);
		game.global.playerTwo.prepare(this.useCard, this);
		this.waitForTurn();

	},

	waitForTurn: function() {
		var playerNameText = game.global.currentPlayer.name() + "'s turn starts in";
		this.playerNameWarning = game.add.text(10, game.world.height * 0.65,
			playerNameText, {
				font: '40px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		this.playerNameWarning.anchor.setTo(0, 0.5);

		this.timeRemainText = 3;
		this.timeRemainWarning = game.add.text(200, game.world.height * 0.65 + 45,
			this.timeRemainText, {
				font: '40px Arial',
				fill: '#ffffff',
				align: 'center'
			});
		this.timeRemainWarning.anchor.setTo(0.5, 0.5);

		var self = this;
		this.countdown = setInterval(function() {
			self.timeRemainText--;
			self.timeRemainWarning.text = self.timeRemainText;
			if (self.timeRemainText <= 0) {
				clearInterval(self.countdown);
				self.playerNameWarning.destroy();
				self.timeRemainWarning.destroy();
				game.global.currentPlayer.startTurn();
				game.global.currentTurnIndicatior.text = 'Current Player: ' + game.global.currentPlayer.name();
			}
		}, 1000);
	}
};