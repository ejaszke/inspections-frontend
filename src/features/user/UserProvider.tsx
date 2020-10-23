/*eslint-disable */
import React, { Component, createContext } from 'react';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null,
    };

    componentDidMount = () => {
        this.setState({ user: 'Janusz' });
    };

    render() {
        return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
    }
}
export default UserProvider;
