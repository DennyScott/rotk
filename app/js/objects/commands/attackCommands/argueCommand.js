(function() {
	var game = window.game || {};

	/**
	 * An argue command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 */
	var ArgueCommand = function(owner) {
		var _command = this;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {string} description  The description of the given card
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner) {
			var value = 'Argue';
			var cost = 20;
			var description = 'An Attack command that will trump any regular command, as well as Fault, and cause a medium amount of damage to your opponent';
			game.AttackCommand.call(_command, owner, value, description, cost);

			_command.damage = 20;
		};


		_initalize(owner); //Call Constructor

		var _combatAction = _command.combatAction;

		this.combatAction = function () {
			_combatAction(this.damage, this.owner);
		};
	};

	ArgueCommand.prototype = Object.create(game.AttackCommand.prototype);

	game.ArgueCommand = ArgueCommand; //Add to global Namespace
})();