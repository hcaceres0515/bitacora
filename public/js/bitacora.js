$("#bitacora").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

$(document).ready(function(){
    $('#fotos, #rutas').hide(); 
    $("#mostrarDatos").on( "click", function() {
        $('#datos').show(); 
        $('#fotos, #rutas').hide(); 
    });
    $("#mostrarRutas").on( "click", function() {
        $('#rutas').show(); 
        $('#datos, #fotos').hide(); 
    });
    $("#mostrarFotos").on( "click", function() {
        $('#fotos').show(); 
        $('#datos, #rutas').hide(); 
    }); 
});
