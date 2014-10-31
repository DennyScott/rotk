(function() {

	/**
	 * The awe command is a command that will as long as it stays on the board, do a little damage to the opponent every turn
	 * @param {Player} owner       The owner of this command
	 * @param {string} description the decription of the card
	 */
	var AweCommand = function(owner, description) {
		_command = this;

		/**
		 * initalizes the awe command
		 * @param {Player} owner       The owner of this command
		 * @param {string} description the decription of the card
		 * @return {void}             No Return Value
		 */
		var _initalize = function(owner, description) {
			var value = game.rnd.integerInRange(1, 9);
			game.AbilityCommand.call(_command, owner, value);
		};

		_initalize(owner, description); //Call Constructor
	}

	AweCommand.prototype = Object.create(game.AbilityCommand.prototype);

	game.AweCommand = AweCommand; //Add to global Namespace
})();