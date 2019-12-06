import 'package:flutter/material.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'addItem.dart';
import 'modifyItem.dart';
import 'globals.dart';

class InventoryPage extends StatefulWidget {
  InventoryPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _InventoryPageState createState() => _InventoryPageState();
}

class _InventoryPageState extends State<InventoryPage> {

  void initState() {
    updatePantry();
  }

  Future<void> updatePantry() async {
    print("Updating Pantry");

    //Make API call to get pantry & update list
    bool success = await getPantryItems(context);
    if(success){
      // Generate list on page done below
      setState(() {
        // Used to refresh the UI once the update is finished :)
      });
    }
  }

  void modifyMove(itemID) async {
    print("Modify Item Requested");
    print("Item to modify: " + itemID);

    //Store item information as a global (logic to get actual item in globals)
    setSelectedItem(itemID);

    //Navigate to modify screen and populate
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ModifyItemPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: new RefreshIndicator(
        onRefresh: updatePantry,
        child: new ListView.builder(
          itemCount: pantryItems.length,
          itemBuilder: (BuildContext ctxt, int Index) {
            return new Card(
              child: ListTile(
                title: Text(pantryItems[Index]["name"]),
                subtitle: Text(
                  'Quantity: ${pantryItems[Index]["quantity"].toString()} \nLast Modified: ${DateTime.fromMillisecondsSinceEpoch(pantryItems[Index]["date"]).toString().substring(0,10)}'
                ),
                trailing: Icon(Icons.arrow_forward_ios),
                onTap: (){
                  modifyMove(pantryItems[Index]["_id"]);
                },
                isThreeLine: true,
              )
            );
          }
        )
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddItemPage()),
          );
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.purple,
      ),
    );
  }
}
