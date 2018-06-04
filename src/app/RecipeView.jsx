import React from 'react';
import './css/index.css'

class RecipeView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var ingredients = this.props.recipe.ingredients.map((ingredient, index) =>
            <li key={index} >{ingredient.name} {ingredient.amount} {ingredient.unitOfMeasurement}</li>
        );
        return (
            <div id="view-recipe" className="recipe-container">
                <button className="recipe-button edit-recipe" onClick={e => this.props.onClick(this.props.recipe.id)}>Edit</button>
                <div>
                    <h1>{this.props.recipe.name}</h1>
                    <p>{this.props.recipe.description}</p>
                </div>
                <div>
                </div>
                <div>
                    <h2>Method</h2>
                    <p>{this.props.recipe.method}</p>
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <ul>{ingredients}</ul>
                </div>
            </div>
        )
    }
}

export { RecipeView } 
