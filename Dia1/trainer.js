const prompt = require('prompt-sync')();
const { ObjectId } = require('mongodb');

async function trainerMenu(client) {
    const db = client.db('Campuslands');
    const trainersCollection = db.collection('trainer');
    const campersCollection = db.collection('campers');
    const notasCollection = db.collection('notas');
    let lie = true;

    while (lie) {
        let nam = prompt("Ingrese el usuario (nombre): ");
        let id = prompt("Ingrese su ID: ");
        let trainer = await trainersCollection.findOne({ Nombre: nam, ID: id });

        if (trainer) {
            console.log(`Bienvenido ${nam}`);
            let tru = true;
            while (tru) {
                console.log("¿Qué te gustaría hacer?");
                console.log("1 para ver tu información || 2 para ver tus grupos || 3 para ver estudiantes || 4 para calificar estudiantes || 5 para salir");
                let inf = parseInt(prompt(": "));
                if (inf === 1) {
                    console.log(`ID: ${trainer.ID}, Nombre: ${trainer.Nombre}, Apellido: ${trainer.Apellido}, Ruta: ${trainer.Ruta}`);
                } else if (inf === 3) {
                    let campers = await campersCollection.find().toArray();
                    campers.forEach((camper, i) => {
                        console.log(`Estudiante ${i + 1} ID: ${camper.ID}, Nombre: ${camper.Nombre}, Apellido: ${camper.Apellido}, Dirección: ${camper.direccion}, Acudiente: ${camper.acudiente}, Celular: ${camper.telefonos.celular}, Teléfono fijo: ${camper.telefonos.fijo}, Estado: ${camper.estado}, Riesgo: ${camper.riesgo}`);
                    });
                } else if (inf === 4) {
                    let estu = prompt("Ingrese el ID del estudiante a calificar: ");
                    let notas = await notasCollection.findOne({ ID: estu });
                    if (notas) {
                        for (let q = 0; q < 12; q++) {
                            let b = q.toString();
                            let c = notas.notas[q][b][0].Nombre;
                            console.log(`Presione ${q + 1} para calificar ${c}`);
                        }
                        let nota = parseInt(prompt(": ")) - 1;
                        let nota1 = nota.toString();
                        let proyec = parseInt(prompt("Nota del proyecto: "));
                        let filtro = parseInt(prompt("Nota del filtro: "));
                        let traba = parseInt(prompt("Nota de los trabajos: "));
                        let estao = proyec * 0.6 + filtro * 0.3 + traba * 0.1;

                        let updateFields = {};
                        updateFields[`notas.${nota}.${nota1}.0.Proyecto`] = proyec;
                        updateFields[`notas.${nota}.${nota1}.0.Filtro`] = filtro;
                        updateFields[`notas.${nota}.${nota1}.0.Trabajos`] = traba;
                        updateFields[`notas.${nota}.${nota1}.0.Resultado`] = estao;

                        await notasCollection.updateOne({ ID: estu }, { $set: updateFields });
                        let riesgo = estao < 60 ? "alto" : "Nulo";
                        await campersCollection.updateOne({ ID: estu }, { $set: { riesgo: riesgo } });
                    } else {
                        console.log("Estudiante no encontrado en notas");
                    }
                } else if (inf === 5) {
                    tru = false;
                    lie = false;
                }
            }
        } else {
            console.log("Usuario o ID incorrectos");
        }
    }
}

module.exports = trainerMenu;