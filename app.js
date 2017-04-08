var config = require( './config/config.json' );

var express = require( 'express' ),
	body = require( 'body-parser' ),
	app = express(),
	http = require( 'http' ).Server( app ),
	fs = require( 'fs' );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'pug' );
app.set( 'view cache', false );

app.use( express.static( __dirname + '/static' ) );

app.get( '/', function( req, res ) {
	res.render( 'index' );
} );

app.get( '/capture', function( req, res ) {
	res.render( 'form' );
} );


var listener = app.listen( config.port ,config.host, function () {
	console.log( "Server started on: " + listener.address().address + ':' + listener.address().port );
} );
