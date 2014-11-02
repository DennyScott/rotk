(function() {

	/**
	 * An Incite command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 */
	var InciteCommand = function(owner) {
		_command = this;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {string} description  The description of the given card
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner) {
			var value = 'Incite';
			var cost = 30;
			var description = 'An Attack command that will trump any regular command, as well as Fault and Argue, and cause a large amount of damage to your opponent, as well as make your opponent inactive for the following 2 turns';
			game.AttackCommand.call(_command, owner, value, description, cost);

			_command.damage = 25;
		};


		_initalize(owner); //Call Constructor

		var _combatAction = _command.combatAction;

		this.combatAction = function() {
			_combatAction(this.damage, this.owner);
			game.global.currentPlayer = this.owner;
			game.global.cancelTurns = 2;
		};
	}

	InciteCommand.prototype = Object.create(game.AttackCommand.prototype);

	game.InciteCommand = InciteCommand; //Add to global Namespace
})();