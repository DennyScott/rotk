(function() {
	var game = window.game || {};
	
	/**
	 * A Defence Command is a card that usually destroys or negates attacking cards, as well as maybe doing some other small effects
	 * @param {Player} owner        The owner of this command
	 * @param {string} value        The value of the card, such as taunt
	 * @param {strin} description  The description of the given card
	 */
	var RefuteCommand = function(owner) {
		var _command = this;

		/**
		 * Initalizes the object
		 * @param {Player} owner        The owner of this command
		 * @return {Void}                 No Return value
		 */
		var _initalize = function(owner) {
			var value ='Refute';
			var cost = 25;
			var description = 'A Defence command that will prevent any Attack command your opponent plays while in your hand, as well as counter that Attack command back at your opponent.  Playing this card as a regular command will destroy all Defence cards your opponent is currently holding in hand';
			game.DefenceCommand.call(_command, owner, value, description, cost);
		};

		_initalize(owner); //Call Constructor

		this.combatAction = function() {
			this.owner.opponent.removeAllAttackCards();
		};

		this.nonCombatAction = function(card) {
			card.owner = this.owner;
			card.combatAction();
			card.owner = this.owner.opponent;
		};
	};

	RefuteCommand.prototype = Object.create(game.DefenceCommand.prototype);

	game.RefuteCommand = RefuteCommand; //Add to global Namespace
})();