import React, { Component } from 'react';
import axios from 'axios';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/playerActions';

class PlayerModal extends Component {
    state = {
        modal: false,
        name:''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [ e.target.name ]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'get',
            url: `https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?player=${e.target.name.value}`,
            params: {"fordate": "20180909"},
            headers: {"Authorization": "Basic " + btoa("bb751682-fb89-4b9a-a62c-240b68" + ':' + "MYSPORTSFEEDS")}
        })
        .then(res => {
            console.log(res.data)
            console.log(res.data.players[0].player.firstName)
            console.log(res.data.players[0].player.lastName)
            console.log(res.data.players[0].player.age)
            console.log(res.data.players[0].player.primaryPosition)
            console.log(res.data.players[0].player.jerseyNumber)
            console.log(res.data.players[0].player.college)
            console.log(res.data.players[0].player.weight)
            console.log(res.data.players[0].player.id)
            console.log(res.data.players[0].teamAsOfDate.abbreviation)
        })
        .catch(err => console.log(err))


        const newPlayer = {
            name: this.state.name
        }
        this.props.addPlayer(newPlayer);

        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Player</Button>
                <Modal isOpen={this.state.modal} toggle = {this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to your Roster</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="player">Player</Label>
                                <Input type="text" name="name" id="player" placeholder="Add player" onChange={this.onChange}></Input>
                                <Button color="dark" style={{marginTop: '2rem'}} block>Add Player</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );    
    }
}

const mapStateToProps = state => ({
    player: state.player
})

export default connect(mapStateToProps, {addPlayer})(PlayerModal);