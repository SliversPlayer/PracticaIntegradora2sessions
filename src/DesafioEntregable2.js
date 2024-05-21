// Entregable 3
// Consigna
// Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos.
// Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia 
// de archivos (basado en entregable 1).
// // Aspectos a incluir
// La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe
// recibir la ruta a trabajar desde el momento de generar su instancia.
// Debe guardar objetos con el siguiente formato:
// id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)
// Aspectos a incluir
// Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, 
// asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en
// el archivo).
// Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en
// formato de arreglo.
// Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el
// producto con el id especificado y devolverlo en formato objeto
// Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como
// el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que 
// tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
// Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga
// ese id en el archivo.

const fs = require('fs');

class ProductManager {
    constructor(filePath) {
      this.filePath = "Entregables/bbdd.json";
      this.products = [];

    }

    loadProducts() {
      try {
        const data = fs.readFileSync(this.filePath, 'utf8')
        this.products = JSON.parse(data);
        console.log("BD de Productos: ", data)
      } catch (error) {
        this.products = []
        console.log("Error al cargar base de datos", error)        
      }
    }
    saveProducts() {
      const data = JSON.stringify(this.products, null, 2);
      try {
        fs.writeFileSync(this.filePath, data);
        console.log("Producto agregado exitosamente.")
      } catch (error) {
        console.log("Error al agregar el producto.", error)
        
      } 
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
    this.saveProducts();
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

    updateProduct(id, updatedFields) {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
          this.products[index] = { ...this.products[index], ...updatedFields };
          this.saveProducts();
          return true;
      }
      return false;
    }   

    deleteProduct(id) {
      const index = this.products.findIndex(product => product.id === id)
      if (index !== -1) {
        this.products.splice(index,1);
        this.saveProducts();
        return true;
      }
      return false;
    }
}

const manager = new ProductManager();

manager.addProduct("Camiseta", "Camiseta de algodón", 15.99, "img/camiseta.jpg", "C001", 100);
manager.addProduct("Pantalón", "Pantalón vaquero", 29.99, "img/pantalon.jpg", "P002", 50);
// console.log(manager.getProducts());
// console.log(manager.getProductsById(1));
console.log(manager.getProducts());

manager.updateProduct(1, { price: 120 });
console.log(manager.getProducts());

manager.deleteProduct(1);
console.log(manager.getProducts());


