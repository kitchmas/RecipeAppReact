import React from 'react';
import { RecipeItem } from './RecipeItem.jsx';
import './css/index.css';
import './css/recipeBook.css';

class RecipeBook extends React.Component {
  constructor(props) {
    super(props);
    this.recipeClicked = this.recipeClicked.bind(this);
  }
  recipeClicked(recipeId) {
    this.props.recipeClicked(recipeId);
  }

  render() {
    let recipes = this.props.recipes.map((recipe, index) =>
      <RecipeItem isShoppingList={this.props.isShoppingList} onClick={this.recipeClicked} recipe={recipe} key={index} />,
    );
      return (
        <div className="recipe-book-grid recipe-book">
          {recipes}
        </div>
      );
  }
};

export { RecipeBook }