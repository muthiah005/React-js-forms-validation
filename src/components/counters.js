import React, { Component } from 'react';
import Counter from './counter';

export default class Counters extends Component {


    componentDidUpdate(prevProps,prevState){
        console.debug("--------- updated",prevProps,prevState);
    }
  
    render() {
        const {onReset,onDelete,onIncrement,onDecrement} = this.props;
        return (
            <div>
                <button className="btn btn-danger" onClick={onReset}>Reset All</button>
                {
                    this.props.counters.map(item =>
                        <Counter
                            key={item.id}
                            value={item.value}
                            counter={item}
                            onDelete={onDelete}
                            onDecrement ={onDecrement}
                            onIncrement={onIncrement}
                        />
                    )}
            </div>
        );
    }
}

