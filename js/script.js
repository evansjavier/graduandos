
$(document).ready(function() {

    var $videoSrc;  
    $('.estudiante').click(function() {
        $videoSrc = $(this).data( "src" );
        console.log($videoSrc);
    });

    /** Reproducir video al abrir la modal */
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
    })
    
    // Detener reproducción al cerrar la modal
    $('#myModal').on('hide.bs.modal', function (e) {
        
        $("#video").attr('src',$videoSrc);  // detener
    }) 

});
