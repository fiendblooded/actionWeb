import React from "react";
import './Movie.css'
import {Link} from "react-router-dom";

class Movie extends React.Component{
    render(){
        return(
            <div className="movieDiv">
                <img src={this.props.imglink} alt="Link is broken:("></img>
                <Link to={`/movie/${this.props.id}`}><h2>{this.props.name}</h2></Link>
            </div>
        )
    }
}

export default Movie;