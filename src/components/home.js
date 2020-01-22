import React, { Component } from 'react';
import Products from './products'
export default class Home extends Component {
    constructor(props)   {
        super(props);
        this.state = { isLogin:true}
    }

    
    render(){
        return(
            <> 
            <div className="container">
                <div className="row no-gutter">
                    <div className="offset-md-3 col-lg-5 col-md-12 col-sm-12">
                        <Products/>
                    </div>
                </div>
            </div>
            </>
        )
    }
}