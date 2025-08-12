// ###################
// P.O.O - Herencia
// ###################

const Animal = require("./Animal");

class Gato extends Animal{

}

/*
Aquí, Gato hereda de Animal, lo cual
evita la duplicación de código, facilitando
el mantenimiento del mismo y la extensión de
comportamientos con facilidad.
*/

//exporta el modulo a utilizar
module.exports=Gato;