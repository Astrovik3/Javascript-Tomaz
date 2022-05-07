
//alert("Cálculo de precio final");

//DEBE CONTENER OBJETOS, ARRAYS Y MÉTODOS DE BÚSQUEDA Y FILTRADO...
//window.onload = function(){

    let codCamisa = 0;
    let cantCamisa = 0;
    let codPants = 0;
    let cantPants = 0;
    let codRemera = 0;
    let cantRemera = 0;
    let listDescVigentes = ["A1808", "B8310", "C4015"];
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

    function Compra(productos, precioTotal, fecha) {
        this.productos = productos;
        this.precioTotal = precioTotal;
        this.fecha = fecha;
    }
    

    let elemBttnMenos = document.getElementById("btnMenos");
    let elemBttnMas = document.getElementById("btnMas");
    let elemCant = document.getElementById("cantElegida");
    let elemBttnComprar = document.getElementById("btnComprar");
    let elemBttnCarrito = document.getElementById("btnCarrito");
    //let elemShowPrecio = document.getElementById("showPrecio");
    
    fetch('./productos.json')
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((element) => {
                console.log(element.precioPrenda);
                listPrendas.push(element);
            })
        })


    elemBttnMenos.onclick = () => {
        if (elemCant.innerHTML > 0) {
            elemCant.innerHTML--
        }
    }
    elemBttnMas.onclick = () => {
        //"""hardcodeo""" la camisa porque es la unica que tengo por ahora, A MODO DE EJEMPLO... 
        if (elemCant.innerHTML < listPrendas[0].stockPrenda) {
            elemCant.innerHTML++
        }
    }
    elemBttnComprar.onclick = () => {
        let precioCompra = calculoPrecioRopa(1, elemCant.innerHTML, listPrendas);

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((resp) => resp.json())
            .then((data) => {console.log(data)});
        //LO VOLVI A HARDCODEAR PORQUE SOLO TENGO UNA OPCION POR AHORA PARA COMPRAR...
        localStorage.setItem("productos", JSON.stringify(listPrendas[0]));
        swal({
            title: 'Agregado al carrito!',
            text: "Precio final: $" + precioCompra,
            icon: 'success',
            confirm: 'ok'
        });
        //alert("Precio final: $" + precioCompra);
    }

    elemBttnCarrito.onclick = () => {
        const compraFinal = JSON.parse(localStorage.getItem("productos"));
        swal({
            title: 'Tu carrito',
            text: elemCant.innerHTML + " " + compraFinal.tipoPrenda + " por $" + compraFinal.precioPrenda,
            icon: 'info',
            confirm: 'ok'});

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


    function calculoDescuento(precioFinal, codigoDescuento, listDescVigentes) {
        let precioFinalDescuento;
        if (listDescVigentes.includes(codigoDescuento)) {
            precioFinalDescuento = (precioFinal * 85) / 100;
            return precioFinalDescuento;
        }

        return precioFinal;
    }

//}