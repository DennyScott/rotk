(function() {

	/**
	 * An attack command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 */
	var AttackCommand = function(owner, value, description) {
		_command = this;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {strin} description  The description of the given card
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner, value, description) {
			game.AbilityCommand.call(_command, owner, value, description);
			this.description = description
		};

		_initalize(owner, value, description); //Call Constructor

		this.combatAction = function () {};
	}

	AttackCommand.prototype = Object.create(game.AbilityCommand.prototype);

	game.AttackCommand = AttackCommand; //Add to global Namespace
})();