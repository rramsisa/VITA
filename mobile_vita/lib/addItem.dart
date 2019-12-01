import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:mobile_vita/api.dart';
import 'globals.dart';
import 'inventory.dart' as inventory;

class AddItemPage extends StatefulWidget {
  AddItemPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _AddItemPageState createState() => _AddItemPageState();
}

class _AddItemPageState extends State<AddItemPage> {
  TextEditingController itemNameController = new TextEditingController();
  TextEditingController itemAmountController = new TextEditingController();

  void addItem() async {
    print("Add Item Requested");
    print("Item Name: ${itemNameController.text}");
    print("Item Quantity: ${itemAmountController.text}");

    // Call API to successfully add item to pantry & update list
    bool addSuccess = await manual(itemNameController.text, 1,
        int.parse(itemAmountController.text), context);
        setState(() {
          
        });
        if(addSuccess){
          Navigator.pop(context);
        }
        
  }

  @override
  Widget build(BuildContext context) {
    final appBar = GradientAppBar(
        title: Text('Add Item'),
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
        onPressed: addItem,
        child: Text("Add Item",
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
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
