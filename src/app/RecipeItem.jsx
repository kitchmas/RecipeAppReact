import React from 'react';
import './css/index.css';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div onClick={e => this.props.onClick(this.props.recipe.id)} class="item white-box">
      <div className="detail-wrapper">
      <div className="header-wapper">
        <h2 class="item-heading">{this.props.recipe.name}</h2>
        </div>
        </div>
        {this.props.recipe.imgUrl && <img className="item-picture" src={this.props.recipe.imgUrl} />}
      </div>
    )
  }
}

export { RecipeItem }