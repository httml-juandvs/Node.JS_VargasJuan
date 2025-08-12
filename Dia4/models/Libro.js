class Libro{
    constructor (isbn,titulo){
        this.isbn=isbn;
        this.titulo=titulo;
        this._autor=null //Referencia de vuelta
    }
    setAutor(autor){
        this._autor=autor
    }
    eliminarAutor() { // Aquí, el libro borra la referencia hacia su autor asignándole null.
    this._autor = null;
  }
}

module.exports=Libro;