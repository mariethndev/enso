const characters = [
  {
    id: 1,
    name: "Sauron",
    image:"chevalier_feu.jpg",
    health:100,
    health_max:100,
    power:25, 
    nb_potions:1
  },
  {
    id: 2,
    name: "Elliot",
    image:"dragon.jpg",
    health:150,
    health_max:150,
    power:22, 
    nb_potions:2
  },
  {
    id: 3,
    name: "Dudulle",
    image:"magicienne.jpg",
    health:80,
    health_max:80,
    power:20, 
    nb_potions:5
  },
  {
    id: 4,
    name: "Kikisan",
    image:"sorcier.jpg",
    health:75,
    health_max:75,
    power:22, 
    nb_potions:5
  },
  {
    id: 5,
    name: "Legolas",
    image:"elfe.jpg",
    health:90,
    health_max:90,
    power:18, 
    nb_potions:10
  },
];

// console.table(characters);

function selectCharacter(text) {
  let choice = null;

  while (choice === null) {
    const response = prompt(
      text +
        " quel personnage souhaites-tu choisir ? \n1 - Sauron\n2 - Elliot\n3 - Dudulle\n4 - Kikiksan\n5 - Legolas"
    );
    choice = parseInt(response);

    if (isNaN(choice) || choice < 1 || choice > 5) {
      alert("Choisir un nombre entre 1 et 5 !");
      choice = null;
    }
  }
  return choice;
}

let id_player_1;
let id_player_2;

function start() {
  id_player_1 = selectCharacter("Joueur 1 ")-1;
  id_player_2 = selectCharacter("Joueur 2 ")-1;
}

start();

// console.log("player 1 " + id_player_1)
// console.log("player 2 " + id_player_2)

let player_1 = characters[id_player_1];
let player_2 = characters[id_player_2];

// console.log(player_1.name)
// console.log(player_2.name)

// Manipulons norte DOM
// joueur 1
const img_player_1 = document.querySelector("#img_player_1");
img_player_1.src = player_1.image;
img_player_1.alt = player_1.name;
const nomJoueur1 = document.querySelector("#name_p1");
nomJoueur1.textContent = player_1.name;
const pvJoueur1 = document.querySelector("#health_p1");
pvJoueur1.textContent = player_1.health + " / " + player_1.health_max;
const forceJoueur1 = document.querySelector("#power_p1 ");
forceJoueur1.textContent = player_1.power;
const potionsJoueur1 = document.querySelector("#potions_p1");
potionsJoueur1.textContent = player_1.nb_potions;

const atkJoueur1 = document.querySelector("#atk_p1");
const soinJoueur1 = document.querySelector("#cure_p1");
// joueur 2
const img_player_2 = document.querySelector("#img_player_2");
img_player_2.src = player_2.image;
img_player_2.alt = player_2.name;
const nomJoueur2 = document.querySelector("#name_p2");
nomJoueur2.textContent = player_2.name;
const pvJoueur2 = document.querySelector("#health_p2");
pvJoueur2.textContent = player_2.health + " / " + player_2.health_max;
const forceJoueur2 = document.querySelector("#power_p2 ");
forceJoueur2.textContent = player_2.power;
const potionsJoueur2 = document.querySelector("#potions_p2");
potionsJoueur2.textContent = player_2.nb_potions;

const atkJoueur2 = document.querySelector("#atk_p2");
const soinJoueur2 = document.querySelector("#cure_p2");

// general
const infoAction = document.querySelector(".info_Action");
const infoGeneral = document.querySelector(".info_General");
const reset = document.querySelector(".reset");

// functions

function resetInfoAction() {
  setTimeout(() => {
    infoAction.textContent = "";
  }, 2500);
}

function toggleBtn() {
  const btns = [atkJoueur1, atkJoueur2, soinJoueur1, soinJoueur2];
  btns.forEach((btn) => {
    btn.classList.toggle("disabled");
  });
}

function fight(fighter, target) {
  target.health -= fighter.power;
  if (target.health <= 0) {
    target.health = 0;
    target === player_2
      ? (pvJoueur2.textContent = target.health + " / " + player_2.health_max)
      : (pvJoueur1.textContent = target.health + " / " + player_1.health_max);

      infoGeneral.textContent = fighter.name + " a gagné cette manche ! ";
      infoAction.textContent = "";

    setTimeout(() => {
      if (confirm("Souhaitez-vous refaire une partie ?")) {
        location.reload();
      }
    }, 300);
  } else {
    target === player_2
      ? (pvJoueur2.textContent = target.health + " / " + player_2.health_max)
      : (pvJoueur1.textContent = target.health + " / " + player_1.health_max);
      infoAction.textContent = fighter.name + " a retiré " + fighter.power + " PV à  " + target.name + " !"
  }
}

function cure(player) {
  //  si potions = 0
  if (player.nb_potions === 0) {
    infoAction.textContent = player.name + " n'a plus de potion !";
    resetInfoAction();
  } else {
    player.nb_potions -= 1;
    player === player_1
      ? (potionsJoueur1.textContent = player.nb_potions)
      : (potionsJoueur2.textContent = player.nb_potions);

    const soin = Math.round(player.health_max / 2);

    if (player.health + soin <= player.health_max) {
      player.health += soin;
    } else {
      player.health = player.health_max;
    }

    player === player_1
      ? (pvJoueur1.textContent = player.health + " / " + player_1.health_max)
      : (pvJoueur2.textContent = player.health + " / " + player_2.health_max);
    infoAction.textContent =
      player.name + " a pris une potion et récupère jusqu'à " + soin + " PV !";
    resetInfoAction();
  }

  // si potions > 0
}

// actions

atkJoueur1.addEventListener("click", () => {
  fight(player_1, player_2);
  toggleBtn();
});
soinJoueur1.addEventListener("click", () => {
  cure(player_1);
  toggleBtn();
});
atkJoueur2.addEventListener("click", () => {
  fight(player_2, player_1);
  toggleBtn();
});
soinJoueur2.addEventListener("click", () => {
  cure(player_2);
  toggleBtn();
});
reset.addEventListener("click", () => {
  location.reload();
});
