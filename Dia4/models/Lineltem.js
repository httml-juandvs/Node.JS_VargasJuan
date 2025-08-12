// un pedido conoce sus LineItem, pero cada lineItem no conoce el pedido

class LineItem{
    constructor(producto,cantidad,precioUnitario){
        this.producto= producto;
        this.cantidad=cantidad;
        this.precioUnitario=precioUnitario;
    }
    subtotal(){
        return this.cantidad * this.precioUnitario;
    }
}


module.exports = LineItem;