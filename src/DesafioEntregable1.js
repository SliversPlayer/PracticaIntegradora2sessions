// Realizar una clase “ProductManager” que gestione un conjunto de productos.
// ✓ Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
// ✓ Cada producto que gestione debe contar con las propiedades:
// - title (nombre del producto)
// - description (descripción del producto)
// - price (precio)
// - thumbnail (ruta de imagen)
// - code (código identificador)
// - stock (número de piezas disponibles)
// Aspectos a incluir
// ✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
// - Al agregarlo, debe crearse con un id autoincrementable 
// ✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos
// creados hasta ese momento
// ✓ Debe contar con un método “getProductById” el cual debe buscar en el arreglo 
// el producto que coincida con el id
// - En caso de no coincidir ningún id, mostrar en consola un error “Not found”


class ProductManager {
    constructor() {
      this.products = [];
    }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    if (this.products.some(product => product.code === code)) {
        console.log("El código de producto ya existe.");
        return;
      }

    const id = this.products.length + 1;
    const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };
    this.products.push(product);
    console.log("Producto agregado satisfactoriamente.")
    }
    //Retorna matriz producto
    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        const product = this.products.find(product => product.id === id);
        if(!product){
            console.log("Not found");
            return;
        }
        //Para retornar el producto buscado.
        return product;
    } 
}

const manager = new ProductManager();
manager.addProduct("Camiseta", "Camiseta de algodón", 15.99, "img/camiseta.jpg", "C001", 100);
manager.addProduct("Pantalón", "Pantalón vaquero", 29.99, "img/pantalon.jpg", "P002", 50);
console.log(manager.getProducts());
console.log(manager.getProductsById(1));
console.log(manager.getProductsById(3)); // Producto no encontrado

