// ==========================
// PRINCIPIOS SOLID EN NODE.JS
// ==========================

/* 
 * S — Single Responsibility Principle (Responsabilidad Única)
 * ------------------------------------------------------------
 * Un módulo o clase debe tener una sola razón para cambiar, es decir, 
 * una única responsabilidad. Esto evita código monolítico y mejora la 
 * mantenibilidad.
 * 
 * INCORRECTO: Una clase que gestiona datos del libro y operaciones de almacenamiento.
 */
function BookManagerIncorrecto(name, authorName, year, price) {
    this.books = [];
    this.name = name;
    this.authorName = authorName;
    this.year = year;
    this.price = price;
}

BookManagerIncorrecto.prototype.addBook = function () {
    console.log(`Guardando libro ${this.name} en memoria`);
    this.books.push({ name: this.name, authorName: this.authorName, year: this.year, price: this.price });
};

BookManagerIncorrecto.prototype.getAllBooks = function () {
    console.log("Obteniendo todos los libros");
    return this.books;
};

/*
 * ¿Por qué está mal?
 * - Mezcla datos del libro con lógica de almacenamiento.
 * - Cambios en almacenamiento (ej. pasar a MongoDB) o datos requieren modificar la misma clase.
 */

/*
 * CORRECTO: Separar responsabilidades en clases distintas (basado en el tutorial).
 */
function Book(name, authorName, year, price) {
    this.name = name;
    this.authorName = authorName;
    this.year = year;
    this.price = price;
}

function BookRepository() {
    this.books = [];
}

BookRepository.prototype.addBook = function (book) {
    console.log(`Guardando libro ${book.name} en memoria`);
    this.books.push(book);
};

BookRepository.prototype.getAllBooks = function () {
    console.log("Obteniendo todos los libros");
    return this.books;
};

/*
 * Evaluación: El tutorial aplica bien SRP al separar `Book` (datos) y `BookRepository` 
 * (almacenamiento). Esto es ideal para Node.js, facilitando pruebas y cambios (ej. usar una DB).
 * Mejora posible: Agregar validaciones en `Book` para evitar datos inválidos (ej. año negativo).
 */

/* 
 * O — Open/Closed Principle (Abierto/Cerrado)
 * ------------------------------------------------------------
 * Las clases deben estar abiertas a extensión pero cerradas a modificación.
 * Nuevas funcionalidades se añaden sin alterar el código existente.
 * 
 * INCORRECTO: Modificar la clase base para soportar nuevos tipos de libros.
 */
function BookIncorrecto(name, authorName, year, price, type) {
    this.name = name;
    this.authorName = authorName;
    this.year = year;
    this.price = price;
    this.type = type;
}

function getBookTypeIncorrecto(book) {
    if (book.type === "fiction") {
        console.log("Libro de ficción");
    } else if (book.type === "non-fiction") {
        console.log("Libro de no ficción");
    }
    // Cada nuevo tipo requiere modificar esta función.
}

/*
 * ¿Por qué está mal?
 * - Agregar un nuevo tipo de libro implica modificar `getBookTypeIncorrecto`.
 * - Viola OCP al no permitir extensión sin cambios.
 */

/*
 * CORRECTO: Usar herencia para extender funcionalidad (basado en el tutorial).
 */
function BookBase(name, authorName, year, price) {
    this.name = name;
    this.authorName = authorName;
    this.year = year;
    this.price = price;
}

BookBase.prototype.getType = function () {
    return "Libro genérico";
};

function FictionBook(name, authorName, year, price) {
    BookBase.call(this, name, authorName, year, price);
}
FictionBook.prototype = Object.create(BookBase.prototype);
FictionBook.prototype.getType = function () {
    return "Libro de ficción";
};

function NonFictionBook(name, authorName, year, price) {
    BookBase.call(this, name, authorName, year, price);
}
NonFictionBook.prototype = Object.create(BookBase.prototype);
NonFictionBook.prototype.getType = function () {
    return "Libro de no ficción";
};

function printBookType(book) {
    console.log(book.getType());
}

/*
 * Evaluación: El tutorial aplica bien OCP con herencia para `FictionBook` y `NonFictionBook`, 
 * permitiendo nuevos tipos sin modificar `Book`. En Node.js, esto es útil para apps modulares.
 * Mejora posible: Usar composición (ej. objetos que delegan comportamiento) para evitar herencia.
 */

/* 
 * L — Liskov Substitution Principle (Sustitución de Liskov)
 * ------------------------------------------------------------
 * Las subclases deben poder reemplazar a la clase base sin romper el programa.
 * 
 * INCORRECTO: Una subclase que rompe el comportamiento esperado.
 */
function BookBaseIncorrecto(name, authorName, year, price) {
    this.name = name;
    this.authorName = authorName;
    this.year = year;
    this.price = price;
}

BookBaseIncorrecto.prototype.validateYear = function () {
    console.log("Validando año del libro");
};

function OldBookIncorrecto(name, authorName, year, price) {
    BookBaseIncorrecto.call(this, name, authorName, year, price);
}
OldBookIncorrecto.prototype = Object.create(BookBaseIncorrecto.prototype);
OldBookIncorrecto.prototype.validateYear = function () {
    throw new Error("Libros antiguos no permiten validación de año");
};

/*
 * ¿Por qué está mal?
 * - La subclase introduce un comportamiento (error) que rompe la expectativa de la clase base.
 * - Viola LSP porque no es sustituible sin causar fallos.
 */

/*
 * CORRECTO: Subclases que respetan el contrato de la base (basado en el tutorial).
 */
function BookBaseLiskov(name, authorName, year, price) {
    this.name = name;
    this.authorName = authorName;
    this.year = year;
    this.price = price;
}

BookBaseLiskov.prototype.getDescription = function () {
    return `${this.name} por ${this.authorName}`;
};

function FictionBookLiskov(name, authorName, year, price) {
    BookBaseLiskov.call(this, name, authorName, year, price);
}
FictionBookLiskov.prototype = Object.create(BookBaseLiskov.prototype);
FictionBookLiskov.prototype.getDescription = function () {
    return `${BookBaseLiskov.prototype.getDescription.call(this)} (Ficción)`;
};

function NonFictionBookLiskov(name, authorName, year, price) {
    BookBaseLiskov.call(this, name, authorName, year, price);
}
NonFictionBookLiskov.prototype = Object.create(BookBaseLiskov.prototype);
NonFictionBookLiskov.prototype.getDescription = function () {
    return `${BookBaseLiskov.prototype.getDescription.call(this)} (No Ficción)`;
};

/*
 * Evaluación: El tutorial cumple bien LSP al asegurar que `FictionBook` y `NonFictionBook` 
 * sean sustituibles por `Book` sin problemas. Esto es clave en Node.js para polimorfismo.
 * Mejora posible: Usar un patrón como Strategy para evitar herencia y mejorar flexibilidad.
 */

/* 
 * I — Interface Segregation Principle (Segregación de Interfaces)
 * ------------------------------------------------------------
 * Las clases no deben ser forzadas a implementar métodos que no usan.
 * En JavaScript, las interfaces son implícitas, pero el principio aplica a contratos.
 * 
 * INCORRECTO: Un objeto que obliga a implementar métodos innecesarios.
 */
function BookOperationsIncorrecto() {}

BookOperationsIncorrecto.prototype.addBook = function (book) {
    throw new Error("No implementado");
};
BookOperationsIncorrecto.prototype.getBook = function (id) {
    throw new Error("No implementado");
};
BookOperationsIncorrecto.prototype.deleteBook = function (id) {
    throw new Error("No implementado");
};

function ReadOnlyRepositoryIncorrecto() {
    this.books = [];
}
ReadOnlyRepositoryIncorrecto.prototype = Object.create(BookOperationsIncorrecto.prototype);
ReadOnlyRepositoryIncorrecto.prototype.getBook = function (id) {
    console.log("Obteniendo libro");
    return this.books[0];
};
ReadOnlyRepositoryIncorrecto.prototype.addBook = function (book) {
    throw new Error("No soportado");
};
ReadOnlyRepositoryIncorrecto.prototype.deleteBook = function (id) {
    throw new Error("No soportado");
};

/*
 * ¿Por qué está mal?
 * - Fuerza a `ReadOnlyRepositoryIncorrecto` a implementar métodos que no usa.
 * - Viola ISP y genera código innecesario o errores.
 */

/*
 * CORRECTO: Contratos específicos para cada rol.
 */
function ReadOnlyBookRepository() {
    this.books = [];
}

ReadOnlyBookRepository.prototype.getBook = function (id) {
    console.log("Obteniendo libro");
    return this.books[0] || new Book("Ejemplo", "Autor", 2020, 20);
};

function WritableBookRepository() {
    this.books = [];
}

WritableBookRepository.prototype.addBook = function (book) {
    console.log(`Guardando libro ${book.name}`);
    this.books.push(book);
};

/*
 * Evaluación: El tutorial no cubre ISP explícitamente, lo que es una debilidad. 
 * En Node.js, contratos pequeños son clave para módulos reutilizables (ej. en Express).
 * Mejora: Incluir ejemplos de roles separados para repositorios.
 */

/* 
 * D — Dependency Inversion Principle (Inversión de Dependencias)
 * ------------------------------------------------------------
 * Los módulos de alto nivel no deben depender de implementaciones concretas, 
 * sino de abstracciones (en JS, objetos con contratos implícitos).
 * 
 * INCORRECTO: Dependencia directa a una clase concreta.
 */
function InMemoryBookRepositoryIncorrecto() {
    this.books = [];
}

InMemoryBookRepositoryIncorrecto.prototype.addBook = function (book) {
    console.log(`Guardando ${book.name}`);
    this.books.push(book);
};

function BookServiceIncorrecto() {
    this.repo = new InMemoryBookRepositoryIncorrecto(); // Dependencia rígida
}

BookServiceIncorrecto.prototype.addBook = function (book) {
    this.repo.addBook(book);
};

/*
 * ¿Por qué está mal?
 * - Acopla `BookServiceIncorrecto` a una implementación concreta, dificultando tests o cambios.
 * - Viola DIP al no usar abstracciones.
 */

/*
 * CORRECTO: Inyección de dependencias vía abstracción.
 */
function BookService(repo) {
    this.repo = repo;
}

BookService.prototype.addBook = function (book) {
    this.repo.addBook(book);
};

function InMemoryBookRepository() {
    this.books = [];
}

InMemoryBookRepository.prototype.addBook = function (book) {
    console.log(`Guardando ${book.name}`);
    this.books.push(book);
};

/*
 * Evaluación: El tutorial no cubre DIP, una omisión significativa. 
 * En Node.js, DIP es crucial para testing (ej. mocks con Jest) y escalabilidad. 
 * Mejora: Incluir ejemplos de inyección de dependencias.
 */

/***********************************************************
 * EJECUCIÓN DE PRUEBAS DE EJEMPLO
 ***********************************************************/
console.log("=== S — Single Responsibility ===");
const book = new Book("El Quijote", "Cervantes", 1605, 30);
const repo = new BookRepository();
repo.addBook(book);
console.log(repo.getAllBooks());

console.log("\n=== O — Open/Closed ===");
const fiction = new FictionBook("1984", "Orwell", 1949, 25);
const nonFiction = new NonFictionBook("Sapiens", "Harari", 2011, 35);
printBookType(fiction);
printBookType(nonFiction);

console.log("\n=== L — Liskov ===");
const fictionLiskov = new FictionBookLiskov("Dune", "Herbert", 1965, 40);
const nonFictionLiskov = new NonFictionBookLiskov("Cosmos", "Sagan", 1980, 50);
console.log(fictionLiskov.getDescription());
console.log(nonFictionLiskov.getDescription());

console.log("\n=== I — Interface Segregation ===");
const readRepo = new ReadOnlyBookRepository();
console.log(readRepo.getBook("1"));

console.log("\n=== D — Dependency Inversion ===");
const service = new BookService(new InMemoryBookRepository());
service.addBook(book);