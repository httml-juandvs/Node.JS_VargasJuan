// ###################
// P.O.O - Herencia
// ###################

/*
La herencia permite crear nuevas clases 
a partir de otras, mediante la reutilización de atributos
y métodos.
*/
class Animal{
    constructor(nombre){
        this.nombre=nombre;
    }
    hablar(){
        console.log(`${this.nombre} está haciendo un ruido.`);
    }
}

//exporta el modulo a utilizar
module.exports = Animal;