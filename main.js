const heroBtn = document.querySelector('.nameBox');
const enemyBtn = document.querySelector('#enemyBox');
const attackBtn = document.querySelector('.attack-btn');

const child = document.querySelector('.enemyStats');
const displayStatsEl = document.querySelector('#display-info')
const parent = document.querySelector(".retreatOption");
const yesOption = document.createElement('button');
const noOption = document.createElement('button');


parent.style.display = 'none';
let aliens = []

//testing creating a random array of ships
// for(let i = 0; i < 6; i++)
// {
//     generateAlienShip();
// }
// console.log(aliens);

attackBtn.addEventListener('click', attack);

enemyBtn.addEventListener('click', generateAlienShip);

function generateAlienShip()
{
    const factory = new AlienShipFactory();
    factory.generateAlienShip();

    child.textContent = `Hull: ${factory.shipArray[0].hull}\n
                              Firepower: ${factory.shipArray[0].firePower}\n
                              Accuracy: ${factory.shipArray[0].accuracy}`

    aliens.push(factory);

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
        let hull = Math.floor(Math.random() * (10 - 3)) + 3;
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

    displayStatsEl.textContent = child.textContent;

    displayStatsEl.setAttribute('class','display-stats');


    let retreat = false;
    let isHit = false;

    if (hero.getHull() > 0 && factory.shipArray[0].getHull() > 0) {
        factory.shipArray[0].decreaseHealth(hero.getFirepower()); //attack enemy ship
        displayStatsEl.textContent = `Attacked enemy!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`;
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

                retreat = false;
                displayStatsEl.textContent = `Let us continue the fight!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`;

            if(factory.shipArray[0].getHull() <= 0)
            {
                alert(`Wait we already won!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`);
                location.reload();
            } else if (retreat === false && factory.shipArray[0].getHull() > 0) {
                displayStatsEl.textContent = `You heard him men! Charge!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`;
                isHit = factory.shipArray[0].checkAccuracy();
                if (isHit === true) {
                    hero.decreaseHealth(factory.shipArray[0].getFirepower());
                    displayStatsEl.textContent = `You have been hit!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`;
                    console.log(`Hero hull: ${hero.getHull()}`);
                    console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
                } else {
                    factory.shipArray[0].decreaseHealth(hero.getFirepower());
                    displayStatsEl.textContent = `We evaded the attack!!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`;
                    console.log(`Hero hull: ${hero.getHull()}`);
                    console.log(`Enemy hull: ${factory.shipArray[0].getHull()}`);
                }
            }
        })

    }

    if (factory.shipArray[0].getHull() <= 0) {
        displayStatsEl.textContent = `We won!\n\n\nHero hull: ${hero.getHull()}\n\n\nEnemy hull: ${factory.shipArray[0].getHull()}`;
    }


}
