const btn1 = document.querySelector('button');

class MySpaceShip {
    constructor()
    {
        this.hull = 20;
        this.firePower = 5;
        this.accuracy = 0.7;
    }
}

class AlienShip {
    constructor()
    {
        this.hull = Math.floor(Math.random() * (6 - 3)) + 3;
    }
}

let test = new AlienShip();
console.log(test.hull);
