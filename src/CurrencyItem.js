import React from 'react';
import './CurrencyItem.css';

class CurrencyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: this.props.currency,
            currency_value: 0
        };

        this.update = this.update.bind(this);

        //gives the update function back to the parent App component for usage.
        this.props.update_callback(this.state.currency, (value) => this.update(value));
    }

    update(platinum_value) {
        //usd and gbp from https://warframe.fandom.com/wiki/Platinum
        switch(this.state.currency) {
            case 'USD':
                //1 platinum == 0.067 (dollars, or 6.7 cents)
                this.setState({currency_value: Math.round(platinum_value * 0.067, 2)});
                break;
            case 'GBP':
                //1 platinum == 0.057 (pounds, or 5.7 pence)
                this.setState({currency_value: Math.round(platinum_value * 0.057, 2)});
                break;
            default:
                break;
        }
    }

    render(props) {
        return (
            <div id='currency-item-wrapper'>
                <span id='currency-item'>{this.state.currency}: {this.props.currency_symbol}{this.state.currency_value}</span>
            </div>
        );
    }
}

export default CurrencyItem;