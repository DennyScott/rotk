(function() {

	/**
	 * A Defence Command is a card that usually destroys or negates attacking cards, as well as maybe doing some other small effects
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 * @param {function} nonCombatAction the function that will be played if an attack card is played and this is in the opponents hand
	 */
	var DefenceCommand = function(owner, value, description, combatAction, nonCombatAction) {
		_command = this;
		this.description;

		/**
		 * Initalizes the object
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {strin} description  The description of the given card
		 * @param {function} combatAction The function that will run when this card is played
		 * @param {function} nonCombatAction the function that will be played if an attack card is played and this is in the opponents hand
		 * @return {Void}                 No Return value
		 */
		var _initalize = function(owner, value, description, combatAction, nonCombatAction) {
			game.Command.call(_command, owner, type, value);
			_command.combatAction = combatAction || function() {};
			_command.nonCombatAction = nonCombatAction || function() {};
			this.description = description;
		};

		_initalize(owner, value, description, combatAction, nonCombatAction); //Call Constructor

		var _addVisibleCommand = _command.addVisibleCommand;

		/**
		 * Adds the card to the view
		 * @param {int} x The x position of the command
		 * @param {int} y The y positoon of the card
		 */
		this.addVisibleCommand = function(x, y) {
			var sprite = 'abilityCommand'
			_addVisibleCommand(x, y, sprite);
		}
	}

	DefenceCommand.prototype = Object.create(game.Command.prototype);

	game.DefenceCommand = DefenceCommand; //Add to global Namespace
})();