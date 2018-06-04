import React from 'react';
import { AppendableList } from './AppendableList.jsx';
import Textarea from "react-textarea-autosize";
import './css/index.css';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
      addingIngredient: false
    }
    this.addIngredient = this.addIngredient.bind(this);
    this.ingredientOnDelete = this.ingredientOnDelete.bind(this);
  }
  inputOnChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let recipe = Object.assign({}, this.state.recipe);

    recipe[name] = value;
    this.setState({ recipe });

  }
  addIngredient(ingredients) {
    var recipe = {};
    if (ingredients) {
      Object.assign(recipe, this.state.recipe);
      recipe.ingredients = ingredients;
      this.setState({
        recipe: recipe
      });
    } else {
      return;
    }
  }
  ingredientOnDelete(index) {
    var recipe = Object.assign({}, this.state.recipe);
    if (index > -1) {
      recipe.ingredients.splice(index, 1);
    }
    this.setState({ recipe: recipe });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.recipe);
  }
  render() {
    return (
      <form id="recipe-form" className="recipe-container">
        <h1>New Recipe</h1>
        <div>
          <label className="recipe-label" htmlFor="name">Name
            <input required className="recipe-input" name="name" type="text" id="name" value={this.state.recipe.name} onChange={(event) => this.inputOnChange(event)} />
          </label>
        </div>
        <div>
          <label className="recipe-label" htmlFor="description">Description
            <Textarea className="recipe-textarea" name="description" id="description" value={this.state.recipe.description} onChange={(event) => this.inputOnChange(event)} />
          </label>
        </div>
        <div>
          <label className="recipe-label" htmlFor="method">Method
            <Textarea className="recipe-textarea" name="method" id="method" value={this.state.recipe.method} onChange={(event) => this.inputOnChange(event)} />
          </label>
        </div>
        <div>
              <label className="recipe-label" htmlFor="new-item-name">Ingredients</label>
          
            <AppendableList
              list={this.state.recipe.ingredients}
              onClick={this.addIngredient}
              onDelete={this.ingredientOnDelete}
            />

        </div>
        <div className="text-right">
          <button className="recipe-button recipe-save-button" onClick={e => this.onSubmit(e)}>Save</button>
        </div>
      </form>
    );
  }
};

export { RecipeForm }