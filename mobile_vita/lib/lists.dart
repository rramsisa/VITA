import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'addItem.dart';
import 'modifyItem.dart';
import 'globals.dart';

class ListsPage extends StatefulWidget {
  ListsPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _ListsPageState createState() => _ListsPageState();
}

class _ListsPageState extends State<ListsPage> with SingleTickerProviderStateMixin{
  TabController tabController;

  void initState() {
    updateLists();

    tabController = TabController(length: 3, vsync: this);
  }

  void updateLists() async {
    print("Updating Lists");

    //Make API call to get pantry & update list
    bool success = await getPantryItems(context); // TODO: Change to proper call
    if(success){
      // Generate list on page done below
      setState(() {
        // Used to refresh the UI once the update is finished :)
      });
    }
  }

  void addToShoppingList(itemName) async {
    print("Add to Shopping List Requested");
    print("Item to add: " + itemName);
    shoppingListAdd(itemName);
  }

  void removeFromShoppingList(itemName) async {
    print("Remove from Shopping List Requested");
    print("Item to remove: " + itemName);
    shoppingListRemove(itemName);
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

  Widget returnShoppingList(){
    print(shoppingList);
    return ListView.builder(
      itemCount: shoppingList.length,
      itemBuilder: (BuildContext ctxt, int Index) {
        return new Card(
          child: ListTile(
            title: Text(shoppingList[Index]),
            // leading: Icon(Icons.cancel),
            trailing: Icon(Icons.done_outline),
            onTap: (){
              removeFromShoppingList(shoppingList[Index]);
            },
          )
        );
      }
    );
  }

  Widget returnRecommendedList(){
    return ListView.builder(
      itemCount: recommendedList.length,
      itemBuilder: (BuildContext ctxt, int Index) {
        return new Card(
          child: ListTile(
            title: Text(recommendedList[Index]),
            subtitle: Text("Will run out in about # days"),
            // leading: Icon(Icons.cancel),
            trailing: Icon(Icons.add_shopping_cart),
            onTap: (){
              addToShoppingList(recommendedList[Index]);
            },
          )
        );
      }
    );
  }

  Widget returnOutOfStockList(){
    return ListView.builder(
      itemCount: outOfStockList.length,
      itemBuilder: (BuildContext ctxt, int Index) {
        return new Card(
          child: ListTile(
            title: Text(outOfStockList[Index]),
            subtitle: Text("##/##/####"),
            // leading: Icon(Icons.cancel),
            trailing: Icon(Icons.add_shopping_cart),
            onTap: (){
              addToShoppingList(outOfStockList[Index]);
            },
          )
        );
      }
    );
  }

  Widget getTabBarPages() {
    return TabBarView(controller: tabController, children: <Widget>[
      returnShoppingList(),
      returnRecommendedList(),
      returnOutOfStockList()
    ]);
  }

  Widget getTabBar(){
    return AppBar(
      backgroundColor: Colors.deepPurple,
      flexibleSpace: SafeArea(
        child: new TabBar(
          controller: tabController,
          tabs:[
            new Tab(
              text: "Shopping",
              
            ),
            new Tab(
              text: "Recommended",
            ),
            new Tab(
              text: "Out of Stock",
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: getTabBar(),
        body: getTabBarPages(),
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
