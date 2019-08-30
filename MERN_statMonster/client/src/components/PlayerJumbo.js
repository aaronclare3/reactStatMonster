// import React, { Component } from 'react';
// import { Jumbotron, Container } from 'reactstrap';
// import { getPlayer } from '../actions/playerActions'
// import PropTypes from 'prop-types'
// import { connect, Provider } from 'react-redux'
// import Store from '../store'

// class PlayerJumbo extends Component{
//     // constructor(props){
//     //     super(props)
//     // }
    
//     // componentDidUpdate(){
//     //     this.props.getPlayer(this.props.id)
//     //     console.log(this.props)
//     // }
//         render(){
//         return(
//             <Container className="col-8">
//                 <Provider store={Store}>
//                     <Jumbotron>
//                         <p>{this.props.id}</p>
//                     </Jumbotron>
//                 </Provider>
//             </Container>
//         )
//     }
// };

// PlayerJumbo.propTypes = {
//     getPlayer: PropTypes.func.isRequired,
//     player: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     player: state.player
// });

// export default connect(mapStateToProps, { getPlayer })(PlayerJumbo);