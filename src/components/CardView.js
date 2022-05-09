import React, { Component } from 'react';
import '../styles/Game.css';

class CardView extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!this.props.matched && !this.props.imageUp) {
            this.props.onClick(this.props.id, this.props.image);
        }
    }

    render() {
		let color = `${this.props.color}`;
        if (!this.props.imageUp) {
            color = `grey`;
        }

        let className = 'Card';
        if (this.props.matched) {
            className = className + ' Matched';
        }

        return (
            <img className={className} style={{ backgroundColor: color}} alt='' onClick={this.onClick} />
        );
    };
};

export default CardView;
