$(document).ready(function() {

    let reproductor = $("#videomodal");
    let video_fondo = $("#video_fondo");

    let interval_buscar_height;

    var $videoSrc;  
    $('.estudiante').click(function() {
        $videoSrc = $(this).data( "src" );
        console.log($videoSrc);
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
        
        let width = null;  // ancho a asignar
        let height = null; // alto a asignar

        let alto_video = video_fondo[0].videoHeight;
        let ancho_video = video_fondo[0].videoWidth;
        let proporcion_video = ancho_video/alto_video;

        let width_ventana = $(window).width();
        let height_ventana = $(window).height();
        let proporcion_ventana = width_ventana / height_ventana;

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

    /* Cargar el ancho del video */
    let cargarHeight = function(){
        console.log("cargarHeight");
        let height =  video_fondo.innerHeight();
        if(  height > 0 ){
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
