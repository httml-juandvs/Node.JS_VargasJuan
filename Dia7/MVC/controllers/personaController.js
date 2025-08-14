const { loadData, saveData } = require('../models/personaModel');
const { showMenu, askName, askId, showList, showMessage } = require('../views/menuView');

function createItem() {
    const nombre = askName();
    const id = Date.now();
    const data = loadData();
    data.push({ id, nombre });
    saveData(data);
    showMessage("Persona agregada.");
}

function listItems() {
    const data = loadData();
    showList(data);
}

function updateItem() {
    const data = loadData();
    listItems();
    const id = askId("actualizar");
    const index = data.findIndex(item => item.id == id);

    if (index !== -1) {
        data[index].nombre = askName();
        saveData(data);
        showMessage("Persona actualizada.");
    } else {
        showMessage("Persona no encontrada.");
    }
}

function deleteItem() {
    const data = loadData();
    listItems();
    const id = askId("eliminar");
    const index = data.findIndex(item => item.id == id);

    if (index !== -1) {
        data.splice(index, 1);
        saveData(data);
        showMessage("Persona eliminada.");
    } else {
        showMessage("Persona no encontrada.");
    }
}

function handleMenu(option) {
    switch (option) {
        case "1": createItem(); break;
        case "2": listItems(); break;
        case "3": updateItem(); break;
        case "4": deleteItem(); break;
        case "5": return false;
        default: showMessage("Opción inválida.");
    }
    return true;
}

module.exports = { handleMenu };
