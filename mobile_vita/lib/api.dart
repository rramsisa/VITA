import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'globals.dart';
import 'dart:io';


// Use these to switch paths for testing
// var callPath = "localhost";
var callPath = "167.71.145.115"; //digital ocean droplet

//-----------------------API FOR LOGIN-----------------------------------------
Future<bool> loginCall(String email, String pass, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/user/login/"; //base route for the api calls
  /* 
  if (Platform.isAndroid) {
    call =
        "http://10.0.2.2:3000/api/user/login/"; //base route for the api calls
  } else {
    call = "http://localhost:3000/api/user/login/";
  }
  */
  try {
    final response = await http.post(call,
        body: json.encode({'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json"}); //, headers: hdrs);
    //return response; //return http response, this includes status code and body
    Map<String, dynamic> ref = json.decode(response.body);

    if (response.statusCode == 200) {
      // When successful, route to inner pages
      var aToken = ref["token"];
      SharedPreferences pref = await SharedPreferences.getInstance();
      await pref.setString('auth-token', aToken); //save atoken on disk
      await pref.setString('email', email);

      setAuthToken(aToken); //in globals class auth token saved
      setEmail(email);

      return true;
    } else {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(ref["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR LOGOUT-----------------------------------------
logoutCall() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  await pref.setString('auth-token', "");
  setAuthToken("");
  await pref.setString('email', "");
  setEmail("");
}


//-----------------------API FOR SIGNUP-----------------------------------------
Future<bool> signUpCall(
    String name, String email, String pass, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/user/register/";
  try {
    final response = await http.post(call,
        body: json.encode({'name': name, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json"});
    Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR CHANGE PASSWORD-----------------------------------------
Future<bool> changePassCall(
    String pass, String newPass, String email, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/user/changePassword/";
  try {
    final response = await http.post(call,
        body: json
            .encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR PANTRY ITEMS-----------------------------------------
Future<bool> getPantryItems(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/myitemsInfo/";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      setPantry(json.decode(response.body));
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR MODIFY-----------------------------------------
Future<bool> manual(
    String name, int flag, int quantity, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/manual/";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'name': name, 'flag': flag, 'quantity': quantity}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR SCANNER PAIR-----------------------------------------
Future<bool> pair(
    String id, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/raspi/pair/";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'device': id}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR SCANNER UNPAIR-----------------------------------------
Future<bool> unpairCall(
    String id, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/raspi/unpair/";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'device': id}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}

//-----------------------API FOR SCANNER PAIR-----------------------------------------
Future<bool> pairAlexa(
    String id, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/alexa/pair/";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'alexaID': id}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR SCANNER UNPAIR-----------------------------------------
Future<bool> unpairAlexa(
    String id, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/alexa/unpair/";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'alexaID': id}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}

//-----------------------API FOR ALEXA RETREIVE-----------------------------------------
Future<bool> getAlexas(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/user/alexa/";
  try {
    final response = await http.get(call,
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    if (response.statusCode == 200) {
      setAlexas(json.decode(response.body)["alexas"]); 
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}

//-----------------------API FOR SCANNER RETREIVE-----------------------------------------
Future<bool> getScanners(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/user/scanner/";
  try {
    final response = await http.get(call,
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    if (response.statusCode == 200) {
      setScanners(json.decode(response.body)["devices"]);
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR DELETE-----------------------------------------
Future<bool> deleteCall(
    String name, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/item/deleteItem/";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'name': name}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}

//-----------------------API FOR getShoppingList-----------------------------------------
Future<bool> shoppingListGet(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/list/getShoppingList";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print("respnse body: " + response.body);
      setShoppingList(json.decode(response.body)["list"]);
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR addToShoppingList-----------------------------------------
Future<bool> shoppingListAddCall(
    String name, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/list/addToShoppingList";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'name': name}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR removeFromShoppingList-----------------------------------------
Future<bool> shoppingListRemoveCall(
    String name, BuildContext context) async {
  var call;
  call = "http://$callPath:3000/api/list/removeFromShoppingList";
  print(call);
  try {
    print("before await");
    final response = await http.post(call,
        body: json
            .encode({'name': name}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    print("after call");
    Map<String, dynamic> bod = json.decode(response.body);
    print(bod);
    if (response.statusCode == 200) {
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}


//-----------------------API FOR getRecommendedList-----------------------------------------
Future<bool> recommendedListGet(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/list/getSoonOutOfStockList";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print("respnse body: " + response.body);
      setRecommendedList(json.decode(response.body)["list"]);
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}



//-----------------------API FOR recommendedListRefresh-----------------------------------------
Future<bool> recommendedListRefresh(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/list/refreshSoonOutOfStockList";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print("response body: " + response.body);
      //setShoppingList(json.decode(response.body)["list"]);
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}




//-----------------------API FOR getOutOfStockList-----------------------------------------
Future<bool> outOfStockListGet(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/list/getOutOfStockList";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print("respnse body: " + response.body);
      setOutOfStockList(json.decode(response.body));
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}



//-----------------------API FOR outOfStockListRefresh-----------------------------------------
Future<bool> outOfStockListRefresh(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/list/refreshOutOfStockList";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print("respnse body: " + response.body);
      //setShoppingList(json.decode(response.body)["list"]);
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}




//-----------------------API FOR PANTRY ITEMS-----------------------------------------
Future<bool> recipeItemsGet(BuildContext context) async{
  var call;
  call = "http://$callPath:3000/api/recipes/recipe";
  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      // print(response.body);
      setRecipes(json.decode(response.body)["message"]);
      return true;
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}

Future<String> getRecipeLink(BuildContext context, String id) async{
  var call;
  call = "http://$callPath:3000/api/recipes/recipeLink";
  try {
    final response = await http.post(call,
        body: json.encode({'id': id}),
        headers: {"Content-Type": "application/json", "auth-token": authToken});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print(response.body);
      return(json.decode(response.body)["link"]);
    } else {
      //error, display message according
      print(response.statusCode);
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              // title: Text(bod["message"]),
            );
          });
    }
    return false;
  } catch (exception) {
    print(exception);
    return false;
  }
}