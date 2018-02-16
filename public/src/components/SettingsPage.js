import React from 'react';
import Header from './Header';
import { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';
import database  from '../firebase/firebase';
import { startAddUser } from '../actions/users';
import { startUpdateUserBlogs } from '../actions/blogs';


 class SettingsPage extends React.Component  {

    setUser = () => {
        return this.props.users.find((user) => user.id === this.props.uid)
    }

    checkUser = () => {
        return this.props.users.find((user) => {
            if (user.id === this.props.uid) {
                return true;
            } else {
                return false;
            }
        })
    }

    state = {
            username: this.checkUser() ? this.setUser().username : '',
            userImage: this.checkUser() ? this.setUser().userImage : '',
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

        this.props.startUpdateUserBlogs(this.props.uid, {
            username: this.state.username,
            userImage: this.state.userImage,
        })
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


const mapStateToProps = (state, props) => ({
    isAuthenticated: !!state.auth.uid,
    uid: state.auth.uid,
    users: state.users

});

const mapDispatchToProps = (dispatch) => ({
    startAddUser: (user) => dispatch(startAddUser(user)),
    startUpdateUserBlogs: (id, userInfo) => dispatch(startUpdateUserBlogs(id, userInfo))
})


export default connect(mapStateToProps , mapDispatchToProps)(SettingsPage);