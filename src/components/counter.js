import React, { Component } from 'react'

export default class Counter extends Component {

    getCount() {
        const count = this.props.counter.value
        return (count === 0 ? 'zero' : count)
    }



    uiClasses() {
        let classes = "btn  m-2 btn-sm btn-";
        classes += this.props.counter.value === 0 ? 'warning' : 'primary';
        return classes;
    }

    componentWillUnmount(){
        console.debug("--- unmount")
    }


    // renderTags() {
    //     if (this.state.items.length === 0) {
    //         return <p>No Items Found</p>
    //     }
    //     else {
    //         return (<ul>
    //             {this.state.items.map((item, index) => (
    //                 <li key={item.id}>
    //                     <span className={this.uiClasses()}>
    //                         {this.getCount()}
    //                     </span>
    //                     <button className="btn btn-secondary btn-sm m-2" onClick={this.handleIncrement}>Increment</button>
    //                     <button className="btn btn-secondary btn-sm" onClick={this.handleDecrement}>Decrement</button>
    //                 </li>
    //             ))}
    //         </ul>);
    //     }
    // }

    render() {

        return (
            <div>
                {/* {this.renderTags()} */}
                <span className={this.uiClasses()}>
                    {this.getCount()}
                </span>
                <button className="btn btn-secondary btn-sm m-2" onClick={() => this.props.onIncrement(this.props.counter)}>+</button>
                <button className="btn btn-secondary btn-sm m-2" onClick={() => this.props.onDecrement(this.props.counter)}>-</button>
                <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(this.props.counter)}>Delete</button>
            </div>
        )
    }
}
