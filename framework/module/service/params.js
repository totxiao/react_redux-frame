/**
 * Serialize an object or an array to form url encoded string
 *
 * copied from jQuery, necessary changes made to adapt with lodash library
 */
/*eslint-disable*/
import {isFunction, isArray, isPlainObject, forEach} from 'lodash';
const rbracket = /\[\]$/;

function buildParams( prefix, obj, add ) {
    let name;

    if ( Array.isArray( obj ) ) {

        // Serialize array item.
        forEach( obj, function( value, key ) {
            if ( rbracket.test( prefix ) ) {

                // Treat each array item as a scalar.
                add( prefix, value );

            } else {

                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + '[' + ( typeof v === 'object' && value != null ? i : '' ) + ']',
                    value,
                    add
                );
            }
        } );

    } else if ( typeof obj === 'object' ) {

        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + '[' + name + ']', obj[ name ], add );
        }

    } else {

        // Serialize scalar item.
        add( prefix, obj );
    }
}

// Serialize an array of form elements or a set of
// key/values into a query string
export default function params( a ) {
    let prefix,
        s = [],
        add = function( key, valueOrFunction ) {

            // If value is a function, invoke it and use its return value
            let value = isFunction( valueOrFunction ) ?
                valueOrFunction() :
                valueOrFunction;

            s[ s.length ] = encodeURIComponent( key ) + '=' +
                encodeURIComponent( value == null ? '' : value );
        };

    // If an array was passed in, assume that it is an array of form elements.
    if ( isArray( a ) || !isPlainObject( a ) )  {

        // Serialize the form elements
        forEach( a, function(value, key) {
            add( key, value );
        } );

    } else {

        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            buildParams( prefix, a[ prefix ], add );
        }
    }

    // Return the resulting serialization
    return s.join( '&' );
}