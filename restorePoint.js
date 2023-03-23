const heroBtn = document.querySelector('.nameBox');
const enemyBtn = document.querySelector('#enemyBox');
const attackBtn = document.querySelector('.attack-btn');

const parent = document.querySelector(".retreatOption");
const yesOption = document.createElement('button');
const noOption = document.createElement('button');

parent.style.display = 'none';

// heroBtn.addEventListener('click', attack) //on click event we attack
attackBtn.addEventListener('click', attack);


enemyBtn.addEventListener('click', generateAlienShip);

function generateAlienShip()
{
    const factory = new AlienShipFactory();
    factory.generateAlienShip();

    const child = document.querySelector('.enemyStats');

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

    let hero = new MySpaceShip();
    const factory = generateAlienShip();

    let retreat = false;
    let isHit = false;

    if (hero.getHull() > 0 && factory.shipArray[0].getHull() > 0) {
        factory.shipArray[0].decreaseHealth(hero.getFirepower()); //attack enemy ship
        window.alert(`Attacked enemy!\nHero hull: ${hero.getHull()}\nEnemy hull: ${factory.shipArray[0].getHull()}`)
    }

    if (factory.shipArray[0].getHull() > 0) {

        parent.style.display = 'block';
        parent.textContent = 'Enemy is still alive. Do you want to retreat?';

        parent.setAttribute('class','retreatBox');
        yesOption.setAttribute('class','yes-btn');
        noOption.setAttribute('class','no-btn');

        yesOption.textContent = 'YES';
        noOption.textContent = 'NO';

        parent.appendChild(yesOption);
        parent.appendChild(noOption);

        yesOption.addEventListener('click',() =>
        {
            retreat = true;
            window.alert('Retreating!');
            location.reload();
        }
        )

        noOption.addEventListener('click',function(event)
        {
            window.alert('Let us continue the fight!');

            parent.style.display = 'none';

            if(factory.shipArray[0].getHull() <= 0)
            {
                window.alert("Wait. We already won! Flying to victory!")
                location.reload();
            } else if (retreat === false && factory.shipArray[0].getHull() > 0) {
                console.log("You heard him men. Charge!");
                isHit = factory.shipArray[0].checkAccuracy();
                if (isHit === true) {
                    hero.decreaseHealth(factory.shipArray[0].getFirepower());
                    console.log(`Hero hull: ${hero.getHull()}`);
                    console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
                    //parent.style.visibility = 'visible';
                } else {
                    factory.shipArray[0].decreaseHealth(hero.getFirepower());
                    console.log(`Hero hull: ${hero.getHull()}`);
                    console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
                    // parent.style.visibility = 'visible';
                }
            }
        })

    }



    if (factory.shipArray[0].getHull() <= 0) {
        console.log("We won!")
    }


    // for (let i = 0; i < factory.shipArray[0].getHull(); i++) {
    //     isHit = factory.shipArray[0].checkAccuracy();
    //     if (isHit === true) {
    //         hero.decreaseHealth(factory.shipArray[0].getFirepower());
    //         console.log(`Hero hull: ${hero.getHull()}`);
    //         console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
    //     } else {
    //         factory.shipArray[0].decreaseHealth(hero.getFirepower());
    //         console.log(`Hero hull: ${hero.getHull()}`);
    //         console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
    //     }

    // }
    // for (let i = 0; i < 6; i++) {




    //     console.log(`***********************FIGHT NUMBER ${i + 1}***************************`)
    //     hero.displayStats();
    //     factory.shipArray[0].displayStats();

    //     for (let i = 0; i < factory.shipArray[0].getHull(); i++) {
    //         if (hero.getHull() > 0 && factory.shipArray[0].getHull() > 0) {
    //             factory.shipArray[0].decreaseHealth(hero.getFirepower()); //attack enemy ship
    //             console.log("Attacked enemy!")
    //             console.log(`Hero hull: ${hero.getHull()}`);
    //             console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
    //         }

    //         if (factory.shipArray[0].getHull() > 0) {
    //             console.log("Enemy is still alive. Do you want to retreat?") //add an alive boolean?
    //             retreat = hero.isRetreat(false);
    //         }

    //         if (retreat === true) {
    //             console.log("Retreating!")
    //             break;
    //         } else if (retreat === false && factory.shipArray[0].getHull() > 0) {
    //             for (let i = 0; i < factory.shipArray[0].getHull(); i++) {
    //                 isHit = factory.shipArray[0].checkAccuracy();
    //                 if (isHit === true) {
    //                     hero.decreaseHealth(factory.shipArray[0].getFirepower());
    //                     console.log(`Hero hull: ${hero.getHull()}`);
    //                     console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
    //                 } else {
    //                     factory.shipArray[0].decreaseHealth(hero.getFirepower());
    //                     console.log(`Hero hull: ${hero.getHull()}`);
    //                     console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
    //                 }

    //             }

    //         }
    //     }


    // }

}
