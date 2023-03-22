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
        this.firePower = Math.floor(Math.random() * (4 - 2)) + 2;
        this.accuracy = Math.floor(Math.random() * (0.8 - 0.6)) + 0.6;
    }

    //getters
    getHull()
    {
        return this.hull;
    }

    getFirepower()
    {
        return this.firePower;
    }

    getAccuracy()
    {
        return this.accuracy;
    }
}

class AlienShipFactory extends AlienShip{
    constructor()
    {
        super();
    }

    generateAlienShip()
    {
        let alienShip = new AlienShip();
    }
}

let test = new AlienShipFactory();
console.log()
