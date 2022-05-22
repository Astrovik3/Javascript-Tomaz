
//window.onload = function(){

    let codCamisa = 0;
    let cantCamisa = 0;
    let codPants = 0;
    let cantPants = 0;
    let codRemera = 0;
    let cantRemera = 0;
    //let listDescVigentes = ["A1808", "B8310", "C4015"];
    let listPrendas = [];
    let fechaHoy = new Date(); //cambiar la máscara de la fecha a dd/mm/yyyy...

    function PrendaVestir(codPrenda, precioPrenda, stockPrenda, tipoPrenda, tallePrenda, imgPrenda) {
        this.codPrenda = codPrenda;
        this.precioPrenda = precioPrenda;
        this.stockPrenda = stockPrenda;
        this.tipoPrenda = tipoPrenda;
        this.tallePrenda = tallePrenda;
        this.imgPrenda = imgPrenda;
    }

    //crear un objeto compra con los datos que me sirven mostrar en el carrito...
    function Compra(cantidad, producto, precioTotal, fecha) {
        this.cantidad = cantidad;
        this.producto = producto;
        this.precioTotal = precioTotal;
        this.fecha = fecha;
    }
    
    //tuve que definirlo acá porque no puedo traerme los datos de un .json local...
    listPrendas = [
    {codPrenda: 1, precioPrenda: 500, stockPrenda: 20, tipoPrenda: "camisa", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "camisa a cuadros azul y rojo"}, 
    {codPrenda: 2, precioPrenda: 260, stockPrenda: 10, tipoPrenda: "camisa", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "camisa simple naranja"}, 
    {codPrenda: 3, precioPrenda: 380, stockPrenda: 12, tipoPrenda: "camisa", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "camisa simple salmón"},
    {codPrenda: 4, precioPrenda: 3800, stockPrenda: 5, tipoPrenda: "pantalon", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "jean gastado azul"},
    {codPrenda: 5, precioPrenda: 1040, stockPrenda: 9, tipoPrenda: "pantalon", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "jean gastado negro"},
    {codPrenda: 6, precioPrenda: 2560, stockPrenda: 11, tipoPrenda: "pantalon", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "joggin gris"},
    {codPrenda: 7, precioPrenda: 320, stockPrenda: 4, tipoPrenda: "remera", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "remera blanca con negro"},
    {codPrenda: 8, precioPrenda: 540, stockPrenda: 18, tipoPrenda: "remera", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "remera simple verde"},
    {codPrenda: 9, precioPrenda: 290, stockPrenda: 13, tipoPrenda: "remera", tallePrenda: ["XL", "L", "M", "S"], descripcionPrenda: "remera simple rosa"}];

    
    let elemBttnCarrito = document.getElementById("btnCarrito");
    let elemBttnVaciar = document.getElementById("btnVaciar");
    let elemBttnComprar = document.getElementsByClassName("btnComprar");
    let elemInputCant = document.getElementsByClassName("inputCant");

    //seteo el maximo a elegir guiandome por el stock de cada prenda...
    for (let i = 0; i < elemInputCant.length; i++) {
        let bttnInput = elemInputCant[i];
        bttnInput.setAttribute("max", listPrendas[i].stockPrenda);
    }
    

    //NO ME FUNCIONA EL FETCH... SIEMPRE ROMPE...
    /*fetch('./productos.json')
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((element) => {
                console.log(element.precioPrenda);
                listPrendas.push(element);
            })
    })*/


    for (let i = 0; i < elemBttnComprar.length; i++) {
        let bttnAceptar = elemBttnComprar[i];
        bttnAceptar.onclick = () => {
            let cantInput = bttnAceptar.parentElement.getElementsByClassName("inputCant")[0].value;
            //no dejo cargar una compra con 0, así tampoco me rompe al calcular los precios...
            if (cantInput > 0) {                
                let precioCompra = calculoPrecioRopa(bttnAceptar.id, cantInput, listPrendas);
                let producto = listPrendas[bttnAceptar.id-1];
                let compraNueva = new Compra(cantInput, producto, precioCompra, fechaHoy);

                localStorage.setItem("productos" + i, JSON.stringify(compraNueva));
                swal({
                    title: 'Agregado al carrito!',
                    text: "Precio agregado: $" + precioCompra,
                    icon: 'success',
                    confirm: 'ok'
                });
            }
        }
    }

    elemBttnCarrito.onclick = () => {
        let precioCarrito = 0;
        let ropaCarrito = "";

        //ciclo for 9 veces por la cantidad de productos que tengo...
        for (let j = 0; j < listPrendas.length; j++) {
            if(localStorage.getItem("productos" + j) != null){
                const itemFinal = JSON.parse(localStorage.getItem("productos" + j));
                precioCarrito = precioCarrito + itemFinal.precioTotal;
                ropaCarrito = ropaCarrito + itemFinal.cantidad + ' x ' + itemFinal.producto.descripcionPrenda + '\n';
            }
        }

        swal({
            title: 'Tu carrito: $' + precioCarrito,
            text: ropaCarrito,
            icon: 'info',
            confirm: 'ok'
        });
    }

    elemBttnVaciar.onclick = () => {

        for (let i = 0; i < listPrendas.length ; i++) {
            if (localStorage.getItem("productos" + i) != null) {
                localStorage.removeItem("productos" + i);
            }
        }
    }

    function calculoPrecioRopa(codRopa, cantRopa, listPrendas){
        let precioRopa = 0;

        for (let i = 0; i < listPrendas.length; i++) {
            let ropa = listPrendas[i];
            if (ropa.codPrenda == codRopa) {
                precioRopa = ropa.precioPrenda * cantRopa;
                break;
            }
        }
        return precioRopa;
    }


    /*function calculoDescuento(precioFinal, codigoDescuento, listDescVigentes) {
        let precioFinalDescuento;
        if (listDescVigentes.includes(codigoDescuento)) {
            precioFinalDescuento = (precioFinal * 85) / 100;
            return precioFinalDescuento;
        }

        return precioFinal;
    }*/

//}