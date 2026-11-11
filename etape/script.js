"use strict";
var lignes = 0;
var total_points = 0;
function doInsertRowTable(num, nom, prenom, points) {
    const table = document.querySelector("#myTable");
    const row = document.createElement("tr");
    row.setAttribute("class", "row-item");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;
    col5.appendChild(checkbox);

    col1.setAttribute("class", "col_number");
    col4.setAttribute("class", "col_number col_points");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col5.setAttribute("class", "col_chkbox");
    row.append(col1, col2, col3, col4, col5);
    table.querySelector("tbody").appendChild(row);

}

const persons = [
    { num: 1, nom: "nom-1", prenom: "prenom-1", points: 5 },
    { num: 2, nom: "nom-2", prenom: "prenom-2", points: 10 },
    { num: 3, nom: "nom-3", prenom: "prenom-3", points: 15 }
];
function updateSummary() {
    const element_lignes = document.querySelector("#p1");
    const element_points = document.querySelector("#p3");

    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total des points = " + total_points;
}

function doInsert(nom, prenom, points) {
    doInsertRowTable(lignes + 1, nom, prenom, points);

    lignes++;
    total_points += points;

    updateSummary();
}



init();

function init() {
    // boucle for of vu dans le slide 44
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }

}
function consoleTableau() {
    console.log(persons); // Affiche le tableau global d'un coup, plus propre et conforme au TP
}
function doNewData() {
    const elt_nom = document.querySelector("#form_nom");
    const elt_prenom = document.querySelector("#form_prenom");
    const elt_points = document.querySelector("#form_points");

    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value);

    if (nom == "" || prenom == "" || Number.isNaN(points)) {
        alert("Formulaire incomplet");
        return;
    }

    lignes++;

    persons.push({
        num: lignes,
        nom: nom,
        prenom: prenom,
        points: points
    });

    doInsertRowTable(lignes, nom, prenom, points);

    total_points += points;
    updateSummary();

    elt_nom.value = "";
    elt_prenom.value = "";
    elt_points.value = "";
}
function deleteRow() {
    if (lignes == 0) {
        alert("le tableau est vide");
        return;
    }

    const table = document.querySelector("#myTable");

    const chkboxcol = table.querySelectorAll(
        ".col_chkbox input[type='checkbox']:checked"
    );

    if (chkboxcol.length == 0) {
        alert("selectionnez au moins une ligne");
        return;
    }

    if (!confirm("voulez vous vraiment supprimer cette/ces ligne(s) ?")) {
        return;
    }

    const rows = table.querySelectorAll("tbody tr");

    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");

        if (checkbox.checked) {
            const points = parseInt(
                row.querySelector(".col_points").textContent
            );

            total_points -= points;
            lignes--;

            persons.splice(i, 1);
            row.remove();
        }
    }

    updateSummary();
}