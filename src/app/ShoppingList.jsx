import React from 'react';
import './css/index.css'

class ShoppingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: ""
        }
        this.addItemClicked = this.addItemClicked.bind(this);
        this.onShoppingListIngredientDeleteClicked = this.onShoppingListIngredientDeleteClicked.bind(this);
        this.onShoppingListExtraDeleteClicked = this.onShoppingListExtraDeleteClicked.bind(this);
    }
    addItemClicked(e) {
        var list = this.props.shoppingListExtras.length === 0 ? this.props.shoppingListExtras : this.props.shoppingListExtras.slice();
        e.preventDefault();
        list.push({ name: this.state.newItem, crossedOut:false});
        this.setState(
            { newItem: '' }
        );
        this.props.onClick(list);
    }
    onShoppingListIngredientDeleteClicked(e) {
        this.props.deleteShoppingListIngredient(e.target.attributes.getNamedItem("data-index").value);
    }
    onShoppingListIngredientClicked(e) {
        this.props.crossOutShoppingListIngredient(e.target.attributes.getNamedItem("data-index").value);
    }
    onShoppingListExtraDeleteClicked(e) {
        this.props.deleteShoppingListExtra(e.target.attributes.getNamedItem("data-index").value);
    }
    onShoppingListExtraClicked(e) {
        this.props.crossOutShoppingListExtra(e.target.attributes.getNamedItem("data-index").value);
    }
    onDelete(e) {
        this.props.onDelete(e.target.attributes.getNamedItem("data-index").value);
    }
    render() {
        var shoppingList = this.props.shoppingList.map((item, index) =>
            <li className={item.crossedOut ? 'recipe-item line-through' : 'recipe-item'} data-index={index} key={index} onClick={e => this.onShoppingListIngredientClicked(e)} >{item.name} {item.amount} {item.unitOfMeasurement}<span onClick={e => this.onShoppingListIngredientDeleteClicked(e)} data-index={index} className="remove-recipe-item">&#10005;</span> </li>
        ),
            shoppingListExtras = this.props.shoppingListExtras.map((item, index) =>
                <li className={item.crossedOut ? 'recipe-item line-through' : 'recipe-item'} data-index={index} key={index} onClick={e => this.onShoppingListExtraClicked(e)} >{item.name}<span onClick={e => this.onShoppingListExtraDeleteClicked(e)} data-index={index} className="remove-recipe-item">&#10005;</span></li>

            );
        return (
            <div id="shopping-list">
                <div className="left-and-right">
                    <div>
                        <h2>Shopping list</h2>
                    </div>
                    <div>
                        <button className="recipe-button" onClick={this.props.createNewShoppingList}>New</button>
                    </div>
                </div>
                <ul>
                    {shoppingList}
                            {shoppingListExtras}
                        </ul>
                <div className="label-button-row">
                    <div>
                        <input placeholder="Ingredient" className="recipe-input" name="extras" id="extras" type="text" value={this.state.newItem} onChange={(event) => this.setState({ newItem: event.target.value })} />
                    </div>
                    <div>
                        <button className="recipe-button" onClick={this.addItemClicked}>
                            <i className="fas fa-plus" ></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export { ShoppingList } 