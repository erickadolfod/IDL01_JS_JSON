
fetch('productos.json')
    .then(response => response.json())
    .then(data => {

        v_Productos = data;

        mostrarRegistros();
    })
    .catch(error => console.error('Error al cargar los productos:', error));




let rowBase = `
<tr>
    <td>##Categoría##</td>
    <td>##Nombre##</td>
    <td>##Precio##</td>
    <td>##Stock##</td>
    <td>
        <button onclick="btnEditar(##id##)" class="btn btn-sm btn-primary">Editar</button>
        <button onclick="btnEliminar(##id##)" class="btn btn-sm btn-danger">Eliminar</button>
    </td>
</tr>
`;
window.onload = (event) => {
    document.querySelector('.btn-success').addEventListener('click', agregarProducto);
    mostrarRegistros();
    
};

function mostrarRegistros()
{


    let nuevoContenido="";
    v_Productos.forEach(x => {
        let tempRow = rowBase;
        tempRow = tempRow.replace("##Categoría##", x.categoria);
        tempRow = tempRow.replace("##Nombre##", x.nombre);
        tempRow = tempRow.replace("##Precio##", x.precio);
        tempRow = tempRow.replace("##Stock##", x.stock);
        tempRow = tempRow.replaceAll("##id##", x.id);
        nuevoContenido = nuevoContenido + tempRow;
    });
    let tbody = document.getElementById("tblProductoDetalle");
    tbody.innerHTML = nuevoContenido;
}


function btnEditar(idRow) {
    let productSelected = v_Productos.find(x => x.id === idRow);
    if (productSelected) {
        AsignarValores(productSelected);
        document.querySelector('.btn-primary').innerText = 'Actualizar';
        document.querySelector('.btn-primary').onclick = function() {
            guardarCambios(productSelected);
        };
    }
}

function AsignarValores(row)
{
    if(row)
    {
        let categoriaSelect = document.getElementById("selectCategoria");
        for (let i = 0; i < categoriaSelect.options.length; i++) {
            if (categoriaSelect.options[i].value === row.categoria) {
                categoriaSelect.selectedIndex = i;
                break;
            }
        }
        document.getElementById("txtNombre").value = row.nombre;
        document.getElementById("txtPrecio").value = row.precio;
        document.getElementById("txtStock").value = row.stock;
    }
    else {
        let categoriaSelect = document.getElementById("selectCategoria");
        for (let i = 0; i < categoriaSelect.options.length; i++) {
            if (categoriaSelect.options[i].value === row.categoria) {
                categoriaSelect.selectedIndex = i;
                break;
            }
        }
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtPrecio").value = "";
        document.getElementById("txtStock").value = "";
    }
    

}

function btnEliminar(idRow) {
    if (confirm(`¿Está seguro de eliminar el producto con ID ${idRow}?`)) {
        v_Productos = v_Productos.filter(producto => producto.id !== idRow);
        mostrarRegistros();
        alert(`El producto con ID ${idRow} ha sido eliminado correctamente.`);
    }
    guardarProductosEnJSON();
}


function guardarCambios(producto) {
    let categoria = document.getElementById("selectCategoria").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let stock = document.getElementById("txtStock").value;
    producto.categoria = categoria;
    producto.nombre = nombre;
    producto.precio = precio;
    producto.stock = stock;
    mostrarRegistros();
    limpiarCampos();
    alert("El producto ha sido actualizado correctamente.");
    document.querySelector('.btn-primary').innerText = 'Guardar';
    document.querySelector('.btn-primary').onclick = function() {
    };
    guardarProductosEnJSON();
}

function limpiarCampos() {
    let categoriaInput = document.getElementById("selectCategoria");
    if (categoriaInput) {
        categoriaInput.value = "";
    }
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtStock").value = "";
}

function agregarProducto() {
    let categoria = document.getElementById("selectCategoria").value;
    let nombre = document.getElementById("txtNombre").value;
    let precio = document.getElementById("txtPrecio").value;
    let stock = document.getElementById("txtStock").value;

    let nuevoProducto = {
        id: v_Productos.length + 1, 
        categoria: categoria,
        nombre: nombre,
        precio: parseFloat(precio), 
        stock: parseInt(stock)
    };

    v_Productos.push(nuevoProducto);
    mostrarRegistros();
    limpiarCampos();
    alert("El nuevo producto ha sido agregado correctamente.");
    guardarProductosEnJSON();
}

function guardarProductosEnJSON() {
    let jsonData = JSON.stringify(v_Productos);
    fetch('guardar_productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (response.ok) {
            console.log('Datos guardados correctamente en el archivo JSON.');
        } else {
            console.error('Error al guardar los datos en el archivo JSON.');
        }
    })
    .catch(error => console.error('Error al enviar la solicitud:', error));
}


