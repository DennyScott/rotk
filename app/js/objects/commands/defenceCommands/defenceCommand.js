(function() {

	var game = window.game || {};
	
	/**
	 * A Defence Command is a card that usually destroys or negates attacking cards, as well as maybe doing some other small effects
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 */
	var DefenceCommand = function(owner, value, description, cost) {
		_command = this;

		/**
		 * Initalizes the object
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {strin} description  The description of the given card
		 * @return {Void}                 No Return value
		 */
		var _initalize = function(owner, value, description) {
			game.AbilityCommand.call(_command, owner, value, description, cost);


			_command.damage = 0;
		};

		_initalize(owner, value, description, cost); //Call Constructor

		this.combatAction = function() {};
		this.nonCombatAction = function() {};
	}

	DefenceCommand.prototype = Object.create(game.AbilityCommand.prototype);

	game.DefenceCommand = DefenceCommand; //Add to global Namespace
})();