import React, { Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes ={ 
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg })
            } else{
                this.setState({ msg: null});
            }
        }

        // If authenticated close modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const {firstName, lastName, email, password} = this.state;

        // create user object
        const newUser ={
            firstName,
            lastName,
            email,
            password
        };
        // Attempt to register
        this.props.register(newUser);
    }
    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
            
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                    { this.state.msg? <Alert color="danger">{ this.state.msg } </Alert> :null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <label for="firstName">First Name: </label>
                            <input type="text" 
                            name="firstName" 
                            id="firstName" 
                            placeholder="First Name"
                            className="mb-3" 
                            onChange={this.onChange}/>

                            <label for="lastName">Last Name: </label>
                            <input type="text" 
                            name="lastName" 
                            id="lastName" 
                            placeholder="Last Name" 
                            className="mb-3"
                            onChange={this.onChange}/>
                            
                            <label for="email">Email: </label>
                            <input type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            className="mb-3"
                            onChange={this.onChange}/>

                            <label for="password">Password: </label>
                            <input type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                            className="mb-3"
                            onChange={this.onChange}/>
                            <Button color='dark' style={{marginTop:'2rem'}} block>
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { register, clearErrors }

)(RegisterModal);