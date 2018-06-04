import React from 'react';
import './css/index.css';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div onClick={e => this.props.onClick(this.props.recipe.id)} className="recipe-item">
        <h2>{this.props.recipe.name}</h2>
        <div>{this.props.recipe.description}</div>
      </div>
    )
  }
}

export { RecipeItem }