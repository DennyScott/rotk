(function() {


	var AbilityCommand = function(owner, value, description) {
		_command = this;
		this.description;

		
		var _initalize = function(owner, value, description) {
			var type = 'ability';
			game.Command.call(_command, owner, type, value);
			this.description = description
		};

		_initalize(owner, value); //Call Constructor

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

	AbilityCommand.prototype = Object.create(game.Command.prototype);

	game.AbilityCommand = AbilityCommand; //Add to global Namespace
})();