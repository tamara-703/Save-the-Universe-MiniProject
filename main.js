const btn = document.querySelector('.nameBox');

btn.addEventListener('click', attack) //on click event we attack

class Spaceship {
    constructor(hull, firePower,accuracy)
    {
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy
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

    decreaseHealth(damage)
    {
        this.hull -= damage;
    }

}


class MySpaceShip extends Spaceship{
    constructor() {
        super(20,5,0.7)
        this.retreat = false;
    }


    displayStats() {
        console.log(`Hero current stats:\nHull: ${super.hull}\n\nFirepower: ${super.firePower}\n\nAccuracy: ${super.accuracy}`);
    }

    isRetreat(rt) //create user input here using DOM
    {
        if(rt === true)
        {
            this.retreat = rt;
            console.log("Successfully retreated.");
        } else
        {
            console.log("Onto the next fight");
        }
    }

}

class AlienShip extends Spaceship {

    constructor() {

        let hull = Math.floor(Math.random() * (20 - 3)) + 3;
        let firePower = Math.floor(Math.random() * (4 - 2)) + 2;
        let accuracy = Math.floor(10 * (Math.random() * (0.8 - 0.6) + 0.6))/10;

        super(hull,firePower,accuracy);

    }

    displayStats() {
        console.log(`Enemy current stats:\nHull: ${super.hull}\n\nFirepower: ${super.firePower}\n\nAccuracy: ${super.accuracy}`);
    }
}

// class AlienShipFactory{

//     constructor()
//     {
//         this.shipArray = [];
//     }

//     generateAlienShip()
//     {
//         let alienShip = new AlienShip();
//         this.shipArray.push(alienShip);
//     }

//     getHull() {
//         return this.shipArray[0].hull;
//     }

//     getFirepower() {
//         return this.shipArray[0].firePower;
//     }

//     getAccuracy() {
//         return this.shipArray[0].accuracy;
//     }

//     decreaseHealth(damage)
//     {
//         if(this.shipArray[0].hull > 0)
//         {
//             console.log("Enemy ship attacked");
//             this.shipArray[0].hull -= damage;
//             console.log(`Enemy stats: ${this.shipArray[0].hull}`);
//         } else
//         {
//             console.log("Enemy ship is defeated");
//             console.log(`Enemy stats: ${this.shipArray[0].hull}`);
//         }
//     }

//     checkAccuracy()
//     {
//         if(Math.random() < this.shipArray[0].accuracy)
//         {
//             if(this.shipArray[0].hull > 0)
//             {
//                 console.log("You have been hit!");
//             }

//         }
//     }

// }



//function attack


function attack() {


    for(let i = 0; i < 6; i++)
    {
        let hero = new MySpaceShip();
        let enemy = new AlienShip();

        if(hero.getHull() > 0 && enemy.getHull() > 0)
        {
            enemy.decreaseHealth(hero.getFirepower());
            console.log("Attacked enemy. Do you want to retreat?")
            hero.isRetreat(false);
        }



    }



    // enemy.decreaseHealth(hero.getFirepower());

    // if (enemy.getHull() > 0 && Math.random() < enemy.getAccuracy()) {
    //     console.log('You have been hit!');
    //     hero.decreaseHealth(enemy.getFirepower()); //decrease hero hull based on the enemy's firepower
    //     console.log(hero.getHull());
    //     console.log(enemy.getHull());
    //     if (hero.getHull() > 0) {
    //         console.log('Attack!')
    //         enemy.decreaseHealth(hero.getFirepower())
    //         console.log(hero.getHull());
    //         console.log(enemy.getHull());
    //         if (enemy.getHull() < 0) {
    //             console.log("You won!")
    //         } else {
    //             console.log("Attack")
    //             enemy.decreaseHealth(hero.getFirepower())
    //             console.log(hero.getHull());
    //             console.log(enemy.getHull());
    //         }
    //     }
    // }


}
