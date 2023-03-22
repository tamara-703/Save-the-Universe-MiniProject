const btn = document.querySelector('.nameBox');

btn.addEventListener('click', attack) //on click event we attack

class MySpaceShip {
    constructor() {
        this.hull = 20;
        this.firePower = 5;
        this.accuracy = 0.7;
    }

    getHull() {
        return this.hull;
    }

    getFirepower() {
        return this.firePower;
    }

    getAccuracy() {
        return this.accuracy;
    }

    displayStats() {
        console.log(`Hero current stats:\nHull: ${this.hull}\n\nFirepower: ${this.firePower}\n\nAccuracy: ${this.accuracy}`);
    }

    decreaseHealth(damage) {
        this.hull -= damage;
    }

}

class AlienShip {
    constructor() {
        this.hull = Math.floor(Math.random() * (20 - 3)) + 3;
        this.firePower = Math.floor(Math.random() * (4 - 2)) + 2;
        this.accuracy = Math.floor(Math.random() * (0.8 - 0.6)) + 0.6;
    }

    //getters
    getHull() {
        return this.hull;
    }

    getFirepower() {
        return this.firePower;
    }

    getAccuracy() {
        return this.accuracy;
    }

    displayStats() {
        console.log(`Enemy current stats:\nHull: ${this.hull}\n\nFirepower: ${this.firePower}\n\nAccuracy: ${this.accuracy}`);
    }

    decreaseHealth(damage) {
        this.hull -= damage;
    }
}

// class AlienShipFactory {

//     generateAlienShip()
//     {
//         let alienShip = new AlienShip();
//     }
// }



//function attack
function attack() {
    let hero = new MySpaceShip();
    let enemy = new AlienShip();

    //display initial stats
    hero.displayStats();
    enemy.displayStats();

    enemy.decreaseHealth(hero.getFirepower());

    if (enemy.getHull() > 0 && Math.random() < enemy.getAccuracy()) {
        console.log('You have been hit!');
        hero.decreaseHealth(enemy.getFirepower()); //decrease hero hull based on the enemy's firepower
        console.log(hero.getHull());
        console.log(enemy.getHull());
        if (hero.getHull() > 0) {
            console.log('Attack!')
            enemy.decreaseHealth(hero.getFirepower())
            console.log(hero.getHull());
            console.log(enemy.getHull());
            if (enemy.getHull() < 0) {
                console.log("You won!")
            } else {
                console.log("Attack")
                enemy.decreaseHealth(hero.getFirepower())
                console.log(hero.getHull());
                console.log(enemy.getHull());
            }
        }
    }


}
