(function() {

	/**
	 * An attack command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 */
	var AttackCommand = function(owner, value, description, combatAction) {
		_command = this;
		this.description;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {strin} description  The description of the given card
		 * @param {function} combatAction The function that will run when this card is played
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner, value, description, combatAction) {
			var type = 'ability';
			game.Command.call(_command, owner, type, value);
			_command.combatAction = combatAction || function() {};
			this.description = description
		};

		_initalize(owner, value, description, combatAction); //Call Constructor

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

	AttackCommand.prototype = Object.create(game.Command.prototype);

	game.AttackCommand = AttackCommand; //Add to global Namespace
})();