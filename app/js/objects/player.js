(function() {

	/**
	 * Player Class
	 */
	var Player = function(name) {
		var _this = this;
		var _name; //Players Name
		var _health; //Players Health
		var _text; //The Text Object to display
		this.opponent;
		this.hand;

		/**
		 * Constructor
		 * @param  {String} name Players Name
		 * @param  {int} x    The X coordinate to place text at
		 * @param  {int} y    The Y coordinate to place text at
		 */
		var _initalize = function(name) {
			_name = name;
			_health = 50;
			_this.hand = [];
			_this.deck = [];

		};

		var _createView = function(command, i) {
			command.createView(0, 0);
		}

		/**
		 * Generate the label used to display the players current health
		 * @return {String} Users current health
		 */
		var _createLabel = function() {
			return name + "'s Health: " + _health;
		}

		var _createVisibleCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				_createView(_this.hand[i], i);
			}

			_killAllCards();
		};

		var _drawCard = function() {
			var randNum = game.rnd.integerInRange(0, _this.deck.length - 1);

			//This line will remove a card from the deck, and put it into your hand
			_this.hand.push(_this.deck[randNum]);

			_this.deck.splice(randNum, 1)
		}

		var _drawInitalCards = function() {
			while (_this.hand.length < game.global.fullHand) {
				_drawCard();
			}
		}

		var _killAllCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				_this.hand[i].view().kill();
			}
		}

		var _setKeyOnCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				_this.hand[i].handKey = i;
			}
		};

		this.createView = function(x, y) {
			//Create Text Object
			_text = game.add.text(x, y, _createLabel(), {
				font: '40px Geo',
				fill: '#000000'
			});
		}

		/**
		 * Check if the player is currently holding a defence card. The defence card
		 * cannot be in the procces of 'being played' this turn.
		 *
		 * @return {Boolean} Player is holding defence card?
		 */
		this.isHoldingDefenceCard = function() {
			//Must check if the player played this defence card this turn
		},

		/**
		 * Use the defence card that the player is currently holding.
		 *
		 */
		this.useDefenseCard = function() {

		}

		/**
		 * Get Players Health
		 * @return {int} Current Health
		 */
		this.health = function() {
			return _health;
		}

		/**
		 * Is the player at or below 0 health.
		 * @return {Boolean} Is the player at or below 0 health.
		 */
		this.isDead = function() {
			if (_health <= 0) {
				return true
			} else {
				return false;
			}
		}

		/**
		 * Get the width of the _text object.
		 * @return {int} Current width of the object
		 */
		this.getWidth = function() {
			return _text.width;
		}

		/**
		 * Get the Height of the _text object
		 * @return {int} Current height of the object.
		 */
		this.getHeight = function() {
			return _text.height;
		}

		/**
		 * Player takes damage, reducing the number from the
		 * health, then displaying.
		 *
		 * @param  {int} amount Damage to reduce from health.
		 * @return {int}        Return current health after damage.
		 */
		this.takeDamage = function(amount) {
			_health -= amount;
			_text.text = _createLabel(); //Display Current Health
			return _health;
		}

		/**
		 * Player recieves health, increasing their health by the number
		 * passed.
		 *
		 * @param  {int} amount Health to increase to health.
		 * @return {int}        Return current health after heal.
		 */
		this.heal = function(amount) {
			_health += amount;
			_text.text = _createLabel(); //Display current health
			return _health;
		}

		this.prepare = function() {
			_drawInitalCards();
			_setKeyOnCards();
			_createVisibleCards();


		}


		_initalize(name); //Call constructor
	}

	game.player = Player; //Attach to global scope

})();