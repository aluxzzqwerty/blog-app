import React from "react";
import jwtDecode from "jwt-decode";
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';

class GoogleAuth extends React.Component {

    handleCallbackResponse = (response) => {
        const userObj = jwtDecode(response.credential);
        const userId = userObj.sub;
        const username = userObj.name;
        this.signInGoogle(userId, username);
    };

    componentDidMount() {
        /* global google */
        google.accounts.id.initialize({
            client_id: '702803427959-uoei4mn2qu2a3vkd9e5odcli5i9s69oq.apps.googleusercontent.com',
            callback: this.handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "filled_black", size: "large" }
        );
    };

    signInGoogle(userId, username) {
        document.getElementById("signInDiv").hidden = true;
        this.props.signIn(userId, username);
    };

    signOutGoogle() {
        document.getElementById("signInDiv").hidden = false;
        this.props.signOut();
    };

    onSignOutClick = () => {
        this.signOutGoogle();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
    }

    render() {
        return (
            <div className="login-btn">
                <div id="signInDiv"></div>
                {this.renderAuthButton()}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
} 

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);