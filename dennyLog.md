#Debate! -- Dennys Log
##October 27th, 2014
This isn't neccisarily my first game, but it is the first game in our 12 by 12. I'm sure Travis' post will be reiterating the goal, but we plan to make 12 games in 12 weeks together. I'm both excited for this journey, and cautious to not out-scope our capabilities. So without further udo, we'll chat about my first day of development.

As a warning before continuing on, since the first couple days will have a little stronger of game programming rather then design, I'll likely discuss design further in the week, and a lot of programming details early in the week. That isn't to say we haven't already talked about design. Next game we do, I'd like to post the notes we have when chatting about the design, I failed to do so this time. Later in the week will have more feedback for design, since we can actually play the game. I believe Travis will write more about the choices we made in design.

To start off, I slightly cheated my first day. I knew what we were going to do, and decided that I should build a seed project for Phaser the day before. This would include things like testing frameworks, outlines, task runners, etc. It's not a very thorough seed project, and I'll be adding to it a lot during each of our games. 

With that aside, I started today by jumping right into development. We decided to make a game based off a minigame from Romance of the Three Kingdoms 10. It doesn't have much animation, but a good deal of game logic. Seemed like a great place to start for two programmers. If you're interested in the specific logic of the game, I'm sure Travis will be chatting about it. If it's not in his log, I'm sure we'll have an overview at the end of the week (when your reading this).

I decided to handle the Game Board. I started by creating a Class called Board. A board object would hold 9 seperate sprites. Each of these sprites would be one of the 3x3 boxes in the game. All the boxes would then be placed into the 'outer board'. The goal was then to rotate the outer board, including it's child sprites along with it. Which led me to my first lesson. Though it might be a bit challenging to find, sprite's can house children with the method sprite.addChild(child). Any Child's coordinates are directly related to the parent sprite.

From there, I created Numbers for each square. This number would be placed inside the box. The number has this general look:

2, 9, 3 <br>
8, 1, 7 <br>
4, 6, 5

The box would then be turned 45 degrees, so the box looks like a diamond, with the 2 at the top. I completed adding this box by the end of the night, albeit some of the code is a little messy.

##October 28th, 2014
Today was a bit shorter of a day to work on the project. I refactored the Board object, and decided that having each tile has a variable was complicating the Board, and causing it to have code smell from the methods needed for the tiles, so there is now a tile class. Each tile is made from the class and holds the necessary values and methods. This cleaned up my code by a ton. It also allowed me to create a simple way to change the color of a tile, by using a function to pass in the color, and rendering the image of the tile to a new image.

I checked and found that using the sprite.loadTexture(img) to load a new image into the sprite isn't the most efficent way, but using a spritesheet for this seemed a bit of over kill. There isn't any high action sequences in this game. Heck, there's no middle action sequences in this game, so it shouldn't be a problem.

After I could switch the color, I added the functionality to handle a "card placement" in the board. The actual play state will handle the card placement, but if the card is a simple number card, it will pass that card into the board object. The board will then place the tile for the card, and check if that card causes any winning and losing combinations.

I first handled this with a simple combo counter, but decided that it probably is best to keep a JSON object of the winning and losing combinations, and instead now pass that back to the play state.

The biggest negative yet. I've been using mostly Test-Driven Development these days, but in my excitement to get coding a game, I've been finding myself just playing around, rather then starting with testing. I might try to refactor some of my code with tests, and then start TDD. If not, it certainly will be a learning lesson next time. I've found myself slowed down a couple times by not having correct testing.

The game is coming along well so far, other then the awkward bright blue background we're using. Hopefully it's in a playable state by tomorrow!