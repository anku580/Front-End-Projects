// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png'; //loads the enemy image;
    this.x = x; //locates the x coordinate
    this.y = y; //locates the y coordinate
    this.speed = Math.floor((Math.random() *200) * 2); // math.floor is used to covert any value in integer and math.random is used to get any decimal random value which gives random spped
};


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) { // this is the frame max-width , if enemies tries to go beyond this it comes back
        this.x = -80; // at this position
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) { //player class with the coordinates x and y
    this.x = x; // x coordinate of the player
    this.y = y; // y coordinate of the player
    this.sprite = 'images/char-boy.png'; //loads image of the player
};
var score = 0, //variable used to get the score
    highscore = 0;
Player.prototype.update = function() {
    if (this.y < 10) { // if player succesfully passes the enemies to get to the river its score get increased by one and restart function is called
        score += 1;
        var snd = new Audio("sound.mp3"); // buffers automatically when created
        snd.play();
        this.restart(); // called to start the game from the begining
    }
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(this.x - allEnemies[i].x) < 80 && Math.abs(this.y - allEnemies[i].y) < 80) { //logic behind the collision math.abs is used to get the abosolute value
            var snd = new Audio("sound1.mp3"); // buffers automatically when created
            snd.play();
            this.restart();
            if (score > highscore)
                highscore = score;
            score = 0;
        }
    }
    document.getElementById('scoreboard').innerHTML = "Score:" + score + " | High Score:" + highscore; // used to print the score
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keypress) { // this prototype is made to move the player upside down the screen
    if (keypress == 'left') {
        this.x -= 100; // if user press left key then player moves by 100 left from the current position
        if (this.x < 0) // this is used for the boundaries if player get close to the boundary , instead of
            this.x += 100; // going outside the frame add 100 to the current position
    } else if (keypress == 'up') {
        this.y -= 85;
        if (this.y < -20)
            this.x += 85;
    } else if (keypress == 'right') {
        this.x += 100;
        if (this.x > 400)
            this.x -= 100;
    } else if (keypress == 'down') {
        this.y += 85;
        if (this.y > 400)
            this.y -= 85;
    }

};
Player.prototype.restart = function() { //brings the player to the start position
    this.x = 200;
    this.y = 400;
};

var allEnemies = [ // arrays of all the enemies position
    new Enemy(0, 64),
    new Enemy(-50, 144),
    new Enemy(-20, 227)
];

var player = new Player(200, 400); // this is the variable named palyer inside object Player is created


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
