import React, { Component } from 'react';

class ErrorBoundry extends Component {

    state = { hasError:false,errorInfo:{} }
    componentDidCatch({ error, info }) {
        this.setState({ hasError: true,errorInfo:info });
        console.debug(info);
        
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundry;