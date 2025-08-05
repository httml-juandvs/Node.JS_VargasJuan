const prompt = require('prompt-sync')();
const { ObjectId } = require('mongodb');

async function adminMenu(client) {
    const db = client.db('Campuslands');
    const adminCollection = db.collection('admin');
    const campersCollection = db.collection('campers');
    const trainersCollection = db.collection('trainer');
    const grupoCollection = db.collection('grupo');
    const notasCollection = db.collection('notas');
    let lie = true;

    while (lie) {
        let nam = prompt("Ingrese el usuario (nombre): ");
        let id = prompt("Ingrese su ID: ");
        let admin = await adminCollection.findOne({ Nombre: nam, ID: id });

        if (admin) {
            console.log(`Bienvenido/a ${nam}`);
            let tru = true;
            while (tru) {
                console.log("¿Qué desea hacer?");
                console.log("1 para ver información || 2 para editar información || 3 para añadir información || 4 para grupos || 5 para calificar estudiantes || 6 para módulo de reportes || 7 para salir");
                let inf = parseInt(prompt(": "));
                if (inf === 1) {
                    console.log("¿De cuál perfil quiere ver la información?");
                    console.log("1 para camper || 2 para trainers || 3 para coordinadores");
                    let infor = parseInt(prompt(": "));
                    if (infor === 1) {
                        let campers = await campersCollection.find().toArray();
                        campers.forEach((camper, i) => {
                            console.log(`Estudiante ${i + 1} ID: ${camper.ID}, Nombre: ${camper.Nombre}, Apellido: ${camper.Apellido}, Dirección: ${camper.direccion}, Acudiente: ${camper.acudiente}, Celular: ${camper.telefonos.celular}, Teléfono fijo: ${camper.telefonos.fijo}, Estado: ${camper.estado}, Riesgo: ${camper.riesgo}`);
                        });
                    } else if (infor === 2) {
                        let trainers = await trainersCollection.find().toArray();
                        trainers.forEach((trainer, i) => {
                            console.log(`Trainer ${i + 1} ID: ${trainer.ID}, Nombre: ${trainer.Nombre}, Apellido: ${trainer.Apellido}, Ruta: ${trainer.Ruta}`);
                        });
                    } else if (infor === 3) {
                        let admins = await adminCollection.find().toArray();
                        admins.forEach((admin, i) => {
                            console.log(`Coordinador ${i + 1} ID: ${admin.ID}, Nombre: ${admin.Nombre}`);
                        });
                    }
                } else if (inf === 2) {
                    console.log("¿De cuál perfil quiere editar información?");
                    console.log("1 para camper || 2 para trainers || 3 para coordinadores");
                    let infor = parseInt(prompt(": "));
                    if (infor === 1) {
                        let iddd = prompt("Ingrese el ID del estudiante a editar: ");
                        let nombe = prompt("Ingrese el nombre: ");
                        let ape = prompt("Ingrese el apellido: ");
                        let dir = prompt("Ingrese la dirección: ");
                        let acu = prompt("Ingrese el nombre del acudiente: ");
                        let cel = prompt("Ingrese el teléfono celular: ");
                        let fijo = prompt("Ingrese el teléfono fijo: ");
                        let estado = prompt("Ingrese el estado del estudiante: ");
                        let ries = prompt("Ingrese el riesgo del estudiante: ");
                        let rutaa = prompt("Ingrese la ruta del estudiante: ");
                        await campersCollection.updateOne(
                            { ID: iddd },
                            { $set: { Nombre: nombe, Apellido: ape, direccion: dir, acudiente: acu, telefonos: { celular: cel, fijo: fijo }, estado: estado, riesgo: ries, ruta: rutaa } }
                        );
                    } else if (infor === 2) {
                        let iddd = prompt("Ingrese el ID del trainer a editar: ");
                        let nombe = prompt("Ingrese el nombre: ");
                        let ape = prompt("Ingrese el apellido: ");
                        let rutaa = prompt("Ingrese la ruta: ");
                        await trainersCollection.updateOne(
                            { ID: iddd },
                            { $set: { Nombre: nombe, Apellido: ape, Ruta: rutaa } }
                        );
                    } else if (infor === 3) {
                        let iddd = prompt("Ingrese el ID del coordinador a editar: ");
                        let nombe = prompt("Ingrese el nombre: ");
                        await adminCollection.updateOne(
                            { ID: iddd },
                            { $set: { Nombre: nombe } }
                        );
                    }
                } else if (inf === 3) {
                    console.log("¿De cuál perfil quiere añadir información?");
                    console.log("1 para camper || 2 para trainers || 3 para coordinadores");
                    let infor = parseInt(prompt(": "));
                    if (infor === 1) {
                        let nombe = prompt("Ingrese el nombre: ");
                        let ape = prompt("Ingrese el apellido: ");
                        let dir = prompt("Ingrese la dirección: ");
                        let acu = prompt("Ingrese el nombre del acudiente: ");
                        let cel = prompt("Ingrese el teléfono celular: ");
                        let fijo = prompt("Ingrese el teléfono fijo: ");
                        let rutaaa = prompt("Ingrese la ruta del estudiante (1 Java || 2 NodeJS || 3 .Net): ");
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
                    } else if (infor === 2) {
                        let nombe = prompt("Ingrese el nombre: ");
                        let ape = prompt("Ingrese el apellido: ");
                        let rutaa = prompt("Ingrese la ruta del docente: ");
                        let idd = (await trainersCollection.countDocuments() + 1).toString();
                        await trainersCollection.insertOne({
                            ID: idd,
                            Nombre: nombe,
                            Apellido: ape,
                            Ruta: rutaa
                        });
                    } else if (infor === 3) {
                        let nombe = prompt("Ingrese el nombre: ");
                        let idd = (await adminCollection.countDocuments() + 1).toString();
                        await adminCollection.insertOne({
                            ID: idd,
                            Nombre: nombe
                        });
                    }
                } else if (inf === 4) {
                    let verdad = true;
                    while (verdad) {
                        console.log("Presione 1 para ver la información || 2 para editar || 3 para añadir || 4 para asignar estudiantes || 5 para salir");
                        let infor = parseInt(prompt(": "));
                        if (infor === 1) {
                            let grupos = await grupoCollection.find().toArray();
                            grupos.forEach((grupo, i) => {
                                console.log(`Grupo ${i + 1} Salón: ${grupo.salon}, Trainer: ${grupo.trainer}, Horario: ${grupo.horario}, Ruta: ${grupo.ruta}`);
                                console.log("Estudiantes:");
                                grupo.estudiantes.forEach((estu, j) => {
                                    console.log(`Estudiante ${j + 1} ${estu.Nombre}`);
                                });
                            });
                        } else if (infor === 2) {
                            let edit = parseInt(prompt("Ingrese el número del grupo a editar: ")) - 1;
                            let nombe = prompt("Ingrese el nombre del salón asignado: ");
                            let trainer = prompt("Ingrese el nombre del trainer asignado: ");
                            let horario = prompt("Ingrese el número del horario asignado: ");
                            let rutaa = prompt("Ingrese el número de la ruta asignada: ");
                            await grupoCollection.updateOne(
                                { _id: (await grupoCollection.find().toArray())[edit]._id },
                                { $set: { salon: nombe, trainer: trainer, horario: horario, ruta: rutaa } }
                            );
                        } else if (infor === 3) {
                            let salones = await db.collection('salones').find().toArray();
                            salones.forEach((s, i) => console.log(`${i + 1} para salón ${s.Nombre}`));
                            let nombe = salones[parseInt(prompt()) - 1].Nombre;
                            let train = prompt("Ingrese el id del trainer: ");
                            let trainer = (await trainersCollection.findOne({ ID: train })).Nombre;
                            let horario = prompt("Ingrese el número del horario: ");
                            let rutaaa = prompt("Ingrese el número de la ruta: ");
                            let rutaa = rutaaa === "1" ? "Java" : rutaaa === "2" ? "NodeJS" : ".Net";
                            await grupoCollection.insertOne({
                                salon: nombe,
                                trainer: trainer,
                                estudiantes: [],
                                horario: horario,
                                ruta: rutaa
                            });
                        } else if (infor === 4) {
                            let ingreso = prompt("Ingrese el ID del estudiante a añadir: ");
                            let camper = await campersCollection.findOne({ ID: ingreso });
                            if (camper) {
                                let grupos = await grupoCollection.find().toArray();
                                grupos.forEach((g, i) => {
                                    if (g.ruta === camper.ruta && g.estudiantes.length <= 33) {
                                        console.log(`Salón ${i + 1} disponible`);
                                    }
                                });
                                let sa = parseInt(prompt("Ingrese número del grupo: ")) - 1;
                                await grupoCollection.updateOne(
                                    { _id: grupos[sa]._id },
                                    { $push: { estudiantes: { Nombre: camper.Nombre } } }
                                );
                            }
                        } else if (infor === 5) {
                            verdad = false;
                        }
                    }
                } else if (inf === 5) {
                    let estu = prompt("Ingrese el ID del estudiante a calificar: ");
                    let calificacion = parseInt(prompt("Ingrese la calificación del estudiante: "));
                    let camper = await campersCollection.findOne({ ID: estu });
                    if (camper) {
                        let estado = calificacion > 60 ? "aprobado" : "no aprobado";
                        await campersCollection.updateOne({ ID: estu }, { $set: { estado: estado } });
                        if (estado === "aprobado") {
                            let notasTemplate = camper.ruta === "Java" ? [
                                { "0": [{ Nombre: "Intro", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "1": [{ Nombre: "Python", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "2": [{ Nombre: "HTML/CSS", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "3": [{ Nombre: "Scrum", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "4": [{ Nombre: "Git", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "5": [{ Nombre: "JavaScript", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "6": [{ Nombre: "Intro Back", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "7": [{ Nombre: "Intro BBDD", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "8": [{ Nombre: "MySQL", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "9": [{ Nombre: "Java", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "10": [{ Nombre: "PostgreSQL", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "11": [{ Nombre: "Springboot", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] }
                            ] : camper.ruta === "NodeJS" ? [
                                { "0": [{ Nombre: "Intro", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "1": [{ Nombre: "Python", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "2": [{ Nombre: "HTML/CSS", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "3": [{ Nombre: "Scrum", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "4": [{ Nombre: "Git", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "5": [{ Nombre: "JavaScript", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "6": [{ Nombre: "Intro Back", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "7": [{ Nombre: "Intro BBDD", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "8": [{ Nombre: "MongoDB", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "9": [{ Nombre: "JavaScript", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "10": [{ Nombre: "MySQL", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "11": [{ Nombre: "Express", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] }
                            ] : [
                                { "0": [{ Nombre: "Intro", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "1": [{ Nombre: "Python", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "2": [{ Nombre: "HTML/CSS", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "3": [{ Nombre: "Scrum", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "4": [{ Nombre: "Git", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "5": [{ Nombre: "JavaScript", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "6": [{ Nombre: "Intro Back", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "7": [{ Nombre: "Intro BBDD", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "8": [{ Nombre: "MySQL", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "9": [{ Nombre: "C#", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "10": [{ Nombre: "PostgreSQL", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] },
                                { "11": [{ Nombre: ".Net Core", Proyecto: 0, Filtro: 0, Trabajos: 0, Resultado: 0 }] }
                            ];
                            await notasCollection.insertOne({
                                Nombre: camper.Nombre,
                                ID: estu,
                                notas: notasTemplate
                            });
                        }
                    }
                } else if (inf === 6) {
                    let campers = await campersCollection.find().toArray();
                    console.log("Estudiantes Inscritos:");
                    campers.filter(c => c.estado === "Inscrito").forEach(c => console.log(c.Nombre));
                    console.log("Estudiantes Aprobados:");
                    campers.filter(c => c.estado === "aprobado").forEach(c => console.log(c.Nombre));
                    console.log("Trainers trabajando en Campuslands:");
                    let trainers = await trainersCollection.find().toArray();
                    trainers.forEach(t => console.log(t.Nombre));
                    console.log("Campers con rendimiento bajo:");
                    campers.filter(c => c.riesgo === "alto").forEach(c => console.log(c.Nombre));
                    console.log("Campers y Trainer asignados a un salón:");
                    let grupos = await grupoCollection.find().toArray();
                    grupos.forEach((g, i) => {
                        console.log(`Grupo ${i + 1}`);
                        console.log(`Trainer: ${g.trainer}`);
                        console.log("Estudiantes:");
                        g.estudiantes.forEach(e => console.log(e.Nombre));
                    });
                    let notas = await notasCollection.find().toArray();
                    notas.forEach(n => {
                        console.log(n.Nombre);
                        n.notas.forEach((nota, q) => {
                            let b = q.toString();
                            console.log(nota[b][0].Nombre);
                            console.log(nota[b][0].Resultado < 60 ? "No aprobado" : "Aprobado");
                        });
                        console.log("");
                    });
                } else if (inf === 7) {
                    tru = false;
                    lie = false;
                }
            }
        } else {
            console.log("Usuario o ID incorrectos");
        }
    }
}

module.exports = adminMenu;