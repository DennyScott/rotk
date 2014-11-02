(function() {
	var game = window.game || {};

	/**
	 * An Incite command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 */
	var InciteCommand = function(owner) {
		var _command = this;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {string} description  The description of the given card
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner) {
			var cost = 30;
			var description = 'An Attack command that will trump any regular command, as well as Fault and Argue, and cause a large amount of damage to your opponent, as well as make your opponent inactive for the following 2 turns';
			var value = 'Incite';
			game.AttackCommand.call(_command, owner, value, description, cost);
			_command.KOTurns = 2;
		};


		_initalize(owner); //Call Constructor
	};

	InciteCommand.prototype = Object.create(game.AttackCommand.prototype);
	game.InciteCommand = InciteCommand; //Add to global Namespace
})();