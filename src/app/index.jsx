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
import { RecipeBook } from './RecipeBook.jsx';
import { ShoppingList } from './ShoppingList.jsx';
import { Login } from './login.jsx';
import Textarea from "react-textarea-autosize";
import './css/modal.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      authUser: null,
      currentView: 1,
      views: { home: 1, shoppingList: 2, createRecipe: 3, editRecipe: 4, viewRecipe: 5 },
      currentLayout: 1,
      layouts: { grid: 1, list: 2 },
      selectedRecipe: {},
      recipes: [],
      newRecipe: {
        name: "",
        description: "",
        newIngredientName: "",
        method: "",
        ingredients: [],
        imgUrl: ""
      },
      creatingShoppingList: false,
      saveShoppingList: "saved",
      shoppingList: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.recipeClicked = this.recipeClicked.bind(this);
    this.modalWrapperClicked = this.modalWrapperClicked.bind(this);
    this.modalWrapperFromFormClicked = this.modalWrapperFromFormClicked.bind(this);
    this.homeClicked = this.homeClicked.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.gridLayout = this.gridLayout.bind(this);
    this.listLayout = this.listLayout.bind(this);
    this.layoutTogglerClicked = this.layoutTogglerClicked.bind(this);
    this.createShoppingListClicked = this.createShoppingListClicked.bind(this);
    this.addShoppingListExtras = this.addShoppingListExtras.bind(this);
    this.logOutClicked = this.logOutClicked.bind(this);
    this.saveShoppingList = this.saveShoppingList.bind(this);
    this.saveShoppingListClicked = this.saveShoppingListClicked.bind(this);
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
    // this.showLoading();
    firestore.collection('Recipes').get().then(querySnapshot => {
      let recipes = querySnapshot.docs.map(doc => {
        let recipe = doc.data();
        recipe.id = doc.id;
        return recipe;
      });
      this.setState((prevState) => ({
        recipes: recipes,
        currentView: prevState.views.home
      }
      ));
      this.hideLoading();
    });
  }
  getShoppingList(callback) {
    // this.showLoading();
    firestore.collection('ShoppingList').where("shoppingListUsed", '==', false).get().then(querySnapshot => {
      if (querySnapshot.docs.length > 0) {
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
  createNewShoppingList(callback) {
    const dateCreated = new Date(),
      id = IdCreator.createAutoId();
    let shoppingList = {
      id: id,
      dateCreated: dateCreated,
      shoppingListUsed: false,
      shoppingListIngredients: [],
      shoppingListExtras: []
    }

    firestore.collection('ShoppingList').doc(shoppingList.id).set(shoppingList)
      .then(docRef => {
        console.log("ShoppingListSaved saved successfully");
        this.setState({
          shoppingList: shoppingList
        });

      })
      .catch(error => console.log("Error adding document: ", error));
  }
  saveShoppingList(callback) {
    const shoppingList = this.state.shoppingList;
    if (shoppingList.id) {
      // this.showLoading();
      firestore.collection('ShoppingList').doc(shoppingList.id).set(shoppingList)
        .then(() => {

          if (callback) {
            callback();
          }
        })
        .catch(error => console.log("Error adding document: ", error));
    }
    return "Saved";
  }
  saveShoppingListClicked(callback) {
    const shoppingList = this.state.shoppingList;
    if (shoppingList.id) {
      // this.showLoading();
      firestore.collection('ShoppingList').doc(shoppingList.id).set(shoppingList)
        .then(() => {
          // super lazy way to update the state on the child to refresh
          // debugger;
          // this.setState((prevState) => ({
          //   saveShoppingList: prevState.saveShoppingList === "saved" ? "savedd" : "saved"
          // }));
          callback();
        })
        .catch(error => console.log("Error adding document: ", error));
    }
    return "Saved";
  }
  newShoppingList(callback) {
    let confirmResponse = confirm("Are you sure you would like to start a new shopping list?");
    if (confirmResponse) {
      let shoppingList = this.state.shoppingList;
      shoppingList.shoppingListUsed = true;
      this.setState({
        shoppingList: shoppingList
      });
      this.saveShoppingList(() => {
        this.createNewShoppingList();
        if (callback) {
          callback()
        }
      });
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
    if (this.state.currentView === this.state.views.shoppingList) {
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
        this.setState({
          shoppingList: shoppingList
        }, () => {
          this.saveShoppingList();
        });

      } else {
        shoppingList.shoppingListIngredients = ingredients;
        this.setState({
          shoppingList: shoppingList
        }, () => {
          this.saveShoppingList();
        });
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
  deleteRecipe(recipeId) {
    firestore.collection('Recipes').doc(recipeId).delete()
      .then(docRef => {
        console.log("Recipe deleted successfully");
        this.getRecipes();
      })
      .catch(error => console.log("Error deleting document: ", error));
  }
  onSubmit(recipe) {
    if (this.state.currentView === this.state.views.createRecipe) {
      let newRecipe = recipe,
        recipes = this.state.recipes.slice();
      // this.showLoading();
      firestore.collection('Recipes').doc().set(recipe)
        .then(docRef => {
          console.log("Recipe saved successfully");
          // this.showLoading();
          this.getRecipes();
        })
        .catch(error => console.log("Error adding document: ", error));

    } else if (this.state.currentView === this.state.views.editRecipe) {

      firestore.collection('Recipes').doc(recipe.id).set(recipe)
        .then(docRef => {
          console.log("Recipe saved successfully");
        })
        .catch(error => console.log("Error adding document: ", error));

      let editedRecipe = recipe,
        recipes = this.state.recipes.slice(),
        currentIndex = recipes.findIndex((recipe) => { return recipe.id === editedRecipe.id });

      recipes[currentIndex] = editedRecipe;
      this.setState((prevState) => ({
        recipes: recipes,
        currentView: prevState.views.home
      }
      ));
    }
  }
  layoutTogglerClicked() {
    this.setState((prevState) => ({
      currentLayout: prevState.currentLayout === prevState.layouts.grid ? prevState.layouts.list : prevState.layouts.grid
    }));
  }
  modalWrapperFromFormClicked(event) {
    if (event.target.className == "modal-wrapper") {
      let x = confirm("Are you sure you want to stop editing the recipe? Any unsaved changes will be lost");
      if (x) {
        this.setState((prevState) => ({
          currentView: prevState.views.home
        }));
      }
    }
  }
  modalWrapperClicked(event) {
    if (event.target.className == "modal-wrapper") {
      this.setState((prevState) => ({
        currentView: prevState.views.home
      }));
    }
  }
  homeClicked() {
    this.setState((prevState) => ({
      currentView: prevState.views.home
    }));
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
    this.setState((prev) => ({
      currentView: this.state.views.shoppingList
    }));
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
  logOutClicked() {
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
        this.getShoppingList();
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
        homeClicked={this.homeClicked}
        logOutClicked={this.logOutClicked}
      />;

    if (this.state.isLoading) {
      return (<div>
        Loading ...
      </div>);
    }

    if (this.state.authUser) {
      if (this.state.currentView === this.state.views.home) {

        content =
          <RecipeBook recipes={this.state.recipes}
            recipeClicked={this.recipeClicked}
            currentLayout={this.state.currentLayout}
            layoutGrid={this.state.layouts.grid}
            layoutTogglerClicked={this.layoutTogglerClicked}
          />;
      }
      else if (this.state.currentView === this.state.views.createRecipe) {
        content =
          <div>
            <div class="modal-wrapper" onClick={this.modalWrapperFromFormClicked}>
              <RecipeForm recipe={this.state.newRecipe}
                // newIngredientName={this.state.newIngredientName}
                onChange={this.handleInputChanged}
                onClick={this.addIngredient}
                onDelete={this.ingredientOnDelete}
                onSubmit={this.onSubmit} />
            </div>
            <RecipeBook recipes={this.state.recipes}
              recipeClicked={this.recipeClicked}
              currentLayout={this.state.currentLayout}
              layoutGrid={this.state.layouts.grid}
              layoutTogglerClicked={this.layoutTogglerClicked}
            />
          </div>;
      }
      else if (this.state.currentView === this.state.views.viewRecipe) {
        content =
          <div>
            <div class="modal-wrapper" onClick={this.modalWrapperClicked}>
              <RecipeView recipe={this.state.selectedRecipe} onEditClicked={this.editRecipe} onDeleteClicked={this.deleteRecipe} />
            </div>
            <RecipeBook recipes={this.state.recipes}
              recipeClicked={this.recipeClicked}
              currentLayout={this.state.currentLayout}
              layoutGrid={this.state.layouts.grid}
              layoutTogglerClicked={this.layoutTogglerClicked}
            />
          </div>;
      }
      else if (this.state.currentView === this.state.views.editRecipe) {
        content =
          <div>
            <div class="modal-wrapper" onClick={this.modalWrapperFromFormClicked}>
              <RecipeForm
                isEdit={true}
                onDeleteClicked={this.deleteRecipe}
                recipe={this.state.selectedRecipe}
                newIngredientName={this.state.newIngredientName}
                onChange={this.handleInputChanged}
                onClick={this.addIngredient}
                onDelete={this.ingredientOnDelete}
                onSubmit={this.onSubmit}
                onDeleteRecipe={this.deleteRecipe} />;
             </div>
            <RecipeBook recipes={this.state.recipes}
              recipeClicked={this.recipeClicked}
              currentLayout={this.state.currentLayout}
              layoutGrid={this.state.layouts.grid}
              layoutTogglerClicked={this.layoutTogglerClicked}
            />
          </div>;
      }
      else if (this.state.currentView === this.state.views.shoppingList) {
        content =
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
                saveShoppingListClicked={this.saveShoppingListClicked}
              />
            </div>
            <div className="recipe-book-wrapper">
              <RecipeBook isShoppingList={true} recipes={this.state.recipes}
                recipeClicked={this.recipeClicked}
                currentLayout={this.state.currentLayout}
                layoutGrid={this.state.layouts.grid}
                layoutTogglerClicked={this.layoutTogglerClicked}
              />
            </div>
          </div>;
      }
      wrapper =
        <div>
          {nav}
          <div className="main-wrapper"> {content}</div>
        </div>
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