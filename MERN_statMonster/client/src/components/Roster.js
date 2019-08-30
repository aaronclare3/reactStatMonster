import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Card, CardTitle, CardSubtitle, CardBody, CardImg, CardHeader, Jumbotron, JumbotronProps } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions';
import PropTypes from 'prop-types';
import PlayerJumbo from './PlayerJumbo';
import { Link } from 'react-router-dom'; 
import axios from 'axios';


class Roster extends Component {
    state = {
        id: null,
        week1: '',
        week2: '',
        week3: '',
        week4: '',
        week5: '',
        week6: '',
        week7: '',
        week8: '',
        week9: ''
    }
    onSelectHandler = (id) =>{
        this.setState({
            id: id
        })
            console.log(this.state.id)
    }
    
    componentDidMount() {
        this.props.getPlayers();
    }

    onDeleteClick = (id) => {
        this.props.deletePlayer(id);
    }

    printYards = (arr, p) => {
        for(var i = 1; i < arr.length + 1; i++){
            if(p == "RB"){
                console.log(`Week ${i}` + " " + arr[i].stats.rushing.rushYards);
            }
            if(p == "WR" || p == "TE"){
                console.log(`Week ${i}` + " " + arr[i].stats.receiving.recYards);
            }
            if(p == "QB"){
                console.log(`Week ${i}` + " " + arr[i].stats.passing.passYards);
            }
        }
    }

    statTable = (f, l, p) => {
        console.log(f, l);
        axios({
            method: 'get',
            url: `https://api.mysportsfeeds.com/v2.1/pull/nfl/2018-regular/player_gamelogs.json?player=${f}-${l}`,
            params: {"fordate": "20180909"},
            headers: {"Authorization": "Basic " + btoa("bb751682-fb89-4b9a-a62c-240b68" + ':' + "MYSPORTSFEEDS")}
        })
        .then(res => {
            this.state.week1 = res.data.gamelogs
            console.log(this.state.week1);
            this.printYards(this.state.week1, p);
        })
        .catch(err => {console.log(err)});
    }

    render() {
        const { players } = this.props.player;
        return(
            <Container>
                <div className="row offset-2">
                    <ListGroup className="list-group-flush">
                        <TransitionGroup className="roster">
                            { players.map(({ _id, firstName, lastName, age, height, weight, college, jerseyNumber, primaryPosition, team, img, apiId, draftRound, draftPick, injury, draftYear }) => (
                                <CSSTransition key={_id} timeout = {500} classNames =  "fade">
                                    <ListGroupItem className="card-wrapper">
                                        <Card className="text-center card-rotating">
                                            <div className="face front">
                                                <CardHeader className="titlebar text-center"> <h3 className="PlayerName float-left"> {lastName}, {firstName}</h3><h3 className="playerpos"><i className="fas fa-football-ball mr-2" style={{color:'brown'}}/>{primaryPosition}</h3>
                                                <Button 
                                                className="remove-btn remove" 
                                                color="danger" 
                                                size="sm" 
                                                onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                                </CardHeader>
                                                <CardBody id={this._id}>
                                                    <div className="row">
                                                        <img className="playerImg" src={img} alt=""/>
                                                        <div className="col-9 playerInfo">
                                                            <div id="playerStats" className="row col-12 text-left">
                                                                <h4>{ team }
                                                                <span className="float-right"># { jerseyNumber }</span></h4>
                                                            </div>
                                                                <div className="col-6 p_info p_info_l">
                                                                    Personal Info: <br/>
                                                                    <i className="fas fa-birthday-cake mr-1" style={{color:'grey'}}/> { age } <br/>
                                                                    <i className="fas fa-ruler-vertical mr-1" style={{color:'grey'}}/>  { height } <br/>
                                                                    <i className="fas fa-weight mr-1" style={{color:'grey'}}/>  { weight } <br/>
                                                                    <i className="fas fa-graduation-cap mr-1" style={{color:'grey'}}/>  { college } 
                                                                </div>
                                                                <div className="col-6 p_info">
                                                                    Draft Info: <br/>
                                                                    <i className="fas fa-calendar mr-1" style={{color:'grey'}}/> { draftYear } <br/>
                                                                    <i className="fas fa-clock mr-1" style={{color:'grey'}}/> { draftRound } <br/>
                                                                    <i className="fas fa-list-ol mr-1" style={{color:'grey'}}/> { draftPick } <br/>
                                                                    <i className="fas fa-heartbeat mr-1" style={{color:'grey'}}/> { injury } 
                                                                </div>
                                                            <Button onClick={this.statTable.bind(this, firstName, lastName, primaryPosition)}>See More Stats</Button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </div>
                                            <div className="face back">

                                            </div>
                                        </Card>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                </div>
            </Container>
        );
    }
}

Roster.propTypes = {
    getPlayers: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    player: state.player
});

export default connect(mapStateToProps, { getPlayers, deletePlayer })(Roster);