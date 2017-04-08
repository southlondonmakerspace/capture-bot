function name() {
	jQuery( '.preview h1' ).text( jQuery( '#firstname').val() + ' ' + jQuery( '#lastname').val() );
}

jQuery( document ).ready( function() {
	function readURL( input ) {
		if ( input.files && input.files[0] ) {
			var reader = new FileReader();
			reader.onload = function ( e ) {
				jQuery( '.preview .profile' ).attr( 'src', e.target.result );
			};
			reader.readAsDataURL( input.files[0] );
		}
	}

	jQuery( "#image" ).change( function() {
		readURL( this );
	} );

	jQuery( "#firstname" ).keyup( name );
	jQuery( "#lastname" ).keyup( name );

	jQuery( "#discourse" ).keyup( function() {
		jQuery( '.preview h2' ).text( '@' + jQuery( '#discourse').val() );
	} );

	jQuery( "#fact" ).keyup( function() {
		jQuery( '#fact').val( jQuery( '#fact').val().substr( 0, 125 ) );
		jQuery( '.preview p' ).text( jQuery( '#fact').val() );
	} );
} );
