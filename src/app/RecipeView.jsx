import React from 'react';
import './css/index.css'
import './css/recipeView.css'

class RecipeView extends React.Component {
    constructor(props) {
        super(props)
        this.editRecipeClicked = this.editRecipeClicked.bind(this);
        this.deleteRecipeClicked = this.deleteRecipeClicked.bind(this);
        this.state = {delete:"Delete"}
    }
    editRecipeClicked(){
        this.props.onEditClicked(this.props.recipe.id)
    }
    deleteRecipeClicked(){
      var x = confirm("Are you sure you want to delete this recipe?");
      if(x){
        this.setState({ delete:"Deleting..." });
        this.props.onDeleteClicked(this.props.recipe.id)
      };
    }
    render() {
        var ingredients = this.props.recipe.ingredients.map((ingredient, index) =>
            <li>
                <div class="circle"></div>
                <div class="item">{ingredient.name} {ingredient.amount} {ingredient.unitOfMeasurement}</div>
            </li>
        );
        return (
            <div className="item-detail">
                <div className="heading-menu-row">
                    <div>
                        <h2>{this.props.recipe.name}</h2>
                    </div>
                    <button className="list-menu-button">
                        &#8942;
                        <div className="settings">
                            <ul>
                                <li onClick={this.editRecipeClicked}>Edit</li>
                                <li onClick={this.deleteRecipeClicked}>{this.state.delete}</li>
                            </ul>
                        </div>
                    </button>
                </div>
                <div className="main-content">
                <div>
                {this.props.recipe.imgUrl && <img className="recipe-picture" src={this.props.recipe.imgUrl} />}
                </div>
                    <div className="description-block">
                        <p className="pre">{this.props.recipe.description}
                        </p>
                    </div>
                    <div className="method-wrapper">
                        <ul className="list-items">
                            {ingredients}
                        </ul>
                        <div className="method pre">
                            {this.props.recipe.method}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { RecipeView } 
