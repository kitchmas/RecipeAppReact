import React from 'react';


import './css/index.css'
import './css/shoppingList.css'


class ShoppingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: "",
            saveShoppingList:"Save",
            newShoppingList:"New",
            deleteShoppingList:"Delete",
        }
        this.addItemClicked = this.addItemClicked.bind(this);
        this.onShoppingListIngredientDeleteClicked = this.onShoppingListIngredientDeleteClicked.bind(this);
        this.onShoppingListExtraDeleteClicked = this.onShoppingListExtraDeleteClicked.bind(this);
        this.saveShoppingListClicked = this.saveShoppingListClicked.bind(this);
        this.deleteShoppingListClicked = this.deleteShoppingListClicked.bind(this);
        this.newShoppingListClicked = this.newShoppingListClicked.bind(this);
    }
    addItemClicked(e) {
        var list = this.props.shoppingListExtras.length === 0 ? this.props.shoppingListExtras : this.props.shoppingListExtras.slice();
        e.preventDefault();
        list.push({ name: this.state.newItem, crossedOut: false });
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
    saveShoppingListClicked(){
        this.setState((prevState) => ({
            saveShoppingList: "Saving..."
          }));
      var x =  this.props.saveShoppingListClicked(() => {
        this.setState((prevState) => ({
            saveShoppingList: "Save"
          }));
      }
    );
    }
    newShoppingListClicked(){
        this.setState((prevState) => ({
            newShoppingList: "Creating..."
          }));
        this.props.createNewShoppingList(() => {
            this.setState((prevState) => ({
                newShoppingList: "New"
              }));
        });
    }
    deleteShoppingListClicked(){
        this.setState((prevState) => ({
            deleteShoppingList: "Deleting..."
          }));
        this.props.createNewShoppingList(() => {
            this.setState((prevState) => ({
                deleteShoppingList: "Delete"
              }));
        });
    }
    render() {
        var shoppingList = this.props.shoppingList.map((item, index) =>
            <li className={item.crossedOut ? 'line-through' : ''}
                data-index={index} key={index}
                onClick={e => this.onShoppingListIngredientClicked(e)}>
                <div data-index={index} key={index} class="circle"></div>
                <div data-index={index} key={index} class="item">{item.name} {item.amount} {item.unitOfMeasurement}</div>
                <div data-index={index} key={index} class="remove-item" onClick={e => this.onShoppingListExtraIngredientClicked(e)}
                    data-index={index}>&#10005;</div>
            </li>
        ),
            shoppingListExtras = this.props.shoppingListExtras.map((item, index) =>
                <li className={item.crossedOut ? 'line-through' : ''}
                    data-index={index} key={index}
                    onClick={e => this.onShoppingListExtraClicked(e)}>
                    {/* Super lazy data-index is on all the children  */}
                    <div data-index={index} key={index} class="circle"></div>
                    <div data-index={index} key={index} class="item">{item.name}</div>
                    <div data-index={index} key={index} class="remove-item" onClick={e => this.onShoppingListExtraDeleteClicked(e)}
                        data-index={index}>&#10005;</div>
                </li>
            );
        return (
            <div class="list-wrapper">
                <div class="heading-menu-row shadow-bottom">
                    <div>
                        <h2>Shopping List</h2>
                    </div>
                    <button class="list-menu-button">
                        &#8942;
                    <div class="settings">
                            <ul>
                                <li onClick={this.saveShoppingListClicked}>{this.state.saveShoppingList}</li>
                                <li onClick={this.newShoppingListClicked}>{this.state.newShoppingList}</li>
                                <li onClick={this.deleteShoppingListClicked}>{this.state.deleteShoppingList}</li>
                            </ul>
                        </div>
                    </button>
                </div>
                <ul class="list-items">
                    {shoppingList}
                    {shoppingListExtras}
                </ul>
                <div class="shadow-top"></div>
                <div class="item-input-control shadow-top">
                    <input placeholder="New item name" type="text" value={this.state.newItem} onChange={(event) => this.setState({ newItem: event.target.value })} />
                    <button onClick={this.addItemClicked}>+</button>
                </div>
            </div>
        )
    }
}

export { ShoppingList } 