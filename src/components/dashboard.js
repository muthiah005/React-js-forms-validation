import React, { Component } from 'react';
import Counters from './counters';

export default class DashBoard extends Component {
    constructor(props)   {
        super(props);
        this.state = {
            isAuthed: true,
            counters: [{ id: 1, value: 4 }, { id: 2, value: 2 }, { id: 3, value: 0 }]
        }
    }
   

    handleDelete = (counter) => {
        const counters = this.state.counters.filter((el) => {
            return (el.id !== counter.id)
        })
        console.debug("selected", counter, counters)

        this.setState({
            counters: counters
        })
    }

    resetAll = () => {
        const counters = this.state.counters.map((el) => {
            el.value = 0;
            return el;
        })
        console.debug("resetAll", counters)

        this.setState({
            counters: counters
        })

    }

    handleIncrement = (counter) => {
        const counters = [...this.state.counters];
        let index = counters.indexOf(counter)
        counters[index] = { ...counter }
        counters[index].value++;
        this.setState({
            counters
        })
    }

    handleDecrement = (counter) => {
        const counters = [...this.state.counters];
        let index = counters.indexOf(counter)
        counters[index] = { ...counter }
        if (counters[index].value > 0) {
            counters[index].value--;
            this.setState({
                counters
            })
        }

    }

    render() {
        return (
         <div className="container">
             <h1>Dashboard</h1>
             <Counters
                counters={this.state.counters}
                onReset={this.resetAll}
                onDelete={this.handleDelete}
                onDecrement={this.handleDecrement}
                onIncrement={this.handleIncrement}></Counters>
         </div>
        )
    }
}

