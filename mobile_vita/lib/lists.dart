import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'addItem.dart';
import 'modifyItem.dart';
import 'globals.dart';
import 'dart:convert';

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
  TextEditingController newController = new TextEditingController();

  void initState() {
    updateLists();

    tabController = TabController(length: 3, vsync: this);
    tabController.addListener(updateView);
  }

  Future<void> updateLists() async {
    print("Updating Lists");

    //Make API call to get pantry & update list
    bool slSuccess = await shoppingListGet(context);

    //refresh recommended then call get
    bool refSuc = await recommendedListRefresh(context);
    bool rlSuccess;
    if(refSuc){
      rlSuccess = await recommendedListGet(context);
    }
    
    //refresh out of stock then call get
    bool oosSuc = await outOfStockListRefresh(context);
    bool osSuccess;
    if(oosSuc){
      osSuccess = await outOfStockListGet(context);
    }

    //bool success = await getPantryItems(context); // TODO: Change to proper calls
    if(slSuccess || rlSuccess || osSuccess){
      // Generate list on page done below
      setState(() {
        // Used to refresh the UI once the update is finished :)
      });
    }
  }

  void updateView(){
    updateLists();
    setState(() {
      
    });
    print("Updating View");
  }

  void addToShoppingList(itemName) async {
    print("Add to Shopping List Requested");
    print("Item to add: " + itemName);
    bool slSuccess = await shoppingListAddCall(itemName, context);
    if(slSuccess){
      updateLists();
    }
  }

  void removeFromShoppingList(itemName) async {
    print("Remove from Shopping List Requested");
    print("Item to remove: " + itemName);
    //shoppingListRemove(itemName);
    bool slSuccess = await shoppingListRemoveCall(itemName, context);
    if(slSuccess){
      bool slSuccess = await shoppingListGet(context);
      if(slSuccess){
        setState(() {
          
        });
      }
    }
    //updateView();
  }

  void manualShoppingList() async{
    print("Manual Add to Shopping List Requested");
    print("Item to add: " + newController.text);
    bool slSuccess = await shoppingListAddCall(newController.text, context);
    if(slSuccess){
      newController.text = "";
      bool slSuccess = await shoppingListGet(context);
      if(slSuccess){
        setState(() {
          
        });
      }
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

  Widget returnShoppingList(){
    return new ListView.builder(
      itemCount: shoppingList.length,
      itemBuilder: (BuildContext ctxt, int Index) {
        return new Card(
          child: ListTile(
            title: Text(shoppingList[Index]["name"]),
            // leading: Icon(Icons.cancel),
            trailing: Icon(Icons.done_outline),
            onLongPress: (){
              removeFromShoppingList(shoppingList[Index]["name"]);
            },
          )
        );
      },
    );
  }

  Widget returnTextField(){
    return TextField(
      controller: newController,
      style: new TextStyle(color: Colors.white),
      decoration: InputDecoration(
        fillColor: Colors.purple,
        hintText: "Add New Item",
        // border: OutlineInputBorder(),
        contentPadding: const EdgeInsets.all(20.0),
        suffixIcon: IconButton(
          icon: Icon(Icons.add_shopping_cart),
          onPressed: manualShoppingList,
        ),
      ),
    );
  }

  Widget returnRecommendedList(){
    return ListView.builder(
      itemCount: recommendedList.length,
      itemBuilder: (BuildContext ctxt, int Index) {
        return new Card(
          child: ListTile(
            title: Text(recommendedList[Index]["name"]),
            subtitle: Text("Will run out in about # days"),
            // leading: Icon(Icons.cancel),
            trailing: Icon(Icons.add_shopping_cart),
            onTap: (){
              addToShoppingList(recommendedList[Index]["name"]);
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
            title: Text(outOfStockList[Index]["name"]),
            subtitle: Text(outOfStockList[Index]["time"].toString()),
            // leading: Icon(Icons.cancel),
            trailing: Icon(Icons.add_shopping_cart),
            onTap: (){
              addToShoppingList(outOfStockList[Index]["name"]);
            },
          )
        );
      }
    );
  }

  Widget getTabBarPages() {
    return TabBarView(controller: tabController, children: <Widget>[
      // returnTextField(),
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
          // onTap: updateView(),
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
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(48.0),
        child: returnTextField()
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: getTabBar(),
        body: new RefreshIndicator(
          onRefresh: updateLists,
          child: getTabBarPages(),
        )
      );
  }
}
