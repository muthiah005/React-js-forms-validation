import React, { Component } from 'react';
import axios from 'axios';
export default class Products extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            products: []
        }
    }

    renderProducts () {

    }
    componentDidMount () {
        let { products } = this.state
        return axios.get( 'http://localhost:9080/api/getAllProducts' ).then( ( res ) => {
            console.debug( "product res", res.data, this.state );
            products = res.data;
            this.setState( { products: products } )
            return res.data;
        } ).catch( ( err ) => {
            console.debug( "error", err );
        } )
    }
    render () {
        return (
            <div>
                <h1>products</h1><ul><li> { this.state.products.map( ( item, index ) => item.name ) }</li> </ul>
            </div>
        )
    }
}