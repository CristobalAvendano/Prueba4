$('#btn_mostrarJuegos').click(function() {
    fn_mostrarJuegos();
})

$("#btn_almacenar").click(function(){
  var AlmacCodigo = $("#txt_codigo").val();
  var AlmacNombre = $("#txt_nombre").val();
  var AlmacConsola = $('#cmb_consola option:selected').text();
  var AlmacValor = $("#txt_valor").val();
  var AlmacEstado = $('input[name="radioEstado"]:checked').val();

  $.post("http://127.0.0.1:8000/api/juegos/",
  {
    codigo: AlmacCodigo,
    nombre:AlmacNombre,
    consola:AlmacConsola,
    valor:AlmacValor,
    estado:AlmacEstado
  },
  function(data, status){
    alert("Juego Guardado Correctamente" + "\nStatus: " + status);
  });
});

$("#btn_eliminar2").click(function(){
  var codigo = $("#txt_codigo_eliminar").val();
  $.ajax({
    url: 'http://127.0.0.1:8000/api/juegos/' + codigo,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(result) {
       console.log('Juego Eliminado');
	   alert('Juego eliminado');
    },
	
    error: function(request,msg,error) {
      console.log('Error, no se pudo eliminar el registro');
	  console.log(codigo);
    }
});
});


function fn_mostrarJuegos() {
    $.getJSON('http://127.0.0.1:8000/api/juegos/?format=json', function(data) {
        var datos = data;
        $('#tablajuegos').show();
        for (var i in datos) {
          $("#codigo_juego").append('<tr>' +'<td>' + datos[i].codigo + '</td>'+ '</tr>');
		  $("#nombre_juego").append('<tr>' + '<td>' + datos[i].nombre + '</td>'+ '</tr>');
		  $("#consola_juego").append('<tr>' +'<td>' + datos[i].consola + '</td>'+ '</tr>');
		  $("#valor_juego").append('<tr>' +'<td>' + '$' + datos[i].valor + '</td>'+ '</tr>'); 
		  $("#estado_juego").append('<tr>' +'<td>' + datos[i].estado + '</td>'+ '</tr>');
		 
        }
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}


fn_ocultarEtiquetas();


function fn_ocultarEtiquetas() {

    $('#lbl_usuario').hide();
    $('#lbl_contrasena1').hide();
	$('#lbl_contrasena2').hide();
    $('#lbl_error_login').hide();
	$('#lbl_nombre').hide();
    $('#lbl_apellido').hide();
	$('#lbl_correo').hide();
	$('#lbl_correo2').hide();
	$('#lbl_contrasena3').hide();
	$('#lbl_consola').hide();
}

function fn_correoVacioLogin() {

    var correo = $('#txt_correo2').val();

    if (correo == "") {
        $('#lbl_correo2').show();
        $('#txt_correo2').addClass('is-invalid');
    } else {
        $('#lbl_correo2').hide();
        $('#txt_correo2').removeClass('is-invalid');
        $('#txt_correo2').addClass('is-valid');
    }

    function fn_contrasenaVacia() {

        var contrasena = $('#txt_contrasena').val();

        if (contrasena == "") {
            $('#lbl_contrasena1').show();
            $('#txt_contrasena').addClass('is-invalid');
        }
        else {
            $('#lbl_contrasena1').hide();
            $('#txt_contrasena').removeClass('is-invalid');
            $('#txt_contrasena').addClass('is-valid');
        }
    } fn_contrasenaVacia();

    function fn_loginCorrecto() {
		$.getJSON('http://127.0.0.1:8000/api/usuarios/?format=json', function(data){
		var datos = data;
        var correo = $('#txt_correo2').val();
        var contrasena = $('#txt_contrasena').val();
		
		for (var i in datos){
			if (datos[i].correo == correo && datos[i].contrasena == contrasena) {
				window.location.href = "registrojuegos.html"
				$('#txt_correo2').addClass('is-valid');
				$('#txt_contrasena').addClass('is-valid');
			}
			else {
				$('#lbl_error_login').show();
				$('#txt_contrasena').removeClass('is-valid');
				$('#txt_contrasena').addClass('is-invalid');
				$('#txt_correo2').removeClass('is-valid');
				$('#txt_correo2').addClass('is-invalid');
			}
		} 
		});
		
	}fn_loginCorrecto();
}

function fn_nombreVacio() {

    var nombre = $('#txt_nombre').val();

    if (nombre == "") {
        $('#lbl_nombre').show();
        $('#txt_nombre').addClass('is-invalid');
    } else {
        $('#lbl_nombre').hide();
        $('#txt_nombre').removeClass('is-invalid');
        $('#txt_nombre').addClass('is-valid');

    }
}

function fn_apellidoVacio() {

    var apellido = $('#txt_apellido').val();

    if (apellido == "") {
        $('#lbl_apellido').show();
        $('#txt_apellido').addClass('is-invalid');
    } else {
        $('#lbl_apellido').hide();
        $('#txt_apellido').removeClass('is-invalid');
        $('#txt_apellido').addClass('is-valid');
    }
}

function fn_correoVacio() {

    var correo = $('#txt_correo').val();

    if (correo == "") {
        $('#lbl_correo').show();
        $('#txt_correo').addClass('is-invalid');
    } else {
        $('#lbl_correo').hide();
        $('#txt_correo').removeClass('is-invalid');
        $('#txt_correo').addClass('is-valid');
    }
}

function fn_contrasenaVacia() {

    var contrasena = $('#txt_contrasena_registro').val();

    if (contrasena == "") {
        $('#lbl_contrasena').show();
        $('#txt_contrasena_registro').addClass('is-invalid');
    }
    else {
        $('#lbl_contrasena').hide();
        $('#txt_contrasena_registro').removeClass('is-invalid');
        $('#txt_contrasena_registro').addClass('is-valid');
    }
}

function fn_contrasenasIguales() {

    var contrasena = $('#txt_contrasena_registro').val();
    var contrasena2 = $('#txt_contrasena2').val();

    if (contrasena != contrasena2) {
        $('#lbl_contrasena3').show();
        $('#txt_contrasena2').addClass('is-invalid');
    }
    else if (contrasena2 == "") {
        $('#lbl_contrasena3').show();
        $('#txt_contrasena2').addClass('is-invalid');
    }
    else {
        $('#lbl_contrasena3').hide();
        $('#txt_contrasena2').removeClass('is-invalid');
        $('#txt_contrasena2').addClass('is-valid');
    }
}

function fn_consolaVacia() {

    var consola = $('#cmb_consolas option:selected').text();

    if (consola == '-- Seleccione --') {

        $('#lbl_consola').show();
        $('#cmb_consolas').addClass('is-invalid');
    } else {
        $('#lbl_consola').hide();
        $('#cmb_consolas').removeClass('is-invalid');
        $('#cmb_consolas').addClass('is-valid');
    }
}


function fn_Registro(){
    var nombreGuardar = $('#txt_nombre').val();
    var apellidoGuardar = $('#txt_apellido').val();
    var correoGuardar = $('#txt_correo').val();
    var contrasenaGuardar = $('#txt_contrasena_registro').val();
    var contrasena2Guardar = $('#txt_contrasena2').val();
    var consolaGuardar = $('#cmb_consolas option:selected').text();
		if (nombreGuardar != "" && apellidoGuardar != "" && correoGuardar != "" && contrasenaGuardar != "" && contrasenaGuardar == contrasena2Guardar && consolaGuardar != '-- Seleccione --') {
			$.post("http://127.0.0.1:8000/api/usuarios/",
				  {
					nombre: nombreGuardar,
					apellido:apellidoGuardar,
					correo:correoGuardar,
					contrasena:contrasenaGuardar,
					contrasena2:contrasena2Guardar,
					consola:consolaGuardar
				  })
					$('#txt_nombre').val("");
					$('#lbl_nombre').hide();
					$('#txt_nombre').removeClass('is-invalid');
					$('#txt_nombre').removeClass('is-valid');

					$('#txt_apellido').val("");
					$('#lbl_apellido').hide();
					$('#txt_apellido').removeClass('is-invalid');
					$('#txt_apellido').removeClass('is-valid');

					$('#txt_contrasena_registro').val("");
					$('#txt_contrasena_registro').hide();
					$('#txt_contrasena_registro').removeClass('is-invalid');
					$('#txt_contrasena_registro').removeClass('is-valid');

					$('#txt_correo').val("");
					$('#lbl_correo').hide();
					$('#txt_correo').removeClass('is-invalid');
					$('#txt_correo').removeClass('is-valid');

					$('#txt_contrasena2').val("");
					$('#lbl_contrasena2').hide();
					$('#txt_contrasena2').removeClass('is-invalid');
					$('#txt_contrasena2').removeClass('is-valid');


					$('#cmb_consolas').val('-- Seleccione --');
					$('#lbl_consola').hide();
					$('#cmb_consolas').removeClass('is-invalid');
					$('#cmb_consolas').removeClass('is-valid');
					alert('Usuario Registrado Correctamente')
	}; 
};
