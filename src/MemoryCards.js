
class MemoryCards {
    constructor(num_cards) {
        this.cards = [];
        this.num_cards = num_cards ? num_cards : 5;
		this.colors = [];
    }

	clear(){
		this.cards = [];
        this.num_cards = 0;
		this.colors = [];
	}

	generateRondomColor(){
		for(let i = 0; i < this.num_cards/2; i++){
			//unique random color
			const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
			this.colors.push(color);
		}
	}
	

    generateCardSet() {
        //
        // Generate a set of cards with color pairs
        //
        this.cards = [];
        let id = 1;
		this.colors.forEach(color => {
			const card1 = {
                id,
                color,
                imageUp: false,
                matched: false
            };
            id++;
            const card2 = {
                id,
                color,
                imageUp: false,
                matched: false
            };
            id++;
            this.cards.push(card1);
            this.cards.push(card2);
		});
        // Randomize card
        this.cards = this.shuffle(this.cards);
    }

	shuffle(array) {
		let currentIndex = array.length,  randomIndex;
	  
		while (currentIndex !== 0) {
	  
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex--;
	  
		  [array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
	  
		return array;
	  }

    getCard(id) {
        for (let i = 0; i < 2 * this.num_cards; i++) {
            if (this.cards[i].id === id) {
                return this.cards[i];
            }
        };
    }

    flipCard(id, imageUp) {
        this.getCard(id).imageUp = imageUp;
    }

    setCardAsMatched(id, matched) {
        this.getCard(id).matched = matched;
    }

    cardsHaveIdenticalImages(id1, id2) {
        if (this.getCard(id1).color === this.getCard(id2).color) {
            return true;
        } else {
            return false;
        }
    }

};

export default MemoryCards;
