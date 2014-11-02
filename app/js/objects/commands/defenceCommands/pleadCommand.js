(function() {

	var game = window.game || {};
	
	/**
	 * A Defence Command is a card that usually destroys or negates attacking cards, as well as maybe doing some other small effects
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 */
	var PleadCommand = function(owner) {
		var _command = this;

		/**
		 * Initalizes the object
		 * @param {Player} owner        The owner of this command
		 * @return {Void}                 No Return value
		 */
		var _initalize = function(owner) {
			var value ='Plead';
			var cost = 15;
			var description = 'A Defence command that prevents an "Attack" command while in your hand.  If played as a regular command, it will destroy a single refute or plead card of your opponents if it is currently in his/her hand';
			game.DefenceCommand.call(_command, owner, value, description, cost);
		};

		_initalize(owner); //Call Constructor

		this.combatAction = function() {
			this.owner.opponent.removeCardsOfType([game.PleadCommand, game.RefuteCommand]);
		};
		this.nonCombatAction = function() {
		};
	};

	PleadCommand.prototype = Object.create(game.DefenceCommand.prototype);

	game.PleadCommand = PleadCommand; //Add to global Namespace
})();