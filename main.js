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

    displayStats()
    {
        console.log(`Hero current stats:\nHull: ${this.hull}\n\nFirepower: ${this.firePower}\n\nAccuracy: ${this.accuracy}`);
    }

    decreaseHealth(damage) {
        this.hull -= damage;
    }

}

class AlienShip {
    constructor() {
        this.hull = Math.floor(Math.random() * (6 - 3)) + 3;
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

    displayStats()
    {
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

    //the moment we attack, decrease enemy health by the ship's firepower
    enemy.decreaseHealth(hero.getFirepower());


    if(enemy.getHull != 0 && Math.random() < enemy.getAccuracy())
    {
        console.log('You have been hit!');
        hero.decreaseHealth(enemy.firePower());
    }

   if(hero.getHull() > 0 && enemy.getHull() != 0)
   {
    while (hero.getHull() > 0) {
        enemy.decreaseHealth(hero.getFirepower()); //attack enemy ship
        console.log(`Enemy stats:\n${enemy.displayStats()}`);

        if (enemy.getHull() != 0 && Math.random() < enemy.getAccuracy()) //if enemy ship survives
        {

            hero.decreaseHealth(enemy.getFirepower());
            console.log(`Hero stats:\n${hero.displayStats()}`);
        } else {
            console.log('Enemy is weak. Attack!')
            enemy.decreaseHealth(hero.getFirepower());
            console.log(`Enemy stats:\n${enemy.displayStats()}`);
        }
    }

   }



}
