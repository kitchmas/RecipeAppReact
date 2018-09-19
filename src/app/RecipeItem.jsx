import React from 'react';
import './css/index.css';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div onClick={e => this.props.onClick(this.props.recipe.id)} class="item white-box">
        <h2 class="item-heading">{this.props.recipe.name}</h2>
        <p class="item-short-description">
          {this.props.recipe.description}
        </p>
      </div>
    )
  }
}

export { RecipeItem }