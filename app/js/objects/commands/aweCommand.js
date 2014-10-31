(function() {

	/**
	 * The awe command is a command that will as long as it stays on the board, do a little damage to the opponent every turn
	 * @param {Player} owner       The owner of this command
	 * @param {string} description the decription of the card
	 */
	var AweCommand = function(owner) {
		_command = this;

		/**
		 * initalizes the awe command
		 * @param {Player} owner       The owner of this command
		 * @param {string} description the decription of the card
		 * @return {void}             No Return Value
		 */
		var _initalize = function(owner, description) {
			var cost = 15;
			var description = 'An Ability card that will do some damage to your opponent every turn it is on the board';
			var value = game.rnd.integerInRange(1, 9);
			game.AbilityCommand.call(_command, owner, value, cost);
		};

		_initalize(owner); //Call Constructor
	}

	AweCommand.prototype = Object.create(game.AbilityCommand.prototype);

	game.AweCommand = AweCommand; //Add to global Namespace
})();