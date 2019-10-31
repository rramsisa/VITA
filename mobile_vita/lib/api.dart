import 'dart:convert';
//mport 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'globals.dart';
import 'dart:io';

Future<bool> loginCall(String email, String pass, BuildContext context) async {
  var call;
  if (Platform.isAndroid) {
    call =
        "http://10.0.2.2:3000/api/user/login/"; //base route for the api calls
  } else {
    call = "http://localhost:3000/api/user/login/";
  }

  //var bString = "{'email':'" + email + "', 'password':'" + pass + "'}";
  //var hString = "{'Content-Type':'application/x-www-form-urlencoded'}";

  //Map<String, dynamic> body = jsonDecode(bString);
  //Map<String, dynamic> hdrs = json.decode(hString);
  //new Uri.http("10.0.2.2:3000", call)
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

logoutCall() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  await pref.setString('auth-token', "");
  setAuthToken("");
  await pref.setString('email', "");
  setEmail("");
}

Future<bool> signUpCall(
    String name, String email, String pass, BuildContext context) async {
  var call;
  if (Platform.isAndroid) {
    call =
        "http://10.0.2.2:3000/api/user/register/"; //base route for the api calls
  } else {
    call = "http://localhost:3000/api/user/register/";
  }

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

Future<bool> changePassCall(
    String pass, String newPass, String email, BuildContext context) async {
  var call;
  if (Platform.isAndroid) {
    call =
        "http://10.0.2.2:3000/api/user/changePassword/"; //base route for the api calls
  } else {
    call = "http://localhost:3000/api/user/changePassword/";
  }

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

Future<bool> getPantryItems(BuildContext context) async{
  var call;
  if (Platform.isAndroid) {
    call =
        "http://10.0.2.2:3000/api/myitemsInfo/"; //base route for the api calls
  } else {
    call = "http://localhost:3000/api/myitemsInfo/";
  }

  try {
    final response = await http.get(call,
        // body: json.encode({'newPassword': newPass, 'email': email, 'password': pass}),
        headers: {"Content-Type": "application/json", "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJhM2RlNGFlN2I3MzMyNTlmZmE2YTciLCJpYXQiOjE1NzI1NDU5NTEsImV4cCI6MTU3MjYzMjM1MX0.OjeCfs8XFvDdjV9SQn3xu0MXKOL7-fU3mdl7762Y6k8"});
    // Map<String, dynamic> bod = json.decode(response.body);
    if (response.statusCode == 200) {
      print("Response: " + response.body);
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
