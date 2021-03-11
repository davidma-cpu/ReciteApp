
import React, { Component } from "react"
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import LinkBtn from "../components/LinkBtn";
import API from "../utils/API"
import "./style.css";

class UserBookmark extends Component {
    state = {
        user: "",
        verified: false,
        bookmarks: [],
    };

// Grab the id of the recipe from the url bookmarked to populate component with data. => Kevin, could you check and fix this part please?
    componentDidMount() {
        API.checkToken()
            .then(res => {
            if (res.status === 200) {
                this.setState({ verified: true });
                API.getUsername()
                    .then(data => {
                    this.setState({ user: data.data.username })
                    })
                API.getBookmarks()
                    .then(data => {
                        this.setState({ bookmarks: data.data})
                    })
            } 
            })
            .catch(err => {
            console.error(err);
            });
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-6">
                        Welcome! {this.state.user}
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        {this.state.bookmarks.length ? (
                            <List>
                                {this.state.bookmarks.map(data => (
                                    <ListItem key={data.data}>
                                        <h3><strong>{data.title}</strong></h3>
                                        <Container>
                                            <img className ="StyleThumbnail" alt="thumbnail" src={data.thumbnail} ></img>
                                            <h5 className ="StyleAuthor">{data.author}</h5>
                                            <p>{data.summary}</p>

                                        </Container>
 (
  
                                        <Link to={"/RecipeSelect/" + data.linkid}>
                                            <LinkBtn
                                                linkid={data.linkid} 
                                            />
                                        </Link>
                                    </ ListItem>

                                ))}
                            </List>
                        ) : (
                                <p>You did not bookmark any Recipes yet</p>
                            )}
                    </Col>
                </Row>

            </Container >

        )
    }
}

export default UserBookmark