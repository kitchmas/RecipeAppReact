import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { auth } from './firebase.jsx';
import { recipeDB } from './firebase.jsx';
import { firestore } from './firebase.jsx';
import { IdCreator } from './IdCreator.js';
import { RecipeItem } from './RecipeItem.jsx';
import { RecipeForm } from './RecipeForm.jsx';
import { RecipeView } from './RecipeView.jsx';
import { RecipeNav } from './nav.jsx';
import { ShoppingList } from './ShoppingList.jsx';
import { Login } from './login.jsx';
import Textarea from "react-textarea-autosize";

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      authUser: null,
      currentView: 1,
      views: { gridLayout: 1, listLayout: 2, createRecipe: 3, editRecipe: 4, viewRecipe: 5 },
      selectedRecipe: {},
      recipes: [],
      newRecipe: {
        name: "",
        description: "",
        newIngredientName: "",
        method: "",
        ingredients: []
      },
      creatingShoppingList: false,
      shoppingList: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.recipeClicked = this.recipeClicked.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.gridLayout = this.gridLayout.bind(this);
    this.listLayout = this.listLayout.bind(this);
    this.createShoppingListClicked = this.createShoppingListClicked.bind(this);
    this.addShoppingListExtras = this.addShoppingListExtras.bind(this);
    this.logOutClicked = this.logOutClicked.bind(this);
    this.saveShoppingList = this.saveShoppingList.bind(this);
    this.newShoppingList = this.newShoppingList.bind(this);
    this.deleteShoppingListIngredient = this.deleteShoppingListIngredient.bind(this);
    this.deleteShoppingListExtra = this.deleteShoppingListExtra.bind(this);
    this.crossOutShoppingListIngredient = this.crossOutShoppingListIngredient.bind(this);
    this.crossOutShoppingListExtra = this.crossOutShoppingListExtra.bind(this);
  }
  showLoading() {
    this.setState({
      isLoading: true
    });
  }
  hideLoading() {
    this.setState({
      isLoading: false
    });
  }
  getRecipes() {
    this.showLoading();
    firestore.collection('Recipes').get().then(querySnapshot => {
      let recipes = querySnapshot.docs.map(doc => {
        let recipe = doc.data();
        recipe.id = doc.id;
        return recipe;
      });
      this.setState((prevState) => ({
        recipes: recipes,
        currentView: prevState.views.gridLayout
      }
      ));
      this.hideLoading();
    });
  }
  getShoppingList(callback) {
    this.showLoading();
    firestore.collection('ShoppingList').where("shoppingListUsed", '==', false).get().then(querySnapshot => {
      if (querySnapshot.docs.length === 1) {
        let shoppingList = querySnapshot.docs[0].data();
        this.setState({
          shoppingList: shoppingList
        });
        if (callback) {
          callback();
        }
        this.hideLoading();
      } else {
        this.createNewShoppingList();
      }
    });
  }
  createNewShoppingList() {
    const dateCreated = new Date(),
      id = IdCreator.createAutoId();
    let shoppingList = {
      id: id,
      dateCreated: dateCreated,
      shoppingListUsed: false,
      shoppingListIngredients: [],
      shoppingListExtras: []
    }
    this.showLoading();
    firestore.collection('ShoppingList').doc(shoppingList.id).set(shoppingList)
      .then(docRef => {
        console.log("ShoppingListSaved saved successfully");
        this.setState({
          shoppingList: shoppingList
        });
        this.hideLoading();
      })
      .catch(error => console.log("Error adding document: ", error));
  }
  saveShoppingList() {
    const shoppingList = this.state.shoppingList;
    if (shoppingList.id) {
      // this.showLoading();
      firestore.collection('ShoppingList').doc(shoppingList.id).set(shoppingList)
        .then(() => {
          // console.log("ShoppingListSaved saved successfully");
          // this.getShoppingList();
          // this.hideLoading();
        })
        .catch(error => console.log("Error adding document: ", error));
    }
  }
  newShoppingList() {
    let confirmResponse = confirm("Are you sure you would like to start a new shopping list?");
    if (confirmResponse) {
      let shoppingList = this.state.shoppingList;
      shoppingList.shoppingListUsed = true;
      this.setState({
        shoppingList: shoppingList
      });
      this.saveShoppingList();
    } else {
      return;
    }
  }
  deleteShoppingListIngredient(index) {
    var shoppingList = Object.assign({}, this.state.shoppingList);
    if (index > -1) {
      shoppingList.shoppingListIngredients.splice(index, 1);
    }
    this.setState({ shoppingList: shoppingList });
  }
  crossOutShoppingListIngredient(index) {
    var shoppingList = Object.assign({}, this.state.shoppingList);
    if (index > -1) {
      shoppingList.shoppingListIngredients[parseInt(index)].crossedOut = shoppingList.shoppingListIngredients[parseInt(index)].crossedOut ? false : true;
    }

    this.setState(
      { shoppingList: shoppingList },
      () => {
        this.saveShoppingList();
      });
  }
  deleteShoppingListExtra(index) {
    var shoppingList = Object.assign({}, this.state.shoppingList);
    if (index > -1) {
      shoppingList.shoppingListExtras.splice(index, 1);
    }
    this.setState({
      shoppingList: shoppingList
    }, () => {
      this.saveShoppingList();
    });
  }
  crossOutShoppingListExtra(index) {
    var shoppingList = Object.assign({}, this.state.shoppingList);
    if (index > -1) {
      shoppingList.shoppingListExtras[parseInt(index)].crossedOut = shoppingList.shoppingListExtras[parseInt(index)].crossedOut ? false : true;
    }
    this.setState(
      { shoppingList: shoppingList },
      () => {
        this.saveShoppingList();
      });
  }
  createRecipe() {
    this.setState((prevState) => ({
      currentView: prevState.views.createRecipe
    }));
  }
  recipeClicked(recipeId) {
    var selectedRecipe = this.state.recipes.find((recipe) => { return recipe.id === recipeId; });
    if (this.state.creatingShoppingList) {
      let shoppingList = JSON.parse(JSON.stringify(this.state.shoppingList)),
        shoppingListIngredients = shoppingList.shoppingListIngredients,
        ingredients = JSON.parse(JSON.stringify(selectedRecipe.ingredients));;

      if (shoppingListIngredients.length > 0) {
        let matchedIngredients = ingredients.filter(ingredient => {
          return shoppingListIngredients.some(listItem => {
            return listItem.name === ingredient.name;
          })
        });

        shoppingListIngredients.forEach(listItem => {
          var matchedItem = matchedIngredients.find(x => listItem.name === x.name);
          if (matchedItem) {
            listItem.amount = Number(listItem.amount) + Number(matchedItem.amount);
          }
        });

        // let newItems = ingredients.filter((ingredient) => { return shoppingList.findIndex(ingredient.name) == -1; })
        const newItems = ingredients.filter(ingredient => {
          return !shoppingListIngredients.some(listItem => {
            return listItem.name === ingredient.name;
          })
        });

        shoppingList.shoppingListIngredients = [...shoppingListIngredients, ...newItems];
        this.setState((prevState) => ({
          shoppingList: shoppingList
        }));
      } else {
        shoppingList.shoppingListIngredients = ingredients;
        this.setState((prevState) => ({
          shoppingList: shoppingList
        }));
      }
    }
    else {
      this.setState((prevState) => ({
        currentView: prevState.views.viewRecipe,
        selectedRecipe: selectedRecipe
      }));
    }
  }
  editRecipe(recipeId) {
    var selectedRecipe = this.state.recipes.find((recipe) => { return recipe.id === recipeId });
    this.setState((prevState) => ({
      currentView: prevState.views.editRecipe,
      selectedRecipe: selectedRecipe
    }));
  }
  onSubmit(recipe) {
    if (this.state.currentView === this.state.views.createRecipe) {
      let newRecipe = recipe,
        recipes = this.state.recipes.slice();
      this.showLoading();
      firestore.collection('Recipes').doc().set(recipe)
        .then(docRef => {
          console.log("Recipe saved successfully");
          this.showLoading();
          this.getRecipes();
        })
        .catch(error => console.log("Error adding document: ", error));

    } else if (this.state.currentView === this.state.views.editRecipe) {
      let editedRecipe = recipe,
        recipes = this.state.recipes.slice(),
        currentIndex = recipes.findIndex((recipe) => { return recipe.id === editedRecipe.id });

      recipes[currentIndex] = editedRecipe;
      this.setState((prevState) => ({
        recipes: recipes,
        currentView: prevState.views.gridLayout
      }
      ));
    }
  }
  gridLayout() {
    this.setState((prevState) => ({
      currentView: prevState.views.gridLayout
    }));
  }
  listLayout() {
    this.setState((prevState) => ({
      currentView: prevState.views.listLayout
    }));
  }
  createShoppingListClicked() {
    if (!this.state.creatingShoppingList && !this.state.shoppingList) {
      this.getShoppingList(() => {
        this.setState((prev) => ({
          creatingShoppingList: prev.creatingShoppingList ? false : true
        }));
      });
    } else {
      this.setState((prev) => ({
        creatingShoppingList: prev.creatingShoppingList ? false : true
      }));
    }



  }
  addShoppingListExtras(shoppingListExtras) {
    if (shoppingListExtras) {
      let shoppingList = this.state.shoppingList;
      shoppingList.shoppingListExtras = shoppingListExtras;
      this.setState({
        shoppingList: shoppingList
      }, () => {
        this.saveShoppingList();
      });
    } else {
      return;
    }
  }
  logOutClicked(e) {
    e.preventDefault();
    auth.signOut();
  }
  componentDidMount() {
    this.setState({
      isLoading: false
    })
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState(() => ({ authUser }));
        this.getRecipes();
      } else {
        this.setState(() => ({ authUser: null }));
      }
    });
  }
  render() {
    var recipes,
      content,
      wrapper,
      nav = <RecipeNav
        createRecipe={this.createRecipe}
        createShoppingList={this.createShoppingListClicked}
        gridLayout={this.gridLayout}
        listLayout={this.listLayout}
        creatingShoppingList={this.state.creatingShoppingList} />;

    if (this.state.isLoading) {
      return (<div>
        Loading ...
      </div>);
    }

    if (this.state.authUser) {
      if (this.state.currentView === this.state.views.gridLayout || this.state.currentView === this.state.views.listLayout) {
        recipes = this.state.recipes.map((recipe, index) =>
          <RecipeItem onClick={this.recipeClicked} recipe={recipe} key={index} />,
        );
        content = <div id={this.state.currentView === this.state.views.gridLayout ? 'recipe-book-grid' : 'recipe-book-list'}>
          {recipes}
        </div>;
      }
      else if (this.state.currentView === this.state.views.createRecipe) {
        content = <RecipeForm recipe={this.state.newRecipe}
          // newIngredientName={this.state.newIngredientName}
          onChange={this.handleInputChanged}
          onClick={this.addIngredient}
          onDelete={this.ingredientOnDelete}
          onSubmit={this.onSubmit} />;
      }
      else if (this.state.currentView === this.state.views.viewRecipe) {
        content = <RecipeView recipe={this.state.selectedRecipe} onClick={this.editRecipe} />;
      }
      else if (this.state.currentView === this.state.views.editRecipe) {
        content = <RecipeForm recipe={this.state.selectedRecipe}
          newIngredientName={this.state.newIngredientName}
          onChange={this.handleInputChanged}
          onClick={this.addIngredient}
          onDelete={this.ingredientOnDelete}
          onSubmit={this.onSubmit} />;
      }
      if (this.state.creatingShoppingList && this.state.currentView !== this.state.views.createRecipe) {
        wrapper =
          <div>
            {nav}
            <div className="main-flex-wrapper">
              <div className="shopping-wrapper">
                <ShoppingList shoppingList={this.state.shoppingList.shoppingListIngredients}
                  shoppingListExtras={this.state.shoppingList.shoppingListExtras}
                  onClick={this.addShoppingListExtras}
                  deleteShoppingListIngredient={this.deleteShoppingListIngredient}
                  deleteShoppingListExtra={this.deleteShoppingListExtra}
                  crossOutShoppingListIngredient={this.crossOutShoppingListIngredient}
                  crossOutShoppingListExtra={this.crossOutShoppingListExtra}
                  createNewShoppingList={this.newShoppingList}
                />
              </div>
              <div className="recipe-book-wrapper">
                {content}
              </div>
            </div>
          </div>
      } else {
        wrapper =
          <div>
            {nav}
            <div className="main-wrapper"> {content}</div>
            <button className="recipe-button log-out-button" onClick={this.logOutClicked}>Log Out</button>
          </div>
      }
    } else {
      wrapper =
        <div>
          <Login />
        </div>
    }
    return (
      wrapper
    );
  }
}

{/* <div class="max-600">max-width: 600px</div>
          <div class="min-600">min-width: 600px</div>
          <div class="min-768">min-width: 768px</div>
          <div class="min-992">min-width: 992px</div>
          <div class="min-1200">min-width: 1200px</div>
       </div> */}
// ========================================

ReactDOM.render(<RecipePage />,
  document.getElementById('root')
);