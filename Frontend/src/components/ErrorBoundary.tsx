import { Button } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryState = {
    error: Error | null;
    errorInfo: ErrorInfo | null;
};

type ErrorBoundaryProps = {
    children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h4>Sorry. There has been a failure in the Blog Page. Reload the client and server.</h4>
                    <p>{this.state.error && this.state.error.toString()}</p>
                    <Button color="primary" onClick={() => { window.location.href = "/" }}>Reload</Button>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;