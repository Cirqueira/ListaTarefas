// ignore_for_file: use_build_context_synchronously
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:lista_tarefas/entity/usuario.dart';
import 'package:lista_tarefas/screens/task_list.dart';
import 'package:lista_tarefas/services/auth_service.dart';
import 'package:lista_tarefas/utils/alerts.dart';

class Login extends StatefulWidget {
  Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final authService = AuthService();
  final usuario = Usuario.getInstance();
  bool _clicked = false; 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.only(top: 60, left: 40, right: 40),
        color: Colors.white,
        child: ListView(
          children: <Widget>[
            SizedBox(
              width: 128,
              height: 128,
              child: Image.asset("lib/assets/login.jpg"),
            ),
            TextFormField(
              autofocus: true,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(
                labelText: "E-mail",
                labelStyle: TextStyle(
                  color: Colors.black38,
                  fontWeight: FontWeight.w400,
                  fontSize: 20,
                ),
              ),
              style: const TextStyle(fontSize: 20),
              onChanged: (value) {
                usuario.email = value;                              
              },
            ),
            const SizedBox(height: 10),
            TextFormField(
              keyboardType: TextInputType.text,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: "Senha",
                labelStyle: TextStyle(
                  color: Colors.black38,
                  fontWeight: FontWeight.w400,
                  fontSize: 20,
                ),
              ),
              style: const TextStyle(fontSize: 20),
              onChanged: (value) {
                usuario.password = value;
              },
            ),
            const SizedBox(height: 40),
            Container(
              height: 60,
              alignment: Alignment.centerLeft,
              child: SizedBox.expand(
                child: ElevatedButton(
                  onPressed: _clicked ? null : () async 
                  {
                    setState(() => _clicked = true);                     

                    var response = await authService.logarAsync(usuario: usuario);
                    if (response.statusCode == HttpStatus.ok) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => TaskList(),                          
                        ), 
                      );

                      setState(() => _clicked = false);
                     
                      return;
                    } 
                    await Alerts.errors(context, response);
                    setState(() => _clicked = false);
                  },
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(
                        "Login",
                         style: TextStyle(
                           fontWeight: FontWeight.bold,
                           color: Colors.white,
                           fontSize: 20,                           
                         ),                         
                      ),
                      SizedBox(
                        height: 28,
                        width: 28,
                      )
                    ],
                  )
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
