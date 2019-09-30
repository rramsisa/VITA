import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'settings.dart';
import 'placeholderWidget.dart';

class InnerApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'VITA Inner Pages',
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
      home: InnerPage(title: 'VITA Inner Pages'),
    );
  }
}

class InnerPage extends StatefulWidget {
  InnerPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _InnerPageState createState() => _InnerPageState();
}

class _InnerPageState extends State<InnerPage> {
  int _currentIndex = 0;
  final List<Widget> _children = [
    PlaceholderWidget(Colors.white), // Inventory Page
    PlaceholderWidget(Colors.grey[100]), // Lists Page
    PlaceholderWidget(Colors.grey[200]), // Recipes Page
    SettingsPage(),
  ];

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {

    final appBar = GradientAppBar(
      title: Text('VITA'),
      automaticallyImplyLeading: false,
      backgroundColorStart: Colors.deepPurple,
      backgroundColorEnd: Colors.purple,
      // leading: IconButton(icon:Icon(Icons.arrow_back),
      //   onPressed:() => Navigator.pop(context, false),
      // )
    );

    final bottomNavigationBar = BottomNavigationBar(
      selectedItemColor: Colors.deepPurple,
      unselectedItemColor: Colors.purple,
      type: BottomNavigationBarType.fixed,
      onTap: onTabTapped, // new
      currentIndex: _currentIndex, // new
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

    final tempButton = Material(
      borderRadius: BorderRadius.circular(10.0),
      color: Colors.white,
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: () {},
        child: Text("Content Coming Soon",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.black, 
              fontWeight: FontWeight.bold)
        ),
      ),
    );

    return Scaffold(
      appBar: appBar,
      body: _children[_currentIndex], // new
      bottomNavigationBar: bottomNavigationBar,
    );
  }
}
