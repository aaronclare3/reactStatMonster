import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Card, CardTitle, CardSubtitle, CardBody, CardImg, CardHeader, Jumbotron, JumbotronProps } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'; 


class Roster extends Component {
    getID(){
        const collapse = "#" + this.props.player.id;
        return collapse
    }
    
    componentDidMount() {
        this.props.getPlayers();
    }

    onDeleteClick = (id) => {
        this.props.deletePlayer(id);
    }

    render() {
        const { players } = this.props.player;
        return(
            <Container>
                    <ListGroup className="list-group-flush">
                        <TransitionGroup className="roster">
                            { players.map(({ _id, firstName, lastName, age, height, weight, college, jerseyNumber, primaryPosition, team, img, apiId, draftRound, draftPick, injury, draftYear }) => (
                                <CSSTransition key={_id} timeout = {500} classNames =  "fade">
                                    <ListGroupItem className="accordion">
                                        <Card className="text-center" data-toggle="collapse" data-target={this.getID()} >
                                            <CardHeader className="titlebar text-center"><h3 className="PlayerName float-left">{lastName}, {firstName[0]}</h3><h3 className="playerpos">{primaryPosition}</h3>
                                            <Button 
                                            className="remove-btn remove" 
                                            color="danger" 
                                            size="sm" 
                                            onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                            </CardHeader>
                                            <CardBody id={this._id} className="collapsed">
                                                <div className="row">
                                                    <img className="playerImg" src={img} alt=""/>
                                                    <div className="col-9 playerInfo">
                                                        <div id="playerStats" className="row col-12 text-left">
                                                            <h4>{ team }
                                                            <span className="float-right"># { jerseyNumber }</span></h4>
                                                        </div>
                                                            <div className="col-5 p_info p_info_l">
                                                            Age: { age } <br/>
                                                            Height: { height } <br/>
                                                            Weight: { weight } <br/>
                                                            College: { college } <br/>
                                                            </div>
                                                            <div className="col-5 p_info">
                                                            Draft Year: { draftYear } <br/>
                                                            Round Drafted: { draftRound } <br/>
                                                            Pick Selected: { draftPick } <br/>
                                                            Status: { injury } <br/>
                                                            </div>
                                                    </div>
                                                </div>
                                            </CardBody>

                                        </Card>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                    <Jumbotron props={this.selectedid}/>
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