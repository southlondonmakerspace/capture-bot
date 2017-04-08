var __watchfolder = '../photo-printer/watch-folder/';

var config = require( './config/config.json' );

var express = require( 'express' ),
	app = express(),
	http = require( 'http' ).Server( app ),
	fs = require( 'fs' ),
	crypto = require( 'crypto' );

var multer = require( 'multer' );
var upload = multer( {
	fileFilter: function( req, file, cb ) {
		if ( file.mimetype != 'image/jpeg' ) return cb( null, false );
		if ( file.size > 250000 ) return cb( null, false );
		cb( null, true );
	}
} );

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

app.post( '/capture', upload.single( 'image' ), function( req, res ) {
	crypto.randomBytes( 10, function( ex, code ) {
		var file = {
			name: req.body.firstname + ' ' + req.body.lastname,
			username: req.body.username,
			fact: req.body.fact
		};

		var uuid = code.toString( 'hex' );

		fs.writeFile( __watchfolder + uuid + '.json', JSON.stringify( file ), function ( err ) {
			fs.writeFile( __watchfolder + uuid + '.jpg', req.file.buffer, function ( err ) {
				res.redirect( '/printing' );
			} );
		} );
	} );
} );

app.get( '/printing', function( req, res ) {
	res.render( 'printing' );
} );

var listener = app.listen( config.port ,config.host, function () {
	console.log( "Server started on: " + listener.address().address + ':' + listener.address().port );
} );
