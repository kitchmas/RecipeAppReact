import React from 'react';
import { RecipeItem } from './RecipeItem.jsx';
import './css/index.css';
import './css/recipeBook.css';

class RecipeBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleIcon: "grid"
    }
    this.recipeClicked = this.recipeClicked.bind(this);
    this.layoutTogglerClicked = this.layoutTogglerClicked.bind(this);
  }
  recipeClicked(recipeId) {
    this.props.recipeClicked(recipeId);
  }
  layoutTogglerClicked() {
    this.setState({ toggleIcon: "hi" });
    this.props.layoutTogglerClicked();
  }
  render() {
    let recipes = this.props.recipes.map((recipe, index) =>
      <RecipeItem onClick={this.recipeClicked} recipe={recipe} key={index} />,
    );
      return (
        <div className="recipe-book-grid recipe-book">
          {recipes}
        </div>
      );
  }
};

export { RecipeBook }