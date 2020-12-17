$(document).ready(function() {

    console.log("v. 0.2")

    var reproductor = $('#myModal .modal-body .video');
    var video_fondo = $('#video_fondo');

    var interval_buscar_height;

    var $videoSrc;  

    $('#rotar_pantalla').click(function() {
        $('#video_fondo')[0].play();
    });

    $('.estudiante').click(function() {
        $videoSrc = $(this).data( "src" );
        console.log($videoSrc);
    });

    /** Reproducir video al abrir la modal */
    $('#myModal').on('shown.bs.modal', function (e) {

        var src_base = $videoSrc;
        var src_webm = $videoSrc.substr(0, $videoSrc.lastIndexOf(".")) + ".webm";

        $("#myModal .modal-body .video").remove();
        var sources_video =
            '<video controls class="w-100 video" controlsList="nodownload">'+
                '<source type="video/mp4" src="' + src_base + '"></source>' +
                '<source type="video/webm" src="' + src_webm + '"></source>'
            '</video>';

        $("#myModal .modal-body").append(sources_video);

        $("#myModal .modal-body video")[0].play();        
    })
    
    // Detener reproducción al cerrar la modal
    $('#myModal').on('hide.bs.modal', function (e) {
        $("#myModal .modal-body .video").remove();
        $("#myModal .modal-body").append('<video class="w-100 video"></video>');
    });

    // Cerrar modal al finalizar el video
    document.addEventListener('ended', function(e){
        if($(e.target).is('video')){
            
            console.log( $(e.target) );
            console.log("fin");
            $('#myModal').modal('hide');
        }
    }, true);


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
            $("#main").removeClass("oculto"); // mostrar video sólo cuando ya se obtuvo su tamaño
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
