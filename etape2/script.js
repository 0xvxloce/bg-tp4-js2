"use strict";
function DoInsertRowTable(num, nom, prenom, points) {
    const table = document.querySelector("#myTable");
    const row = document.createElement("tr");
    row.setAttribute("class", "row-item");

    const col1 = document.createElement(td);
    const col2 = document.createElement(td);
    const col3 = document.createElement(td);
    const col4 = document.createElement(td);
    const col5 = document.createElement(td);

    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;
    col1.setAttribute("class", "col_number");
    col4.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    row.append(col1, col2, col3, col4, col5);
    table.appendChild(row);

}