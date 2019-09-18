import React from 'react';
import './App.css';
import CurrencyItem from './CurrencyItem.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entered_platinum: 0,
      currency_funcs: {}
    };

    //https://stackoverflow.com/a/36683831
    this.updatePlatinum = this.updatePlatinum.bind(this);
    this.setUpdateFunction = this.setUpdateFunction.bind(this);
  }
  updatePlatinum(value) {
    if (value === this.state.entered_platinum || value === null) return;

    //Sets the entered amount of platinum into this component's state.
    this.setState({entered_platinum: value});

    //Calls the update functions for every CurrencyItem component with the new platinum value.
    for(let [key, func] of Object.entries(this.state.currency_funcs)) {
      func(value);
    }
  }
  setUpdateFunction(currency, func) {
    /* This function gets called by the CurrencyItem components
       to register their own update function with this App component.
       The update functions get called in the updatePlatinum function above. */
    var funcs = this.state.currency_funcs;
    funcs[currency] = func;
    this.setState({currency_funcs: funcs});
  }

  render(props) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Warframe <a href='https://warframe.fandom.com/wiki/Platinum'>Platinum</a> to Currency Converter</h1>
          <div>

            <h2>Platinum Amount:</h2>
            <input type='number' id='platinum-input' 
            placeholder='Enter platinum amount'
            value={this.state.entered_platinum > 0 ? this.state.entered_platinum : null}
            onChange={(e) => this.updatePlatinum(e.target.value)} />

            <hr />

            <div id='content-container'>
              <div id='currency-container'>
                <h3>Results</h3>
                <CurrencyItem currency='USD' currency_symbol='$' 
                  currency_value={this.state.entered_platinum} 
                  update_callback={this.setUpdateFunction} />
                <CurrencyItem currency='GBP' currency_symbol='£' 
                  currency_value={this.state.entered_platinum} 
                  update_callback={this.setUpdateFunction} />
              </div>

              <div id='conversions-container'>
                <h3>Common Conversions</h3>
                <table>
                  <tr>
                    <th>Platinum</th>
                    <th>$</th>
                    <th>£</th>
                  </tr>
                  <tr>
                    <td><a href='#' onClick={(e) => this.updatePlatinum(75)}>75</a></td>
                    <td>$5.03</td>
                    <td>£4.28</td>
                  </tr>
                  <tr>
                    <td><a href='#' onClick={(e) => this.updatePlatinum(170)}>170</a></td>
                    <td>$11.39</td>
                    <td>£9.69</td>
                  </tr>
                  <tr>
                    <td><a href='#' onClick={(e) => this.updatePlatinum(370)}>370</a></td>
                    <td>$24.79</td>
                    <td>£21.09</td>
                  </tr>
                </table>
              </div>

            </div>

          </div>
        </header>
      </div>
    );
  }
}

export default App;
