(function() {

	/**
	 * A Regular command, with is a command that is a color and a number
	 * @param {Player} owner the owner of this card
	 * @param {int} value The number value of the card
	 * @param {String} color The string value of the card, i.e. green ,red, or blue
	 */
	var RegularCommand = function(owner, value, color) {
		_command = this;
		this.color;
		
		/**
		 * Initalizes the regular command
		 * @param  {Player} owner The owner of this card
		 * @param  {int} value The int value of th card
		 * @param  {string} color The string color of this card, i.e. red, gree, or blue
		 * @return {void}       No Return Vslue
		 */
		var _initalize = function(owner, value, color) {
			var type = 'number';
			game.Command.call(_command, owner, type, value);
			_command.color = color;
		};

		_initalize(owner, value, color); //Call Constructor

		var _createView = _command.createView;

		/**
		 * Adds the card to the view
		 * @param {int} x The x position of the command
		 * @param {int} y The y positoon of the card
		 */
		this.createView = function (x, y) {
			var sprite = color.toLowerCase() + 'Command';
			_createView(x, y, sprite);
		}
	}

	RegularCommand.prototype = Object.create(game.Command.prototype);

	game.RegularCommand = RegularCommand; //Add to global Namespace
})();