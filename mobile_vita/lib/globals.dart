
  var authToken = "";
  var emailGlob = "";

  var recipeLink = "";

  var pantryItems = [];
  var scanners = [];
  var alexas = [];
  var selectedItem = {};
  var shoppingList = [];// ["S Item One", "S Item Two", "S Item Three"]; //TODO: temp. Should be changed
  var recommendedList = []; //["R Item One", "R Item Two", "R Item Three"]; //TODO: temp. Should be changed
  var outOfStockList = []; // ["O Item One", "O Item Two", "O Item Three"]; //TODO: temp. Should be changed

  var recipesList = [];

  void setAuthToken(var t){
    authToken = t;
  }

  void setEmail(var e){
    emailGlob = e;
  }

  void setRecipeLink(var l){
    recipeLink = l;
  }

  void setPantry(var p){
    pantryItems = p;
    print("Pantry Updated");
    print(p);
  }

  void setShoppingList(var l){
    shoppingList = l;
    print("Shopping List Updated");
    print(l);
  }

  void shoppingListAdd(var a){
    //shoppingList.add(a);
    print("New Shopping List: ");
    print(shoppingList);
  }

  void shoppingListRemove(var a){
    shoppingList.remove(a);
    print("New Shopping List: ");
    print(shoppingList);
  }

  void setRecommendedList(var r){
    recommendedList = r;
    print("Recommended List Updated");
    print(r);
  }

  void setOutOfStockList(var o){
    outOfStockList = o;
    print("Out of Stock List Updated");
    print(o);
  }

  void setRecipes(var r){
    recipesList = r;
    print("Recipes Updated");
    print(r);
  }

  void setScanners(var s){
    scanners = s;
    print("Scanners Updated");
    print(s);
  }

  void setAlexas(var a){
    alexas = a;
    print("Alexas Updated");
    print(a);
  }

  void setSelectedItem(String name){
    bool flag = false;
    for(var i = 0; i < pantryItems.length; i++){
      // String item = pantryItems[i]["_id"];
      if(pantryItems[i]["_id"].compareTo(name) == 0){
        selectedItem = pantryItems[i];
        print("SelectedItem Global set successfully");
        flag = true;
        break;
      }
    }

    if(!flag){
      print("Error setting selectedItem");
    }
  }
