import React from 'react';
import Header from './Header';
import { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';
import database  from '../firebase/firebase';
import { startAddUser } from '../actions/users';


 class SettingsPage extends React.Component  {

    state = {
            username:  '',
            userImage:  '',
            error: ''
    }
    
    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
    }

    onUserImageChange = (e) => {
        const userImage= e.target.value;
        this.setState(() => ({ userImage }));
    }

    onSubmit = (e) => {

        e.preventDefault();

        this.props.startAddUser({
            username: this.state.username,
            userImage: this.state.userImage,
        });
        
        // firebase.auth().onAuthStateChanged((user) => {
        //     let username = this.state.username;
        //     let userImage = this.state.userImage;
            
        //     if (user) {
        //         database.ref(`users/usernames/${user.uid}`).set({
        //             email: user.email,
        //             uid: user.uid,
        //             username: username,
        //             userImage: userImage
        //         });

        //         console.log(`User ${username} logged in!`)
        //     } else {
        //         console.log('No username added')
        //     }

            

        // });

        this.props.history.push('/dashboard');
    }

    render() {
        return (
        <div>
            <Header />
            <div className="content-container settings">
                <form  onSubmit={this.onSubmit} >
                    <p className="form__error">{this.state.error}</p>
                    <h3>Set the username you want to display</h3>
                    <input
                        type="text"
                        placeholder="user name"
                        autoFocus
                        className="text-setting"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                    />
                    <h3>Set the user image you want to display</h3>
                    <input
                        type="text"
                        placeholder="Paste image url link here"
                        autoFocus
                        className="text-setting"
                        value={this.state.userImage}
                        onChange={this.onUserImageChange}
                    />
                    <div className="margin-top">
                        <button className="button button-rounded" >Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    uid: state.auth.uid,
    users: state.users

});

const mapDispatchToProps = (dispatch) => ({
    startAddUser: (user) => dispatch(startAddUser(user))
})


export default connect(mapStateToProps , mapDispatchToProps)(SettingsPage);