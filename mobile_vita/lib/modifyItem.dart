import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:http/http.dart';
import 'package:mobile_vita/api.dart';
import 'inventory.dart';
import 'globals.dart';

class ModifyItemPage extends StatefulWidget {
  ModifyItemPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _ModifyItemPageState createState() => _ModifyItemPageState();
}

class _ModifyItemPageState extends State<ModifyItemPage> {
  TextEditingController itemNameController = new TextEditingController();
  TextEditingController itemAmountController = new TextEditingController();

  void initState() {
    setFields();
  }

  void setFields() async {
    print("Setting text fields");
    itemNameController.text = selectedItem["name"];
    itemAmountController.text = selectedItem["quantity"].toString();
  }
  
  void modifyItem() async {
    //print("Add Item Requested");
    print("Item Name: ${itemNameController.text}");
    print("Item Quantity: ${itemAmountController.text}");
    
    //handling no modify in backend using front end info.
    
    int dif = selectedItem["quantity"] - int.parse(itemAmountController.text);
    int f;
    if(dif >= 0){ //dif is pos
      f = 0;
      //should remove abs value of amount
    }
    else{ //dif is neg
      f = 1; //should add abs value
      dif *= -1;
    }

    // TODO: Dom - Call API to successfully mod item in pantry
    bool modSuccess = await manual(itemNameController.text, f,
        dif, context);

    //Nav back to original page
    
    Navigator.pop(context);
  }

  void removeItem() async {
    // Get global item set
    print("Remove Item Requested");
    print("Item to remove: ");

    //Make appropriate API call to remove item from list
    /*
    bool removeSuccess = await manual(itemNameController.text, 0,
        int.parse(itemAmountController.text), context);
    */
    
    bool delSuccess = await deleteCall(itemNameController.text, context);
    //Nav back to original page
    if(delSuccess){
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final appBar = GradientAppBar(
        title: Text('Modify Item'),
        backgroundColorStart: Colors.deepPurple,
        backgroundColorEnd: Colors.purple,
        automaticallyImplyLeading: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).maybePop();
          },
        ));

    final itemNameField = TextField(
      controller: itemNameController,
      obscureText: false,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "Item Name",
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.purpleAccent, width: 2.0),
          ),
          border:
              OutlineInputBorder(borderRadius: BorderRadius.circular(10.0))),
    );

    final itemAmountField = TextField(
      controller: itemAmountController,
      obscureText: false,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "Item Amount",
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
        onPressed: modifyItem,
        child: Text("Modify Item",
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );

    final removeButton = Material(
      borderRadius: BorderRadius.circular(10.0),
      color: Colors.red,
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: removeItem,
        child: Text("Remove Item",
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
                  SizedBox(height: 25.0),
                  itemNameField,
                  SizedBox(height: 25.0),
                  itemAmountField,
                  SizedBox(height: 35.0),
                  sendButton,
                  SizedBox(height: 10.0),
                  removeButton
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
