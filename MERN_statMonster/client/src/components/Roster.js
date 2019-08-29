import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Card, CardTitle, CardSubtitle, CardBody, CardImg, CardHeader } from 'reactstrap';
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
                    <ListGroup className="list-group-flush">
                        <TransitionGroup className="roster">
                            { players.map(({ _id, firstName, lastName, age, height, weight, college, jerseyNumber, primaryPosition, team, img, apiId, draftRound, draftPick, injury, draftYear }) => (
                                <CSSTransition key={_id} timeout = {500} classNames =  "fade">
                                    <ListGroupItem>
                                        <Card className="text-center" style={{width: '20rem'}}>
                                            <CardHeader className="titlebar"><h3 className="PlayerName">{lastName}, {firstName[0]}</h3><h3 className="ml-4 playerpos">{primaryPosition}</h3>
                                            <Button 
                                            className="remove-btn remove" 
                                            color="danger" 
                                            size="sm" 
                                            onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                            </CardHeader>
                                            <CardImg src={img} alt=""/>
                                            <CardBody>
                                                <CardSubtitle>{ team }</CardSubtitle>
                                                Age: { age } <br/>
                                                Height: { height } <br/>
                                                Weight: { weight } <br/>
                                                College: { college } <br/>
                                                Jersey Number: { jerseyNumber } <br/>
                                                Draft Year: { draftYear } <br/>
                                                Round Drafted: { draftRound } <br/>
                                                Pick Selected: { draftPick } <br/>
                                                Injury Status: { injury } <br/>
                                            </CardBody>
                                        </Card>
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