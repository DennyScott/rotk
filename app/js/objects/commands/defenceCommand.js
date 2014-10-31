(function() {

	var DefenceCommand = function(type, value, description, combatAction, nonCombatAction) {
		_command = this;
		this.description;
		
		var _initalize = function(type, value, description, combatAction, nonCombatAction) {
			game.Command.call(_command, type, value);
			_command.combatAction = combatAction || function() {};
			_command.nonCombatAction = nonCombatAction || function() {};
			this.description = description;
		};

		_initalize(type, value, description, combatAction, nonCombatAction); //Call Constructor

		var _addVisibleCommand = _command.addVisibleCommand;

		this.addVisibleCommand = function (x, y) {
			var sprite = 'abilityCommand'
			_addVisibleCommand(x, y, sprite);
		}
	}

	DefenceCommand.prototype = Object.create(game.Command.prototype);

	game.DefenceCommand = DefenceCommand; //Add to global Namespace
})();