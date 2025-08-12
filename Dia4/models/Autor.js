//Autor conoce sus libros y cada libro conoce su Autor
class Autor{
    constructor(id , nombre){
        this.id=id;
        this.nombre=nombre;
        this.libros=[];
    }
   agregarLibro(libro){
      if(this.libros.includes(libro)==false){
          this.libros.push(libro);
          libro.setAutor(this)
      }
    }
    eliminarLibro(libro) {
    this.libros = this.libros.filter(libros => libros.isbn !== libro.isbn); 
    if (libro._autor === this) {
      libro.eliminarAutor();
    }
  }
    /*
    lo que hace es recorrer todo el arreglo this.libros 
    (que contiene todos los libros del autor) usando el método .filter().
    El .filter() crea un nuevo arreglo con todos los elementos que cumplan una condición.
    libros es la variable que representa cada libro individual en la iteración.

    libros.isbn !== libros.isbn es la condición:

    Compara el isbn del libro que estamos recorriendo (libros.isbn) con
    el isbn del libro que queremos eliminar (libro.isbn).
    Si son diferentes, el libro se mantiene en el nuevo arreglo.
    Si son iguales, significa que es el libro a eliminar, así que no se incluye en el nuevo arreglo.
    Al final, this.libros = ... reemplaza la lista original de libros por el nuevo arreglo, 
    ya sin el libro que se quería borrar.

    Esa seccion filtra la colección del autor, excluyendo el libro cuyo
    isbn coincide con el que queremos eliminar.

    Finalmente en el if se encuentra se verifica si el autor del libro (libro._autor)
    es exactamente el mismo objeto (this) que está ejecutando el método.
    Si lo es, significa que hay una relación bidireccional activa, 
    y debemos romperla desde el lado del libro también.
    Llamamos a libro.eliminarAutor() para dejar de apuntar al autor.
    */
    
}

module.exports=Autor;