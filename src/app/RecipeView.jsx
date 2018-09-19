import React from 'react';
import './css/index.css'
import './css/recipeView.css'

class RecipeView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var ingredients = this.props.recipe.ingredients.map((ingredient, index) =>
        <li>
            <div class="circle"></div>
            <div class="item">{ingredient.name} {ingredient.amount} {ingredient.unitOfMeasurement}</div>
            <div class="remove-item" 
            >&#10005;</div>
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
                            <button className="recipe-button edit-recipe" onClick={e => this.props.onClick(this.props.recipe.id)}>Edit</button>
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
