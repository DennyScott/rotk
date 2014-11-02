(function() {

	var game = window.game || {};
	
	var AbilityCommand = function(owner, value, description, cost) {
		var _command = this;
		this.description = undefined;
		this.cost = undefined;

		
		var _initalize = function(owner, value, description, cost) {
			var type = 'ability';
			game.Command.call(_command, owner, type, value);
			this.description = description;
			this.cost = cost;
		};

		_initalize(owner, value, description, cost); //Call Constructor

		var _createView = _command.createView;

		/**
		 * Adds the card to the view
		 * @param {int} x The x position of the command
		 * @param {int} y The y positoon of the card
		 */
		this.createView = function(x, y) {
			var sprite = 'abilityCommand';
			_createView(x, y, sprite);
		};
	};

	AbilityCommand.prototype = Object.create(game.Command.prototype);

	game.AbilityCommand = AbilityCommand; //Add to global Namespace
})();