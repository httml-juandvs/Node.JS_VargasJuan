const prompt = require('prompt-sync')();

function showMenu() {
    console.log("\n=== CRUD en consola con Node.js ===");
    console.log("1. Crear Persona");
    console.log("2. Listar Personas");
    console.log("3. Actualizar Persona");
    console.log("4. Eliminar Persona");
    console.log("5. Salir\n");
    return prompt("Selecciona una opción: ");
}

function askName() {
    return prompt("Ingresa un nombre: ");
}

function askId(action) {
    return prompt(`Ingresa el ID de la Persona a ${action}: `);
}

function showList(data) {
    console.log("\n=== Lista de Personas ===");
    if (data.length === 0) {
        console.table("No hay Personas.");
    } else {
        data.forEach((item, index) => {
            console.table(`${index + 1}. ID: ${item.id}, Nombre: ${item.nombre}`);
        });
    }
}

function showMessage(msg) {
    console.log(msg);
}

module.exports = { showMenu, askName, askId, showList, showMessage };
