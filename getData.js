const getData = async () => {
    try {
        const response = await fetch("./productos.json"); 
        const data = await response.json();
        console.log(data);

    } catch (e) {
        console.log('Hubo un error.', e);
    }
}

getData();
