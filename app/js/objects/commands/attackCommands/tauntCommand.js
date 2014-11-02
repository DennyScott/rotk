(function() {

	var game = window.game || {};

	/**
	 * An Taunt command, which usually does some damage to  a players opponent.
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 * @param {function} combatAction The function that will run when this card is played
	 */
	var TauntCommand = function(owner) {
		var _command = this;

		/**
		 * Initalizes the cards
		 * @param {Player} owner        The owner of this command
		 * @param {string} value        The value of the card, such as taunt
		 * @param {string} description  The description of the given card
		 * @return {void}              No Return Value
		 */
		var _initalize = function(owner) {
			var value = 'Taunt';
			var cost = 45;
			var description = 'An Attack command that will trump any regular command, as well as Fault and Argue, and cause a massive amount of damage to your opponent, as well as make your opponent inactive for the following 2 turns';
			game.AttackCommand.call(_command, owner, value, description, cost);
			_setVitals();

		};

		_setVitals = function() {
			_command.KOTurns = 1;
			_command.damage = 20;
		}


		_initalize(owner); //Call Constructor
	};

	TauntCommand.prototype = Object.create(game.AttackCommand.prototype);

	game.TauntCommand = TauntCommand; //Add to global Namespace
})();