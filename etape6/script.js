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
    col4.setAttribute("class", "col_number");
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
    for (const person of persons) {
        console.log(person);
    }
}
function doNewData() {
    const elt_nom = document.querySelector("#form_nom");
    const elt_prenom = document.querySelector("#form_prenom");
    const elt_points = document.querySelector("#form_points");

    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value);
    if (nom == "" || prenom == "" || Number.isNaN(points)) { window.alert("Formulaire incomplet") } else {
        doInsert(nom, prenom, points);
        persons.push(lignes, nom, prenom, points);
    }
    elt_nom.value = "";
    elt_prenom.value = "";
    elt_points.value = "";
}
function deleteRow() {
    if (lignes == 0) {
        window.alert("Tableau Vide");
        return;
    }
    const table = document.querySelector("#myTable");
    const colchkbox = table.querySelectorAll(".col_chkbox:input=checked");

    if (colchkbox.length == 0) {
        window.alert("select at least one row");
        return;
    }
    if (!confirm("Voulez-vous vraiment supprimer les lignes selectiones ?")) { return; }
    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");
    for (let i = rows.length - 1; i >= 0; i--) {

        const checkbox = rows[i].querySelector(
            ".col_chkbox input"
        );

        if (checkbox.checked) {

            const points = parseInt(rows[i].cells[3].innerText);

            total_points -= points;
            lignes--;

            rows[i].remove();

            persons.splice(i, 1);
        }
    }
    alert("Suppression effectuée avec succès !");
    updateSummary();
}


