
  var authToken = "";
  var emailGlob = "";

  var pantryItems = [];
  var scanners = [];
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

  void setScanners(var s){
      scanners = s;
      print("Scanners Updated");
      print(s);
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
