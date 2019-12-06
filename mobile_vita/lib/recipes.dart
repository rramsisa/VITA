import 'package:flutter/material.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'package:url_launcher/url_launcher.dart';
import 'addItem.dart';
import 'modifyItem.dart';
import 'globals.dart';

class RecipesPage extends StatefulWidget {
  RecipesPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _RecipesPageState createState() => _RecipesPageState();
}

class _RecipesPageState extends State<RecipesPage> {

  void initState() {
    updateRecipes();
  }

  Future<void> updateRecipes() async {
    print("Updating Recipes");

    //Make API call to get pantry & update list
    bool success = await recipeItemsGet(context);
    if(success){
      // Generate list on page done below
      setState(() {
        // Used to refresh the UI once the update is finished :)
      });
    }
  }

  Future<void> navigateToRecipe(context, recipeID) async{
    print("Navigating to Recipe with id $recipeID");
    bool urlSuccess = await getRecipeLink(context, recipeID.toString());
    if(urlSuccess){
      if (await canLaunch(recipeLink)) {
        await launch(recipeLink);
      } else {
        throw 'Could not launch $recipeLink';
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: new RefreshIndicator(
        onRefresh: updateRecipes,
        child: new ListView.builder(
          itemCount: recipesList.length,
          itemBuilder: (BuildContext ctxt, int Index) {
            return new Card(
              child: ListTile(
                title: Text(recipesList[Index]["title"]),
                subtitle: Text(
                  'Number of Ingredients Used: ${recipesList[Index]["usedIngredientCount"].toString()}'
                ),
                leading: Image.network(recipesList[Index]["image"]),
                trailing: Icon(Icons.language),
                onTap: (){
                  navigateToRecipe(context, recipesList[Index]["id"]);
                },
              )
            );
          }
        ),
      )
    );
  }
}
