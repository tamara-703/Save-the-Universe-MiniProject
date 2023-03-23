const heroBtn = document.querySelector('.nameBox');
const enemyBtn = document.querySelector('#enemyBox')

heroBtn.addEventListener('click', attack) //on click event we attack

//enemyBtn.addEventListener('click',generateAlienShip)


function generateAlienShip()
{
    const factory = new AlienShipFactory();
    factory.generateAlienShip();

    const child = document.querySelector('.enemyStats');
    console.log(child.childElementCount)

    child.textContent = `Hull: ${factory.shipArray[0].hull}\n
                              Firepower: ${factory.shipArray[0].firePower}\n
                              Accuracy: ${factory.shipArray[0].accuracy}`

    return factory;
}

class Spaceship {
    constructor(hull, firePower, accuracy) {
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

    decreaseHealth(damage) {
        if (this.hull > 0) {
            this.hull -= damage;
        } else {
            console.log("Ship already defeated.");
        }
    }

}


class MySpaceShip extends Spaceship {
    constructor() {
        super(20, 5, 0.7)
        this.retreat = false;
    }


    displayStats() {
        console.log(`Hero current stats:\nHull: ${this.hull}\n\nFirepower: ${this.firePower}\n\nAccuracy: ${this.accuracy}`);
    }

    isRetreat(rt) //create user input here using DOM
    {
        if (rt === true) {
            this.retreat = rt;
            return this.retreat;
        } else {
            console.log("Let us continue the fight!");
            return this.retreat;
        }


    }
}

class AlienShip extends Spaceship {
    constructor() {
        let hull = Math.floor(Math.random() * (20 - 3)) + 3;
        let firePower = Math.floor(Math.random() * (4 - 2)) + 2;
        let accuracy = Math.floor(10 * (Math.random() * (0.8 - 0.6) + 0.6)) / 10;

        super(hull, firePower, accuracy);

        this.isHeroHit = false;
    }

    displayStats() {
        console.log(`Enemy current stats:\nHull: ${this.hull}\n\nFirepower: ${this.firePower}\n\nAccuracy: ${this.accuracy}`);
    }

    checkAccuracy() {
        if (Math.random() < this.accuracy) {
            console.log("You have been hit!");
            this.isHeroHit = true;
            return this.isHeroHit;
        } else {
            console.log("We evaded the attack! Charge!")
            this.isHeroHit = false;
            return this.isHeroHit;
        }
    }

}


//AlienShip factory will generate an alien ship each time enemy button is clicked
class AlienShipFactory {
    constructor()
    {
        this.shipArray = [];
    }

    generateAlienShip()
    {
        const alienShip = new AlienShip();
        this.shipArray.push(alienShip);
    }
}


function attack() {

    const factory = generateAlienShip();
    

    for (let i = 0; i < 6; i++) {
        let hero = new MySpaceShip();
        let enemy = new AlienShip();
        let retreat = false;
        let isHit = false;

        console.log(`***********************FIGHT NUMBER ${i + 1}***********************`)
        hero.displayStats();
        enemy.displayStats();

        for (let i = 0; i < enemy.getHull(); i++) {
            if (hero.getHull() > 0 && enemy.getHull() > 0) {
                enemy.decreaseHealth(hero.getFirepower()); //attack enemy ship
                console.log("Attacked enemy!")
                console.log(`Hero hull: ${hero.getHull()}`);
                console.log(`Enemy hull: ${enemy.getHull()}`);
            }

            if (enemy.getHull() > 0) {
                console.log("Enemy is still alive. Do you want to retreat?") //add an alive boolean?
                retreat = hero.isRetreat(false);
            }

            if (retreat === true) {
                console.log("Retreating!")
                break;
            } else if (retreat === false && enemy.getHull() > 0) {
                for (let i = 0; i < enemy.getHull(); i++) {
                    isHit = enemy.checkAccuracy();
                    if (isHit === true) {
                        hero.decreaseHealth(enemy.getFirepower());
                        console.log(`Hero hull: ${hero.getHull()}`);
                        console.log(`Enemy hull: ${enemy.getHull()}`);
                    } else {
                        enemy.decreaseHealth(hero.getFirepower());
                        console.log(`Hero hull: ${hero.getHull()}`);
                        console.log(`Enemy hull: ${enemy.getHull()}`);
                    }

                }


            }
        }

        if (enemy.getHull() < 0) {
            console.log("We won!")
        }
    }

}






    //     if (enemy.getHull < 0) {
        //         console.log("You won! Onto the next fight")
        //     } else {
        //         console.log("Enemy is still alive. Do you want to retreat?") //add an alive boolean?
        //         retreat = hero.isRetreat(false);
        //     }

        //     if (retreat === true) {
        //         console.log("Retreating!")
        //         break;
        //     } else {
        //         if (hero.getHull() > 0 && enemy.getHull() > 0) {
        //             enemy.checkAccuracy();
        //             hero.decreaseHealth(enemy.getFirepower());
        //             console.log(`Hero hull: ${hero.getHull()}`);
        //             console.log(`Enemy hull: ${enemy.getHull()}`);
        //             //check retreat.

        //             if(enemy.getHull() > 0)
        //             {
        //             console.log("Retaliate in kind!");
        //             enemy.decreaseHealth(hero.getFirepower());
        //             console.log(`Hero hull: ${hero.getHull()}`);
        //             console.log(`Enemy hull: ${enemy.getHull()}`);
        //             console.log("Enemy is still alive. Do you want to retreat?") //add an alive boolean?
        //             retreat = hero.isRetreat(false);
        //             }

        //         }
        //     }

        // }




        // if(enemy.getHull == 0)
        // {
        //     console.log("You won!");
        //     console.log(`Hero hull: ${hero.getHull()}`);
        //     console.log(`Enemy hull: ${enemy.getHull()}`);
        // } else
        // {
        //     console.log("Ship is destroyed ...");
        //     console.log(`Hero hull: ${hero.getHull()}`);
        //     console.log(`Enemy hull: ${enemy.getHull()}`);
        // }











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
