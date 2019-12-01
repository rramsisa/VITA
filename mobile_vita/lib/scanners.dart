import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:mobile_vita/api.dart';
import 'package:mobile_vita/main.dart';
import 'addScanner.dart';
import 'globals.dart';

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
  void initState() {
    updateScanners();
  }

  void updateScanners() async {
    print("Updating Scanners");

    //Make API call to get pantry & update list
    bool success = await getScanners(context);
    if(success){
      // Generate list on page done below
      setState(() {
        // Used to refresh the UI once the update is finished :)
      });
    }
  }

  void removeScanner(id) async {
    print("Remove Item Requested");
    print("Scanner to remove: " + id);

    //Make appropriate API call to remove scanner from list (& Refresh)

    bool unpairSuccess = await unpairCall(id, context); // This needs to be remove 
    if(unpairSuccess){
      // Generate list on page done below
      setState(() {
        // Used to refresh the UI once the update is finished :)
        scanners = List.from(scanners);
      });
    }
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
      body: new ListView.builder(
        itemCount: scanners.length,
        itemBuilder: (BuildContext ctxt, int Index) {
          return new Card(
            child: ListTile(
              leading: Icon(Icons.scanner, size: 40.0),
              title: Text(scanners[Index]),
              trailing: IconButton(
                icon: Icon(Icons.clear),
                tooltip: 'Remove Item',
                onPressed: () {
                  removeScanner(scanners[Index]);
                },
              ),
            )
          );
        }
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
