import React from 'react';
import './css/index.css'
import './css/recipeView.css'

class RecipeView extends React.Component {
    constructor(props) {
        super(props)
        this.editRecipeClicked = this.editRecipeClicked.bind(this);
    }
    editRecipeClicked(){
        this.props.onClick(this.props.recipe.id)
    }
    render() {
        var ingredients = this.props.recipe.ingredients.map((ingredient, index) =>
            <li>
                <div class="circle"></div>
                <div class="item">{ingredient.name} {ingredient.amount} {ingredient.unitOfMeasurement}</div>
            </li>
        );
        return (
            <div class="item-detail">
                <div class="heading-menu-row">
                    <div>
                        <h2>{this.props.recipe.name}</h2>
                    </div>
                    <button class="list-menu-button">
                        &#8942;
                        <div class="settings">
                            <ul>
                                <li onClick={this.editRecipeClicked}>Edit</li>
                            </ul>
                        </div>
                    </button>
                </div>
                <div class="main-content">
                    <div class="description-block">
                        <p>{this.props.recipe.description}
                        </p>
                    </div>
                    <div class="method-wrapper">
                        <ul class="list-items">
                            {ingredients}
                        </ul>
                        <div class="method">
                            {this.props.recipe.method}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { RecipeView } 
