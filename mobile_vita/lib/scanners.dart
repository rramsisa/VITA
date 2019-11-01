import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'addScanner.dart';

class ScannerPage extends StatefulWidget {
  ScannerPage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _ScannerPageState createState() => _ScannerPageState();
}

class _ScannerPageState extends State<ScannerPage> {
  void removeScanner(itemName) async {
    print("Remove Item Requested");
    print("Scanner to remove: " + itemName);

    //TODO - Make appropriate API call to remove scanner from list (& Refresh)
  }


  @override
  Widget build(BuildContext context) {
    final appBar = GradientAppBar(
      title: Text('Manage Scanners'),
      backgroundColorStart: Colors.deepPurple,
      backgroundColorEnd: Colors.purple,
      automaticallyImplyLeading: true,
      leading: IconButton(
        icon: Icon(Icons.arrow_back),
        onPressed: () {
          Navigator.of(context).maybePop();
        },
    ));
    return Scaffold(
      appBar: appBar,
      body: ListView(
        children: <Widget>[
          Card(
            child: ListTile(
              leading: Icon(Icons.scanner, size: 40.0),
              title: Text('Scanner Name 1'),
              subtitle: Text(
                'ID: ###-###-###'
              ),
              trailing: IconButton(
                icon: Icon(Icons.clear),
                tooltip: 'Remove Item',
                onPressed: () {
                  removeScanner("id1");
                },
              ),
            )
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.scanner, size: 40.0),
              title: Text('Scanner Name 2'),
              subtitle: Text(
                'ID: ###-###-###'
              ),
              trailing: IconButton(
                icon: Icon(Icons.clear),
                tooltip: 'Remove Item',
                onPressed: () {
                  removeScanner("id2");
                },
              ),
            )
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.scanner, size: 40.0),
              title: Text('Scanner Name 3'),
              subtitle: Text(
                'ID: ###-###-###'
              ),
              trailing: IconButton(
                icon: Icon(Icons.clear),
                tooltip: 'Remove Item',
                onPressed: () {
                  removeScanner("id3");
                },
              ),
            )
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddScannerPage()),
          );
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.purple,
      ),
    );
  }
}
