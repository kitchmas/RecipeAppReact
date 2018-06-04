import React from 'react';
import fontAwesome from '@fortawesome/fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import './css/index.css';

fontAwesome.library.add(faPlus);

//Pass array to appened user input
//Pass delete handler
//Pass submit handler
class AppendableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemName: "",
      newItemAmount: 0,
      newItemUnitOfMeasurement: 'g',
      unitsOfMeasurements: ['g', 'ml', 'l', 'each'],
    }
    this.addItem = this.addItem.bind(this);
    this.unitsOfMeasurementChanged = this.unitsOfMeasurementChanged.bind(this);
  }
  addItem(e) {
    var list = this.props.list.length === 0 ? this.props.list : this.props.list.slice();
    e.preventDefault();
    list.push({ name: this.state.newItemName, amount: this.state.newItemAmount, unitOfMeasurement: this.state.newItemUnitOfMeasurement });
    this.setState(
      {
        newItemName: '',
        newItemAmount: 0,
        newItemUnitOfMeasurement: 'g'
      }
    );
    this.props.onClick(list);
  }
  unitsOfMeasurementChanged(event) {
    this.setState({ selectedUnit: event.target.value });
  }
  render() {
    var list = this.props.list.map((item, index) =>
      <ListItem onDelete={this.props.onDelete} key={index} index={index} item={item} />
    ),
      unitsOfMeasurement = this.state.unitsOfMeasurements.map((item, index) =>
        <option key={index} value={item}>{item}</option>
      );
    return (
      <div>
        <div>
          <ul>
            {list}
          </ul>
        </div>
        <div className="ingredient-flex">
          <div>
            <label className="recipe-label">
              New Ingredient
            <input className="recipe-input" name="listItem" id="new-item-name" type="text" value={this.state.newItemName} onChange={(event) => this.setState({ newItemName: event.target.value })} />
            </label>
          </div>
          <div>
            <label className="recipe-label">
              Amount
            <input className="recipe-input" name="amount" id="amount" type="number" value={this.state.newItemAmount} onChange={(event) => this.setState({ newItemAmount: parseInt(event.target.value) })} />
            </label>
          </div>
          <div>
            <label className="recipe-label">
              UoM
          <select value={this.state.selectedUnit} onChange={this.newItemUnitOfMeasurement}>
                {unitsOfMeasurement}
              </select>
            </label>
          </div>
          <div className="text-right">
            <button className="recipe-button" onClick={this.addItem}>
              <i className="fas fa-plus" ></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  onDelete(e) {
    this.props.onDelete(e.target.attributes.getNamedItem("data-index").value);
  }
  render() {
    return (
      <li className="recipe-item">{this.props.item.name} {this.props.item.amount} {this.props.item.unitOfMeasurement}<span onClick={e => this.onDelete(e)} data-index={this.props.index} className="remove-recipe-item">&#10005;</span></li>
    )
  }
}

export { AppendableList }