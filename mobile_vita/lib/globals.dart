
  var authToken = "";
  var emailGlob = "";

  var pantryItems = [];
  var scanners = [];
  var alexas = [];
  var selectedItem = {};
  var shoppingList = ["S Item One", "S Item Two", "S Item Three"]; //TODO: temp. Should be changed
  var recommendedList = ["R Item One", "R Item Two", "R Item Three"]; //TODO: temp. Should be changed
  var outOfStockList = ["O Item One", "O Item Two", "O Item Three"]; //TODO: temp. Should be changed

  var recipesList = [
    {
      "id": 933310,
      "title": "2 Ingredient Instant Pot Applesauce",
      "image": "https://spoonacular.com/recipeImages/933310-312x231.jpg",
      "imageType": "jpg",
      "usedIngredientCount": 1,
      "missedIngredientCount": 0,
      "missedIngredients": [],
      "usedIngredients": [
          {
              "id": 9003,
              "amount": 11,
              "unit": "large",
              "unitLong": "larges",
              "unitShort": "large",
              "aisle": "Produce",
              "name": "apples",
              "original": "11 Apples, peeled and chopped in large pieces *see note",
              "originalString": "11 Apples, peeled and chopped in large pieces *see note",
              "originalName": "11 Apples, peeled and chopped in large pieces *see note",
              "metaInformation": [
                  "peeled",
                  "chopped"
              ],
              "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
          }
      ],
      "unusedIngredients": [],
      "likes": 0
    },
    {
      "id": 933311,
      "title": "3 Ingredient Instant Pot Mac and Cheese",
      "image": "https://www.cookingclassy.com/wp-content/uploads/2018/07/stovetop-macaroni-cheese-1.jpg",
      "imageType": "jpg",
      "usedIngredientCount": 4,
      "missedIngredientCount": 0,
      "missedIngredients": [],
      "usedIngredients": [
          {
              "id": 9003,
              "amount": 11,
              "unit": "large",
              "unitLong": "larges",
              "unitShort": "large",
              "aisle": "Produce",
              "name": "apples",
              "original": "11 Apples, peeled and chopped in large pieces *see note",
              "originalString": "11 Apples, peeled and chopped in large pieces *see note",
              "originalName": "11 Apples, peeled and chopped in large pieces *see note",
              "metaInformation": [
                  "peeled",
                  "chopped"
              ],
              "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
          }
      ],
      "unusedIngredients": [],
      "likes": 0
    },
  ];
  
  void setAuthToken(var t){
    authToken = t;
  }

  void setEmail(var e){
    emailGlob = e;
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

// TODO: These are manipulating the local array, should probably be done differently, or update entire list with API call
  void shoppingListAdd(var a){
    shoppingList.add(a);
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
