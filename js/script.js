$(document).ready(function() {

    var reproductor = $('#videomodal');
    var video_fondo = $('#video_fondo');

    var interval_buscar_height;

    var $videoSrc;  
    $('.estudiante').click(function() {
        $videoSrc = $(this).data( "src" );
        console.log($videoSrc);
    });


    $('#main').click(function() {
        video_fondo[0].play();
    });


    /** Reproducir video al abrir la modal */
    $('#myModal').on('shown.bs.modal', function (e) {
        reproductor.attr('src',$videoSrc); 
        reproductor[0].play();
    })
    
    // Detener reproducción al cerrar la modal
    $('#myModal').on('hide.bs.modal', function (e) {
        reproductor[0].pause();
        reproductor[0].currentTime = 0;
    });

    // Cerrar modal al finalizar el video
    reproductor[0].onended = function() {        
        $('#myModal').modal('hide');
    };

    /** Ajustar alto de la grilla */
    var redimensionar = function(){
        
        var width = null;  // ancho a asignar
        var height = null; // alto a asignar

        var alto_video = video_fondo[0].videoHeight;
        var ancho_video = video_fondo[0].videoWidth;
        var proporcion_video = ancho_video/alto_video;

        var width_ventana = $(window).width();
        var height_ventana = $(window).height();
        var proporcion_ventana = width_ventana / height_ventana;

        if( proporcion_ventana > proporcion_video){ // Ocupar todo el alto            
            height = height_ventana;
            width = height * proporcion_video;
        }
        else{ // Ocupar todo al ancho
            width = width_ventana;
            height = width / proporcion_video;
        }
        $(".principal").first().innerWidth( width );
        $(".grilla").first().innerHeight( height );
    };

    /* Intentar cargar el ancho del video, hasta que esté disponible */
    var cargarHeight = function(){
        if( video_fondo[0].videoHeight > 0 && video_fondo[0].videoWidth > 0 ){
            redimensionar();
            clearInterval(interval_buscar_height);
        }
    }
    $( window ).resize(redimensionar);
    interval_buscar_height = setInterval(cargarHeight, 100);
    
    // Detectar móviles
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        $("#rotar_pantalla").show();
    }
    else{
        $("#rotar_pantalla").hide();
    }

});
