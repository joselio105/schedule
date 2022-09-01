import createHtml from "./HtmlElement.js";

export default container => {
    const table = createHtml('table', { class: "schedule=week" });
    setTableHead(table);
    setTableLines(table);

    container.appendChild(table);
}

const setTableHead = table => {
    const row = createHtml('tr');
    const headCells = [
        createHtml('th', { text: "Hora" }),
        createHtml('th', { text: "Reserva" })
    ];

    headCells.forEach( cell => row.appendChild(cell));
    table.appendChild(row);
}

const setTableLines = table => {
    const hours = [
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00'
    ];

    hours.forEach( hour => {
        const row = createHtml('tr');
        const rowTitle = createHtml('th', { text: hour});
        const cell = createHtml('td', { id: hour });

        row.appendChild(rowTitle);
        row.appendChild(cell);

        table.appendChild(row);
    });


}