import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 


class Roster extends Component {

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
                    <ListGroup>
                        <TransitionGroup className="roster">
                            { players.map(({ _id, firstName, lastName, age, height, weight, college, jerseyNumber, primaryPosition, team, img, apiId, draftRound, draftPick, injury, draftYear }) => (
                                <CSSTransition key={_id} timeout = {500} classNames =  "fade">
                                    <ListGroupItem>
                                        <Button 
                                        className="remove-btn" 
                                        color="danger" 
                                        size="sm" 
                                        onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                        {firstName} {lastName} <br/>
                                        Age: { age } <br/>
                                        Height: { height } <br/>
                                        Weight: { weight } <br/>
                                        College: { college } <br/>
                                        Jersey Number: { jerseyNumber } <br/>
                                        Position: { primaryPosition } <br/>
                                        Team: { team } <br/>
                                        img: <img src={img} alt=""/> <br/>
                                        Draft Year: { draftYear } <br/>
                                        Round Drafted: { draftRound } <br/>
                                        Pick Selected: { draftPick } <br/>
                                        Current Injury: { injury } <br/>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
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