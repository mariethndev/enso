<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Tableau JS</title>
</head>
<body>

    <div id="tableContainer"></div>

    <script>
    // 1. Récupérer la div où on va mettre le tableau
    const container = document.getElementById("tableContainer");

    // 2. Créer un tableau HTML
    const table = document.createElement("table");
    table.border = "1";

    // 3. Créer une ligne d’en-tête
    const headerRow = document.createElement("tr");

    const th1 = document.createElement("th");
    th1.textContent = "Nom";

    const th2 = document.createElement("th");
    th2.textContent = "Âge";

    // Ajouter les th dans la ligne
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);

    // Ajouter la ligne au tableau
    table.appendChild(headerRow);

    // 4. Ajouter quelques lignes de données
    const data = [
        { nom: "Alice", age: 25 },
        { nom: "Bob", age: 30 },
        { nom: "Charlie", age: 22 }
    ];

    // Pour chaque objet, créer une ligne
    data.forEach(person => {
        const row = document.createElement("tr");

        const tdNom = document.createElement("td");
        tdNom.textContent = person.nom;

        const tdAge = document.createElement("td");
        tdAge.textContent = person.age;

        row.appendChild(tdNom);
        row.appendChild(tdAge);

        table.appendChild(row);
    });

    // 5. Ajouter le tableau dans la div
    container.appendChild(table);

    </script>
</body>
</html>
