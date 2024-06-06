import 'package:flutter/material.dart';
import 'package:lista_tarefas/screens/login.dart';

class MyApp extends StatelessWidget {
  static const home = '/';

  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lista de Tarefas',
      theme: ThemeData(primarySwatch: Colors.teal),
      routes: {
        home:(context)=>Login(),
      },
    );
  }
}