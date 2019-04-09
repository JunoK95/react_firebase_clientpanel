import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'

class AddClient extends Component{
    state={
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onChangeHandler = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {
            state,
            props: { firestore }
          } = this
         
          const newClient = {
            ...state,
            balance: state.balance === '' ? '0' : state.balance
          }

        firestore.add({collection:'clients'}, newClient).then( ()=> this.props.history.push('/'));
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 text-left">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left" /> Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group text-left">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" name="firstName" value={this.state.firstName} minLength="2" required onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={this.state.lastName} minLength="2" required onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="email">email</label>
                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" name="phone" value={this.state.phone} minLength="10" required onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="balance">Balance</label>
                                <input type="text" className="form-control" name="balance" value={this.state.balance} required onChange={this.onChangeHandler} />
                            </div>

                            <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
}

export default firestoreConnect()(AddClient);