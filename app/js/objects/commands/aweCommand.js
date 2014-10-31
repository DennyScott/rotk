(function() {

	/**
	 * The awe command is a command that will as long as it stays on the board, do a little damage to the opponent every turn
	 * @param {Player} owner       The owner of this command
	 * @param {string} description the decription of the card
	 */
	var AweCommand = function(owner, description) {
		_command = this;
		this.description;

		/**
		 * [_initalize description]
		 * @param {Player} owner       The owner of this command
		 * @param {string} description the decription of the card
		 * @return {void}             No Return Value
		 */
		var _initalize = function(owner, description) {
			var type = 'ability';
			var value = game.rnd.integerInRange(1, 9);
			game.Command.call(_command, owner, type, value);
			this.description = description;
		};

		_initalize(owner, description); //Call Constructor

		var _addVisibleCommand = _command.addVisibleCommand;

		/**
		 * Adds the card to the view
		 * @param {int} x The x position of the command
		 * @param {int} y The y positoon of the card
		 */
		this.addVisibleCommand = function(x, y) {
			var sprite = 'abilityCommand';
			_addVisibleCommand(x, y, sprite);
		}
	}

	AweCommand.prototype = Object.create(game.Command.prototype);

	game.AweCommand = AweCommand; //Add to global Namespace
})();