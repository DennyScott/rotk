(function() {

	/**
	 * Player Class
	 */
	var Player = function(name, x, y){
		var _player = this;
		var _name; //Players Name
		var _health; //Players Health
		var _text; //The Text Object to display

		/**
		 * Constructor
		 * @param  {String} name Players Name
		 * @param  {int} x    The X coordinate to place text at
		 * @param  {int} y    The Y coordinate to place text at
		 */
		var _initalize = function(name, x, y){
			_name = name;
			_health = 50;
			
			//Create Text Object
			_text = game.add.text(x, y, _createLabel(), {
				font: '40px Geo',
				fill: '#000000'
			})
		};

		/**
		 * Generate the label used to display the players current health
		 * @return {String} Users current health
		 */
		var _createLabel = function(){
			return name + "'s Health: " + _health;
		}

		this.isHoldingDefenceCard = function(){

		},

		this.removeDefenseCard = function() {
			
		}

		/**
		 * Get Players Health
		 * @return {int} Current Health
		 */
		this.health = function(){
			return _health;
		}

		/**
		 * Is the player at or below 0 health.
		 * @return {Boolean} Is the player at or below 0 health.
		 */
		this.isDead = function(){
			if(_health <= 0 ){
				return true
			}else{
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
		this.takeDamage = function(amount){
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
		this.heal = function(amount){
			_health += amount;
			_text.text = _createLabel(); //Display current health
			return _health;
		}


		_initalize(name, x, y); //Call constructor
	}

	game.player = Player; //Attach to global scope

})();