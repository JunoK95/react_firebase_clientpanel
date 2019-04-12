import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import LoadingGif from '../layout/LoadingGif'

class EditClient extends Component{

    constructor(props){
        super(props);

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef(); 
    }

    onChangeHandler = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {client, firestore} = this.props

        const updatedClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value,
        }

        firestore.update({collection: 'clients', doc: client.id }, updatedClient)
            .then(this.props.history.push('/'))
    }

    render(){
        const {client} = this.props

        if (client){
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
                                <input type="text" className="form-control" name="firstName" ref={this.firstNameInput} defaultValue={client.firstName} minLength="2" required onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" ref={this.lastNameInput} defaultValue={client.lastName} minLength="2" required onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="email">email</label>
                                <input type="email" className="form-control" name="email" ref={this.emailInput} defaultValue={client.email} onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" name="phone" ref={this.phoneInput} defaultValue={client.phone} minLength="10" required onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="balance">Balance</label>
                                <input type="text" className="form-control" name="balance" ref={this.balanceInput} defaultValue={client.balance} required onChange={this.onChangeHandler} />
                            </div>

                            <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </div>
            )   
        }else{
            return(<LoadingGif />)
        }
    }
}

EditClient.propTypes ={
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{ collection: "clients", storeAs: "client", doc: props.match.params.id } ]),
    connect(({firestore: {ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);