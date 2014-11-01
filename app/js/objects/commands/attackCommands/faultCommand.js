(function() {

	/**
	 * An fault command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 */
	var FaultCommand = function(owner) {
		_command = this;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {string} description  The description of the given card
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner) {
			var value = 'Fault';
			var cost = 15;
			var description = 'An Attack command that will trump any regular command and cause a bit of damage to your opponent';
			game.AttackCommand.call(_command, owner, value, description, cost);

			_command.damage = 10;
		};


		_initalize(owner); //Call Constructor

		var _combatAction = _command.combatAction;

		this.combatAction = function () {
			_combatAction(this.damage);
		};
	}

	FaultCommand.prototype = Object.create(game.AttackCommand.prototype);

	game.FaultCommand = FaultCommand; //Add to global Namespace
})();