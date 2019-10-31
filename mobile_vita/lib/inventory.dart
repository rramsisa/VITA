import 'package:flutter/material.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'addItem.dart';
import 'modifyItem.dart';

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

  void modifyMove(itemName) async {
    print("Modify Item Requested");
    print("Item to modify: " + itemName);

    // TODO: Store item information as a global

    //TODO: Navigate to modify screen and populate
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ModifyItemPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: <Widget>[
          Card(
            child: ListTile(
              // leading: FlutterLogo(size: 72.0),
              title: Text('Food Item Name'),
              subtitle: Text(
                'Quantity: ## \nLast Modified: ##/##/####'
              ),
              trailing: Icon(Icons.arrow_forward_ios),
              onTap: (){
                modifyMove("Food Item 1");
              },
              isThreeLine: true,
            )
          ),
          Card(
            child: ListTile(
              // leading: FlutterLogo(size: 72.0),
              title: Text('Food Item Name'),
              subtitle: Text(
                'Quantity: ## \nLast Modified: ##/##/####'
              ),
              trailing: Icon(Icons.arrow_forward_ios),
              onTap: (){
                modifyMove("Food Item 1");
              },
              isThreeLine: true,
            )
          ),
          Card(
            child: ListTile(
              // leading: FlutterLogo(size: 72.0),
              title: Text('Food Item Name'),
              subtitle: Text(
                'Quantity: ## \nLast Modified: ##/##/####'
              ),
              trailing: Icon(Icons.arrow_forward_ios),
              onTap: (){
                modifyMove("Food Item 1");
              },
              isThreeLine: true,
            )
          ),
        ],
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
