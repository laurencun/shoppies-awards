import React, {Component} from 'react';
import {omdbapi, apiKey} from './API.js';
import {Container, Col, Row} from 'react-bootstrap';
import Confetti from 'react-confetti';


class NominationContainer extends Component {


  state = {
      search: "",
      movie: undefined,
      nominated: []
    }


    handleChange = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
      
        fetch(`${omdbapi}/?t=${event.target.value}&apiKey=${apiKey}`)
        .then(res => res.json())
        .then(movie => 
          this.setState({
            movie: movie
          })
        )
      }

    nominate = event => {
        let nominatedMovie = {
          title: event.target.parentElement.children[0].innerText,
          year: event.target.parentElement.children[1].innerText
        }
        this.setState({
          nominated: [...this.state.nominated, nominatedMovie],
        })
      }
    
    remove = event => {
      this.setState({
        nominated: this.state.nominated.filter(movie => movie.title !== event.target.parentElement.children[0].innerText)
      })
    }


  render() {

    return (

        <Container fluid className="nom-container">

          {this.state.nominated.length === 5 ? <Confetti className="confetti" numberOfPieces="200"/> :null}

          <Row>
            <Col md="auto">
            {/* search bar */}
              <div className="search-area">
                <h3>Please submit 5 movie nominations!</h3>
              { this.state.nominated.length < 5 ?
                <form>
                  <input  onChange={this.handleChange} name='search' placeholder='Search by title' value={this.state.search}/>
                </form>
              : <p>Congrats you submitted the max amount of nominations!</p>}
              </div>
            </Col>
          </Row>
        
          <Row>
            <Col>
            {/* Results */}
              <div className="result-box">
              <h2>Results</h2>
              {this.state.search !== "" && this.state.movie !== undefined && this.state.nominated.length < 5 ?
                <div className="movie-dets">
                  <h1>{this.state.movie.Title}</h1>
                  <p>{this.state.movie.Year}</p>
                  {this.state.nominated.find(nom => nom.title === this.state.movie.Title) !== undefined ?
                  <button disabled="true">Nominate!</button>
                  :<button onClick={this.nominate}>Nominate!</button>
                  }
                </div>
                :null}
              </div>
          </Col>
          
          <Col>
          {/* Nominations */}
            <div className="nom-box">
            <h2>Nominations</h2>
            {this.state.nominated.length !== 0 ?
              <div className="movie-dets">
                {this.state.nominated.map(nom => {
                  return( 
                  <div>
                  <h1>{nom.title}</h1>
                  <p>{nom.year}</p>
                  <button onClick={this.remove}>Remove?</button>
                  </div>)
                })}
              </div>
            :null}
            </div>
          </Col>
        </Row>
      </Container>

    );
  }
}


export default (NominationContainer)