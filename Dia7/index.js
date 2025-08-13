const prompt= require('prompt-sync')();//Entradas por consola
const path = "./db.json";//Direccionar hacia la base de datos
const fs= require('fs');//Manejo de Archivos Locales

//Modularización de Carga de la Data
function loadData(){
    if(!fs.existsSync(path)){
        fs.writeFileSync(path,"[]");
    };// Creo el archivo con data si no existe.
    const data = fs.readFileSync(path);//Cargo y Guardo la data en una variable
    return JSON.parse(data);//Retorno la data en formato JSON
}
function saveData(data){
    fs.writeFileSync(path,JSON.stringify(data));
}
function showMenu() {
  console.log("\n=== CRUD en consola con Node.js ===");
  console.log("1. Crear Persona");
  console.log("2. Listar Personas");
  console.log("3. Actualizar Persona");
  console.log("4. Eliminar Persona");
  console.log("5. Salir\n");

  let opcionUsuario = prompt("Selecciona una opción: ");
  return opcionUsuario;
}

function handleMenu(option) {
  switch (option) {
    case "1":
      createItem();
      break;
    case "2":
      listItems();
      break;
    case "3":
      updateItem();
      break;
    case "4":
      deleteItem();
      break;
    case "5":
      booleanito = false;
      break;
    default:
      console.log("Opción inválida.");
  }
}

function createItem(){
    let nombre = prompt("Ingresa un nombre: ");
    const id = Date.now();// ID Unico (Paso de milisegundos desde el 1 de Enero de 1970)
    const data = loadData();
    data.push({
        id,nombre
    });
    saveData(data);
    console.log("La Persona fue agregado!");
    showMenu();
}
let booleanito = true;

function ReadItem(){
    let id
}

while(booleanito){
    let opcionUsuario= showMenu();
    handleMenu(opcionUsuario);
}

function listItems() {
    const data = loadData();
    console.log("\n=== Lista de Personas ===");
    if (data.length === 0) {
        console.log("No hay Personas.");
    } else {
        data.forEach((item, index) => {
            console.log(`${index + 1}. ID: ${item.id}, Nombre: ${item.nombre}`);
        });
    }
} 

function updateItem() {
    const data = loadData();
    listItems();
    let id = prompt("Ingresa el ID del Persona a actualizar: ");
    const index = data.findIndex(item => item.id == id);

    if (index !== -1) {
        let nuevoNombre = prompt("Ingresa el nuevo nombre: ");
        data[index].nombre = nuevoNombre;
        saveData(data);
        console.log(" Persona actualizado.");
    } else {
        console.log(" Persona no encontrado.");
    }
}

function deleteItem() {
    const data = loadData();
    listItems();
    let id = prompt("Ingresa el ID de la Persona a eliminar: ");
    const index = data.findIndex(item => item.id == id);

    if (index !== -1) {
        data.splice(index, 1);
        saveData(data);
        console.log(" Persona eliminado.");
    } else {
        console.log(" Persona no encontrado.");
    }
}