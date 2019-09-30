import 'package:flutter/material.dart';
import 'settings.dart';

class ChangePasswordPage extends StatefulWidget {
  ChangePasswordPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _ChangePasswordPageState createState() => _ChangePasswordPageState();
}

class _ChangePasswordPageState extends State<ChangePasswordPage> {
  TextEditingController oldPasswordController = new TextEditingController();
  TextEditingController newPasswordController = new TextEditingController();

  void changePassword(){
    print("Change Password Requested");
    print("Old Password: ${oldPasswordController.text}");
    print("New Password: ${newPasswordController.text}");

    //TODO - Dom: Make appropriate request on the server (you'll need the login account info too :) )

    //Upon successful return
    Navigator.maybePop(context);
  }

  @override
  Widget build(BuildContext context) {

    final appBar = AppBar(
      title: Text('Change Password'),
      automaticallyImplyLeading: true,
      leading: IconButton(icon:Icon(Icons.arrow_back),
        onPressed: (){
          Navigator.of(context).maybePop();
        },
      )
    );

    final oldPasswordField = TextField(
      controller: oldPasswordController,
      obscureText: true,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "Old Password",
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.purpleAccent, width: 2.0),
          ),
          border:
              OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0)
              )
      ),
    );

    final newPasswordField = TextField(
      controller: newPasswordController,
      obscureText: true,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "New Password",
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.purpleAccent, width: 2.0),
          ),
          border:
              OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0)
              )
      ),
    );

    final sendButton = Material(
      borderRadius: BorderRadius.circular(10.0),
      color: Colors.purple,
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: changePassword,
        child: Text("Change Password",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.white, 
              fontWeight: FontWeight.bold)
        ),
      ),
    );

    return Scaffold(
      appBar: appBar,
      // bottomNavigationBar: bottomNavigationBar,
      body: Center(
        child: Container(
          color: Colors.white,
          child: Padding(
            padding: const EdgeInsets.all(36.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(height: 25.0),
                oldPasswordField,
                SizedBox(height: 25.0),
                newPasswordField,
                SizedBox(height: 35.0,),
                sendButton,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
