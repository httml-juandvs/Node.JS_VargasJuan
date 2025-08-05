const prompt = require('prompt-sync')();
const { ObjectId } = require('mongodb');

async function camperMenu(client) {
    const db = client.db('Campuslands');
    const campersCollection = db.collection('campers');
    const notasCollection = db.collection('notas');
    let lie = true;

    while (lie) {
        let registro = prompt("1 para iniciar sesión || 2 para registrarse: ");
        if (registro === "1") {
            let nam = prompt("Ingrese el usuario (nombre): ");
            let id = prompt("Ingrese su ID: ");
            let camper = await campersCollection.findOne({ Nombre: nam, ID: id });

            if (camper) {
                console.log(`Bienvenido/a ${nam}`);
                let tru = true;
                while (tru) {
                    console.log("Presione 1 para ver tu información || 2 para ver tus notas || 3 para salir");
                    let inf = parseInt(prompt(": "));
                    if (inf === 1) {
                        console.log(`ID: ${camper.ID}, Nombre: ${camper.Nombre}, Apellido: ${camper.Apellido}, Dirección: ${camper.direccion}, Acudiente: ${camper.acudiente}, Celular: ${camper.telefonos.celular}, Teléfono fijo: ${camper.telefonos.fijo}, Estado: ${camper.estado}, Riesgo: ${camper.riesgo}, Ruta: ${camper.ruta}`);
                    } else if (inf === 2) {
                        let notas = await notasCollection.findOne({ Nombre: nam });
                        if (notas) {
                            for (let nota of notas.notas) {
                                console.log(nota);
                            }
                        } else {
                            console.log("No se encontraron notas para este camper");
                        }
                    } else if (inf === 3) {
                        tru = false;
                        lie = false;
                    }
                }
            } else {
                console.log("Usuario o ID incorrectos");
            }
        } else if (registro === "2") {
            let nombe = prompt("Ingrese el nombre: ");
            let ape = prompt("Ingrese el apellido: ");
            let dir = prompt("Ingrese la dirección: ");
            let acu = prompt("Ingrese el nombre del acudiente: ");
            let cel = prompt("Ingrese el teléfono celular: ");
            let fijo = prompt("Ingrese el teléfono fijo: ");
            let rutaaa = prompt("Ingrese la ruta a estudiar (1 Java || 2 NodeJS || 3 .Net): ");
            let idd = (await campersCollection.countDocuments() + 1).toString();
            let rutaa = rutaaa === "1" ? "Java" : rutaaa === "2" ? "NodeJS" : ".Net";

            await campersCollection.insertOne({
                ID: idd,
                Nombre: nombe,
                Apellido: ape,
                direccion: dir,
                acudiente: acu,
                telefonos: { celular: cel, fijo: fijo },
                estado: "Inscrito",
                riesgo: "Nulo",
                ruta: rutaa
            });
            console.log(`Su ID: ${idd}`);
        }
    }
}

module.exports = camperMenu;