import React from 'react';
import './css/index.css'

class ShoppingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: ""
        }
        this.addItemClicked = this.addItemClicked.bind(this);
        this.onShoppingListIngredientClicked = this.onShoppingListIngredientClicked.bind(this);
        this.onShoppingListExtraClicked = this.onShoppingListExtraClicked.bind(this);
    }
    addItemClicked(e) {
        var list = this.props.shoppingListExtras.length === 0 ? this.props.shoppingListExtras : this.props.shoppingListExtras.slice();
        e.preventDefault();
        list.push({ name: this.state.newItem });
        this.setState(
            { newItem: '' }
        );
        this.props.onClick(list);
    }
    onShoppingListIngredientClicked(e) {
        this.props.deleteShoppingListIngredient(e.target.attributes.getNamedItem("data-index").value);
    }
    onShoppingListExtraClicked(e) {
        this.props.deleteShoppingListExtra(e.target.attributes.getNamedItem("data-index").value);
    }
    onDelete(e) {
        this.props.onDelete(e.target.attributes.getNamedItem("data-index").value);
    }
    render() {
        var shoppingList = this.props.shoppingList.map((item, index) =>
            <li className="recipe-item" key={index} >{item.name} {item.amount} {item.unitOfMeasurement}<span onClick={e => this.onShoppingListIngredientClicked(e)} data-index={index} className="remove-recipe-item">&#10005;</span></li>
        ),
            shoppingListExtras = this.props.shoppingListExtras.map((item, index) =>
                <li className="recipe-item" key={index} >{item.name}<span onClick={e => this.onShoppingListExtraClicked(e)} data-index={index} className="remove-recipe-item">&#10005;</span></li>

            );
        return (
            <div id="shopping-list">
                <h2>Shopping list</h2>
                <ul>
                    {shoppingList}
                </ul>
                {shoppingListExtras.length > 0 &&
                    <div>
                        <h2>Extras</h2>
                        <ul>
                            {shoppingListExtras}
                        </ul>
                    </div>
                }
                <div className="label-button-row">
                    <div>
                        <h2>Extras</h2>
                        <label className="recipe-label">
                            Name
                        <input className="recipe-input" name="extras" id="extras" type="text" value={this.state.newItem} onChange={(event) => this.setState({ newItem: event.target.value })} />
                        </label>
                    </div>
                    <div>
                        <button className="recipe-button" onClick={this.addItemClicked}>
                            <i className="fas fa-plus" ></i>
                        </button>
                    </div>
                </div>
                <div className="left-and-right">
                    <div>
                        <button className="recipe-button" onClick={this.props.onSave}>Save</button>
                    </div>
                    <div>
                        <button className="recipe-button" onClick={this.props.createNewShoppingList}>New</button>
                    </div>
                </div>
            </div>
        )
    }
}

export { ShoppingList } 