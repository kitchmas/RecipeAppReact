import React from 'react';
import './css/index.css';
import fontAwesome from '@fortawesome/fontawesome'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faShopping from '@fortawesome/fontawesome-free-solid/faShoppingBasket'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

fontAwesome.library.add(faList, faTh, faPlus, faShopping, faSearch);



class RecipeNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: {
                createRecipe: 1,
                createShoppingList: 2,
                gridLayout: 3,
                listLayout: 4
            },
            selectedButton: null,
            showSearchBar: false
        }
        this.createRecipeClicked = this.createRecipeClicked.bind(this);
        this.createShoppingListClicked = this.createShoppingListClicked.bind(this);
        this.homeClicked = this.homeClicked.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        this.logOutClicked = this.logOutClicked.bind(this);


    }
    createRecipeClicked() {
        this.setState((prev) => ({
            selectedButton: prev.buttons.createRecipe
        }));
        this.props.createRecipe();
    }
    createShoppingListClicked() {
        this.setState((prev) => ({
            selectedButton: prev.buttons.createShoppingList
        }));
        this.props.createShoppingList();
        debugger;
    }
    homeClicked() {
        this.setState((prev) => ({
            selectedButton: prev.buttons.null
        }));
        this.props.homeClicked();
    }
    searchButtonClicked() {
        this.setState((prev) => ({
            showSearchBar: prev.showSearchBar ? false : true
        }
        ));
    }
    logOutClicked() {
        this.props.logOutClicked();
    }
    render() {
        return (
            <nav>
                <ul className="header-nav" >
                    <li>
                        <a onClick={this.homeClicked}>
                            Recipe App
                        </a>
                    </li>
                    <li>
                        <input className="search-bar" placeholder="Search Recipes" />
                    </li>
                </ul>
                <ul className={this.state.showSearchBar && window.innerWidth < 599 ? 'flex search-nav' : 'hidden search-nav'}>
                    <li className="flex-full">
                        <input className="search-bar" placeholder="Search Recipes" />
                    </li>
                </ul>
                <ul className="button-nav">
                    <li>
                        <a onClick={this.homeClicked}>
                            RA
                        </a>
                    </li>
                    <li>
                        <a className={this.state.showSearchBar && window.innerWidth < 599 ? 'search-btn selected' : 'search-btn'}
                            onClick={this.searchButtonClicked} >
                            <i className="fas fa-search"></i>
                        </a>
                    </li>
                    <li>
                        <a className={this.state.selectedButton === this.state.buttons.createRecipe ? 'selected' : ''}
                            onClick={this.createRecipeClicked}>
                            <i className="fas fa-plus" ></i>
                            <span className="padding-left-xs nav-label">Add Recipe</span>
                        </a>
                    </li>
                    <li>
                        <a className={this.state.selectedButton === this.state.buttons.createShoppingList ? 'selected' : ''}
                            onClick={this.createShoppingListClicked}>
                            <i className="fas fa-shopping-basket"></i>
                            <span className="padding-left-xs nav-label">Shopping list</span>
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={this.logOutClicked}>
                            <span className="padding-left-xs nav-label">Log out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export { RecipeNav }