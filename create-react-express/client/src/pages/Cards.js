import React, { Component } from "react";
import Nav from "../components/Nav/index";
import API from "../utils/API";
import { CardList, CardListItem } from "../components/CardList"

class Cards extends Component {
    state = {
        donatorCards: []
    };

    componentDidMount() {
        this.loadCards();
    }

    loadCards = () => {
        API.getAllCards()
            .then(res => {
                console.log("Inside get all cards");
                console.log(res.data);
                var arr = res.data;
                this.setState({ donatorCards: arr });
            })
    }

    getCards = () => {
        API.getAllCards()
            .then(res => {
                console.log("Inside get all cards");
                console.log(res.data);
                var arr = res.data;
                this.setState({ donatorCards: arr });
            })

    }

    render() {
        return (
            <div>
                <Nav cards={this.getCards} />
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <table className="table table-dark">
                            <thead>
                                <CardList />
                            </thead>

                            {this.state.donatorCards.map(card => (

                                <CardListItem
                                    key={card._id}
                                    location={card.location}
                                    id={card._id}
                                    category={card.category}
                                    image={card.image}
                                    item={card.item}
                                />))}
                        </table>
                    </div>
                    <div className="col-md-2"></div>
                </div>


            </div>
        )
    }
}

export default Cards;

