import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:mobile_vita/api.dart';
import 'settings.dart';
import 'globals.dart';

class AddAlexaPage extends StatefulWidget {
  AddAlexaPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _AddAlexaPageState createState() => _AddAlexaPageState();
}

class _AddAlexaPageState extends State<AddAlexaPage> {
  TextEditingController alexaIDController = new TextEditingController();
  TextEditingController alexaNameController = new TextEditingController();

  void addItem() async {
    print("Link Alexa Requested");
    print("Alexa Name: ${alexaNameController.text}");
    print("Alexa ID: ${alexaIDController.text}");

    // Call API to successfully link alexa to account
    bool pairSuccess = await pairAlexa(alexaIDController.text, context);
    if(pairSuccess){
        Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final appBar = GradientAppBar(
        title: Text('Add Alexa'),
        backgroundColorStart: Colors.deepPurple,
        backgroundColorEnd: Colors.purple,
        automaticallyImplyLeading: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).maybePop();
          },
        ));

    final alexaIDField = TextField(
      controller: alexaIDController,
      obscureText: false,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "Alexa Account ID",
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.purpleAccent, width: 2.0),
          ),
          border:
              OutlineInputBorder(borderRadius: BorderRadius.circular(10.0))),
    );

    final sendButton = Material(
      borderRadius: BorderRadius.circular(10.0),
      color: Colors.purple,
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: addItem,
        child: Text("Link Alexa Account",
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
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
            child: Center(
              child: ListView(
                shrinkWrap: true,
                children: <Widget>[
                  // alexaNameField,
                  // SizedBox(height: 25.0),
                  alexaIDField,
                  SizedBox(height: 35.0),
                  sendButton,
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
