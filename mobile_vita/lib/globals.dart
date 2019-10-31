  /*
  bool loginStatus = false;

  bool isLoggedIn(){
    return loginStatus;
  }
  void login(){
    loginStatus = true;
  }

  void logout(){
    loginStatus = false;
  }
  */

  var authToken = "";
  var emailGlob = "";

  var pantryItems = [];
  var selectedItem = {};
  
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
