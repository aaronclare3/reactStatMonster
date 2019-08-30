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
import PropTypes from 'prop-types';
import Spinner from './layout/Spinner'

class PlayerModal extends Component {
    state = {
        modal: false,
        firstName:'',
        lastName:'',
        age:'',
        height:'',
        weight:'',
        college:'',
        jerseyNumber:'',
        primaryPosition:'',
        team:'',
        img:'',
        apiId:'',
        draftRound:'',
        draftPick:'',
        spinner: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [ e.target.name ]: e.target.value });
    }
    setSpinner = (e) => {
        this.state.spinner = true;
        this.onSubmit(e)
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'get',
            url: `https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?player=${e.target.firstname.value}-${e.target.lastname.value}`,
            params: {"fordate": "20180909"},
            headers: {"Authorization": "Basic " + btoa("bb751682-fb89-4b9a-a62c-240b68" + ':' + "MYSPORTSFEEDS")}
        })
        .then(res => {
            console.log(res.data)
            var firstName = res.data.players[0].player.firstName;
            var lastName = res.data.players[0].player.lastName;
            var age = res.data.players[0].player.age;
            var primaryPosition = res.data.players[0].player.primaryPosition;
            var jerseyNumber = res.data.players[0].player.jerseyNumber;
            var college = res.data.players[0].player.college;
            var weight = res.data.players[0].player.weight;
            var height = res.data.players[0].player.height;
            var apiId = res.data.players[0].player.id;
            var team = res.data.players[0].teamAsOfDate.abbreviation;
            var img = res.data.players[0].player.officialImageSrc;
            if(res.data.players[0].player.drafted === null){
                var draftRound = 0
                var draftYear = 0
                var draftPick = 0
            }else{
                var draftRound = res.data.players[0].player.drafted.round;
                var draftYear = res.data.players[0].player.drafted.year;
                var draftPick = res.data.players[0].player.drafted.roundPick;
            }
            if(res.data.players[0].player.currentInjury === null){
                var injury = "HEALTHY"
            }else{
                var injury = res.data.players[0].player.currentInjury.playingProbability;
            }
            const newPlayer = {
                firstName:firstName,
                lastName:lastName,
                age: age,
                height: height,
                weight: weight,
                college: college,
                jerseyNumber: jerseyNumber,
                primaryPosition: primaryPosition,
                team: team,
                img: img,
                apiId: apiId,
                draftYear: draftYear,
                draftRound: draftRound,
                draftPick: draftPick,
                injury: injury
            }
            this.props.addPlayer(newPlayer);
            this.toggle();
            this.state.spinner = '';
        })
        .catch(err => console.log(err))
    }

    render() {
        if(this.state.spinner === true){
            return <Spinner/>
        }else{
        return(
            <div>
                {this.props.isAuthenticated ? <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Player</Button>: <h4 className="mb-3 ml-4">Please Login to Manage Your Roster</h4>}
                
                <Modal isOpen={this.state.modal} toggle = {this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to your Roster</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.setSpinner}>
                            <FormGroup>
                                <Label for="player">Player</Label>
                                <Input type="text" className="mb-3" name="firstname" id="player" placeholder="Player First Name" onChange={this.onChange}></Input>
                                <Input type="text" name="lastname" id="player" placeholder="Player Last Name" onChange={this.onChange}></Input>
                                <Button color="dark" style={{marginTop: '2rem'}} block>Add Player</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );    
        }
    }
}

const mapStateToProps = state => ({
    player: state.player,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addPlayer})(PlayerModal);