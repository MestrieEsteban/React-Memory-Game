import React, { Component } from 'react';
import './styles/Game.css';
import CardView from './components/CardView';
import MemoryCards from './MemoryCards';


class Game extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.onCardClicked = this.onCardClicked.bind(this);
        this.onPlayAgain = this.onPlayAgain.bind(this);
        this.memoryCards = new MemoryCards(10);
    }

    componentDidMount() {
        this.initGame();
    }

    initGame() {
		this.memoryCards.generateRondomColor();
        this.memoryCards.generateCardSet();
        this.setState({
            turnNo: 1,
            pairsFound: 0,
            numClicksWithinTurn: 0,
            firstId: undefined,
            secondId: undefined
        });
    }

	nextLevel(){
		let foo = this.memoryCards.num_cards;
		console.log(foo)
		this.memoryCards.clear();
		this.memoryCards.num_cards = foo*2;
		this.memoryCards.generateRondomColor();
        this.memoryCards.generateCardSet();
        this.setState({
            turnNo: 1,
            pairsFound: 0,
            numClicksWithinTurn: 0,
            firstId: undefined,
            secondId: undefined
        });
	}

    getCardViews() {
        const cardViews = this.memoryCards.cards.map(c =>
            <CardView key={c.id}
            id={c.id}
            color={c.color}
            imageUp={c.imageUp}
            matched={c.matched}
            onClick={this.onCardClicked} />
        );
        return cardViews;
    }

    clearCards(id1, id2) {
        if (this.state.numClicksWithinTurn !== 2) {
            return;
        }
        this.memoryCards.flipCard(this.state.firstId, false);
        this.memoryCards.flipCard(this.state.secondId, false);
        this.setState({
            firstId: undefined,
            secondId: undefined,
            numClicksWithinTurn: 0,
            turnNo: this.state.turnNo + 1
        });
    }

    onCardClicked(id, image) {
        if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
            if (this.state.numClicksWithinTurn === 2) {
                clearTimeout(this.timeout);
                this.clearCards(this.state.firstId, this.state.secondId);
            }
            this.memoryCards.flipCard(id, true);
            this.setState({
                firstId: id,
                numClicksWithinTurn: 1
            });
        } else if (this.state.numClicksWithinTurn === 1) {
            this.memoryCards.flipCard(id, true);
            this.setState({
                secondId: id,
                numClicksWithinTurn: 2
            });

            if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
                this.memoryCards.setCardAsMatched(this.state.firstId, true);
                this.memoryCards.setCardAsMatched(id, true);
                this.setState({
                    pairsFound: this.state.pairsFound + 1,
                    firstId: undefined,
                    secondId: undefined,
                    turnNo: this.state.turnNo + 1,
                    numClicksWithinTurn: 0
                });

            } else {
                this.timeout = setTimeout(() => {
                    this.clearCards(this.state.firstId, this.state.secondId);
                }, 500);
            }

        }
    }

    onPlayAgain() {
        this.nextLevel();
    }

    render() {
        const cardViews = this.getCardViews();
        let gameStatus = <div className='Game-status'>
            <div>Tour: {this.state.turnNo}</div>
            <div>Paire trouvée: {this.state.pairsFound}</div>
        </div>;

        if (this.state.pairsFound*2 === this.memoryCards.num_cards) {
            gameStatus = <div className='Game-status'>
                <div>Niveau fini !</div>
                <div>Vous avez utilisé {this.state.turnNo - 1} tours</div>
                <div><button onClick={this.onPlayAgain}>Prochain niveau</button></div></div>;
        }

        return (
            <div className='Game'>
                <header className='Game-header'>
                    <div className='Game-title'>Efrei Memory Game</div>
                </header>
                <div>
                    {gameStatus}
                </div>
                <div className='CardContainer'>
                    {cardViews}
                </div>
            </div>
        );
    }
}

export default Game;
