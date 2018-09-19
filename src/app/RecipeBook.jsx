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
    ),
      toggleIcon;
    if (this.props.currentLayout === this.props.layoutGrid) {
      return (
        <div class={this.props.currentLayout === this.props.layoutGrid ? 'recipe-book recipe-book-grid' : 'recipe-book'}>
          <div className="layout-toggler" onClick={this.layoutTogglerClicked}>
            <i><svg aria-hidden="true" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg></i>
          </div>
          {recipes}
        </div>
      );

    }
    else {
      return (
        <div className={this.props.currentLayout === this.props.layoutGrid ? 'recipe-book recipe-book-grid' : 'recipe-book'}>
          <div className="layout-toggler" onClick={this.layoutTogglerClicked}>
            <i><svg aria-hidden="true" data-prefix="fas" data-icon="th" class="svg-inline--fa fa-th fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"></path></svg></i>
          </div>
          {recipes}
        </div>
      );

    }

  }
};

export { RecipeBook }