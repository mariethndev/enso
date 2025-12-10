 const characters =[
    {
        id:1,
        name:'Sauron',
        image : "https://cloud.ducompagnon.fr/uploads/users/51/51cb24e0-e122-4de3-b626-e5dbf919d779/images/personnages_rpg/chevalier_feu.jpg",
        health: 100,
        magie:19,
        power:25,
    },
    {
        id:2,
        name:'Elliot',
        image : "https://cloud.ducompagnon.fr/uploads/users/51/51cb24e0-e122-4de3-b626-e5dbf919d779/images/personnages_rpg/dragon.jpg",
        health: 200,
        magie:8,
        power:35,
    },
    {
        id:3,
        name:'Dudulle',
        image : "https://cloud.ducompagnon.fr/uploads/users/51/51cb24e0-e122-4de3-b626-e5dbf919d779/images/personnages_rpg/magicienne.jpg",
        health: 100,
        magie:57,
        power:25,
    },
    {
        id:4,
        name:'Kikisan',
        image : "https://cloud.ducompagnon.fr/uploads/users/51/51cb24e0-e122-4de3-b626-e5dbf919d779/images/personnages_rpg/sorcier.jpg",
        health: 100,
        magie:53,
        power:25,
    
    },
    {
        id:5,
        name:'Legolas',
        image : "https://cloud.ducompagnon.fr/uploads/users/51/51cb24e0-e122-4de3-b626-e5dbf919d779/images/personnages_rpg/elfe.jpg",
        health: 100,
        magie:32,
        power:25,
    }
]

// Sélectionne l'élément parent où tu veux ajouter les cartes
const section = document.querySelector("#container");

// test du lien avec les personnages
characters.forEach((character) => {
  console.log(character.name);
});

// Boucle à travers chaque personnage dans le tableau characters
characters.forEach((character) => {
  // Crée l'élément div avec la classe 'card'
  const cardElement = document.createElement("div");
  cardElement.classList.add("card"); // classList => add, remove, toggle, contains plus d'autres moins utilsées
  section.appendChild(cardElement); // Ajoute la carte à la section parent, plus exactement un noeud enfant à son parent

  // Crée l'élément image avec les attributs src, alt et la classe 'card-img'
  const imgElement = document.createElement("img");
  imgElement.src = character.image;
  imgElement.alt = character.name;
  imgElement.classList.add("card-img");
  cardElement.appendChild(imgElement);

  // Crée l'élément div avec la classe 'properties'
  const propertiesElement = document.createElement("div");
  propertiesElement.classList.add("properties");
  cardElement.appendChild(propertiesElement);

  // Crée l'élément h4 avec la classe 'name-character' et le nom du personnage
  const nameElement = document.createElement("h4");
  nameElement.classList.add("name-character");
  nameElement.textContent = character.name;
  propertiesElement.appendChild(nameElement);

  // Crée les éléments div avec la classe 'data' pour les propriétés
  const hpElement = createDataElement(
    "Points de Vie :",
    character.health + " PV"
  );
  propertiesElement.appendChild(hpElement);

  const mpElement = createDataElement(
    "Points de Magie :",
    character.magie + " PM"
  );
  propertiesElement.appendChild(mpElement);

  const forceElement = createDataElement("Force :", character.power + " Atk");
  propertiesElement.appendChild(forceElement);

  // Crée l'élément div avec la classe 'buttons'
  const buttonsElement = document.createElement("div");
  buttonsElement.classList.add("buttons");
  propertiesElement.appendChild(buttonsElement);




  // Nous voulons  :
  // 1) une interaction entre les boutons et la console
  // => identifier les boutons

  // 2) un personnage ne peut pas se soigner 2x consécutivement, il faut une atk entre 2
  // => rendre le btn "soigner" disabled

  // 3) qd le personnage se soigne, une petite animation sur l'écran

  // 4) le nb de pv augmente de 5

  // Crée les boutons 'Soigner'
  const healButton = createButton("Soigner");
  buttonsElement.appendChild(healButton);

  //  1  -  le btn exite déjà, on le récupère dans la boucle principale
  healButton.addEventListener("click", () => {
    console.log(character.name + " s'est soigné(e)");

    //  2 - on ne peut pas se soigner 2x d'affiler
    //donc une atk permet de réactiver le bouton de soin
    healButton.classList.add("disabled");

    //  3 - animation
    cardElement.classList.add("healed"); //animation au soin
    hpElement.style.color = "green";

    setTimeout(() => {
      cardElement.classList.remove("healed");
      hpElement.style.color = "#f1f1f1";
    }, 3500);

    // 4 - aug PV
    character.health += 5;
    console.log(character.health);
    const healthValueElement = hpElement.querySelector("p:last-child");
    healthValueElement.textContent = character.health + "PV";
  });

  // Crée les boutons 'Attaquer'
  const atkButton = createButton("Attaquer");
  atkButton.setAttribute("id", character.name + "Atk");
  atkButton.classList.add(character.name + "Atk");
  buttonsElement.appendChild(atkButton);

  atkButton.addEventListener("click", () => {
    //  1 - le btn exite déjà, on le récupère dans la boucle principale
    console.log(character.name + " a attaqué !");

    // 2  -  remettre btn soigner accessible
    healButton.classList.remove("disabled");
  });
});








// Fonction utilitaire pour créer un élément div avec la classe 'data'
function createDataElement(label, value) {
  const dataElement = document.createElement("div");
  dataElement.classList.add("data");

  // l'element p avec le label
  const labelElement = document.createElement("p");
  labelElement.textContent = label;
  dataElement.appendChild(labelElement);

  // l'element p avec la valeur
  const valueElement = document.createElement("p");
  valueElement.textContent = value;
  dataElement.appendChild(valueElement);

  return dataElement;
}

// Fonction utilitaire pour créer un bouton avec le texte donné
function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  return button;
}
