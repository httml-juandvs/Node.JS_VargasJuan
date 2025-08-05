const { MongoClient } = require('mongodb');
const prompt = require('prompt-sync')();
const camperMenu = require('./camper');
const trainerMenu = require('./trainer');
const adminMenu = require('./admin');
const { connectDB, closeDB } = require('./db');

const uri = 'mongodb+srv://juan:mwPQ4yUkFfjqwrzh@cluster0.m6jgk2t.mongodb.net/';
const dbName = 'Campuslands';

async function main() {
    let client;
    try {
        client = await connectDB(uri, dbName);
        let f = true;

        while (f) {
            console.log("Seleccione el perfil");
            console.log("1 para estudiantes || 2 para trainers || 3 para coordinador || 4 para salir");
            let x = parseInt(prompt(": "));

            if (x === 1) {
                await camperMenu(client);
            } else if (x === 2) {
                await trainerMenu(client);
            } else if (x === 3) {
                await adminMenu(client);
            } else if (x === 4) {
                f = false;
            } else {
                console.log("Opción inválida");
            }
        }
    } catch (error) {
        console.error("Error en la aplicación:", error);
    } finally {
        if (client) await closeDB(client);
        console.log("Cerrada la conexión a la base de datos");
    }
}

main();