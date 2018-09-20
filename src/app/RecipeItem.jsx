import React from 'react';
import './css/index.css';
import fontAwesome from '@fortawesome/fontawesome'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'

fontAwesome.library.add(faEye);

class RecipeItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div onClick={e => this.props.onClick(this.props.recipe.id)} class="item white-box">
      <div className="detail-wrapper">
      <i class="fas fa-eye"></i>
              <h2 class="item-heading">{this.props.recipe.name}</h2>
        </div>
        {this.props.recipe.imgUrl && <img className="item-picture" src={this.props.recipe.imgUrl} />}
      </div>
    )
  }
}

export { RecipeItem }