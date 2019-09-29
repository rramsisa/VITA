import 'package:flutter/material.dart';

class ChangePasswordApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'VITA Change Password',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.purple
      ),
      home: ChangePasswordPage(title: 'VITA Forgot Change Page'),
    );
  }
}

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

  @override
  Widget build(BuildContext context) {
    final appBar = AppBar(
      title: Text('VITA'),
    );

    final bottomNavigationBar = BottomNavigationBar(
      currentIndex: 3, // this will be set when a new tab is selected
      selectedItemColor: Colors.deepPurple,
      unselectedItemColor: Colors.purple,
      type: BottomNavigationBarType.fixed,
      items: [
        BottomNavigationBarItem(
          icon: new Icon(Icons.fastfood),
          title: Text('Inventory')
        ),
        BottomNavigationBarItem(
          icon: new Icon(Icons.shopping_cart),
          title: Text('Lists')
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.assignment),
          title: Text('Recipes')
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.settings),
          title: Text('Settings')
        )
      ],
    );

    final oldPasswordField = TextField(
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
        onPressed: () {},
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
      bottomNavigationBar: bottomNavigationBar,
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
