
//Esta funcion nos permite agregar al carrito los productos seleccionados.

function meterencarro(form) {
    unidades = form.numpedido.value;
    descripcion = form.modelo.value;
    if (confirm("El siguiente producto se va a añadir al carro de compras:\n\n " + descripcion + " \n\n¿Estas de acuerdo?")) {
        numeroregistro = 0;
        numeroregistro = getcookie("numerodeorden");
        numeroregistro++;
        if (numeroregistro > 5)
            swal("ATENCIÓN\nSu carro de compra esta lleno.\nPor favor, ingrese al carro.\nGracias.");
        else {
            actualizarbase = form.numpedido.value + "|" + form.precio.value + "|" + form.referencia.value + "|" + form.modelo.value;
            nuevopedido = "Order." + numeroregistro;
            setcookie(nuevopedido, actualizarbase, null, "/");
            setcookie("numerodeorden", numeroregistro, null, "/");

            aviso = "PRODUCTO SELECCIONADO\n\n" + "Cantidad: " + unidades + " unidad/es.\n"
                + "Producto: \n" + descripcion + ".\n\nPulse sobre la bolsa inferior derecha para acceder\na su lista de compra.\nGracias";
            swal(aviso);
        }
    }
}



//----------------
function getcookieval(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

// Funcion para obtener las cookies del carro

function getcookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) return getcookieval(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}



function setcookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

// -------------- Funcion para quitar el producto del carrito

function quitardelcarrito(RemOrder) {
    if (confirm("¿Estas de acuerdo de eliminar el producto del carro?")) {
        numerodeorden = getcookie("numerodeorden");
        for (i = RemOrder; i < numerodeorden; i++) {
            nuevopedido1 = "Order." + (i + 1);
            nuevopedido2 = "Order." + (i);
            datos = getcookie(nuevopedido1);
            setcookie(nuevopedido2, datos, null, "/");
        }
        nuevopedido = "Order." + numerodeorden;
        setcookie("numerodeorden", numerodeorden - 1, null, "/");
        deletecookie(nuevopedido, "/");
        location.href = location.href;
    }
}

//--------------- Tabla con los productos agregados al carro

function visualizarcarrito() {
    numerodeorden = 0;
    subtotal = 0;
    preciototal = 0;
    numerodeorden = getcookie("numerodeorden");
    tablas = "";
    for (i = 1; i <= numerodeorden; i++) {
        nuevopedido = "Order." + i;
        datos = "";
        datos = getcookie(nuevopedido);
        ficha0 = datos.indexOf("|", 0);
        ficha1 = datos.indexOf("|", ficha0 + 1);
        ficha2 = datos.indexOf("|", ficha1 + 1);
        campos = new Array;
        campos[0] = datos.substring(0, ficha0); //--------cantidad
        campos[1] = datos.substring(ficha0 + 1, ficha1); //--------precio
        campos[2] = datos.substring(ficha1 + 1, ficha2); //--------modelo
        campos[3] = datos.substring(ficha2 + 1, datos.length); //--------referencia
        subtotal = subtotal + (campos[1] * campos[0]); //--------sumatoria del total del carrito
        preciototal = subtotal;
        tablas += "<tr style='font: 9pt; text-align: center; color=white'><td>" + campos[2] + "</td><td  style='color=black'>"
            + campos[3] + "</td><td style='font-weight: bold;'>" + "$" +campos[1] // ------Concatenamos el signo de pesos para el precio del producto
            + " </td><td><input type=text id='inputcarro' size=2 name=\"Cantidad" + i + "\" value=\""
            + campos[0] + "\"></td>"
            + "<td class=boton-eliminar><input type=button id=boton-eliminar value=\"  Eliminar  \" onClick=\"quitardelcarrito(" + i + ")\">"
            + "<input type=hidden name=\"Referencia" + i + "\" value=\"" + campos[2] + "\">"
            + "<input type=hidden name=\"Modelo" + i + "\" value=\"" + campos[3] + "\">"
            + "<input type=hidden name=\"Precio" + i + "\" value=\"" + campos[1] + "\">";
    }
    document.write(tablas);
    document.write("</td></tr><tr><td colspan=2 style='font: 9pt'><b>TOTAL CON IVA INCLUIDO</b></td><td style='color: black'>");
    document.write("<p id=total>" +"$"+ preciototal + "</p>");  // ------ Concatenamos el signo de pesos
    document.write(" </td><td colspan=2 style='font: 6pt; text-align: center; color=white'><b>Gracias por tu compra, vuelve pronto. </b></td>");
}

// --------- Se elimina la cookie su nombre, ruta URL y dominio 

function deletecookie(name, path, domain) {
    if (getcookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

// -------- Se manda la ventana de impresion
function imprimir(){
    print();
}

