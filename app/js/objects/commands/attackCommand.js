(function() {

	var AttackCommand = function(type, value, description, combatAction) {
		_command = this;
		this.description;
		
		var _initalize = function(type, value, description, combatAction) {
			game.Command.call(_command, type, value);
			_command.combatAction = combatAction || function() {};
			this.description = description
		};

		_initalize(type, value, description, combatAction); //Call Constructor

		var _addVisibleCommand = _command.addVisibleCommand;

		this.addVisibleCommand = function (x, y) {
			var sprite = 'abilityCommand'
			_addVisibleCommand(x, y, sprite);
		}
	}

	AttackCommand.prototype = Object.create(game.Command.prototype);

	game.AttackCommand = AttackCommand; //Add to global Namespace
})();