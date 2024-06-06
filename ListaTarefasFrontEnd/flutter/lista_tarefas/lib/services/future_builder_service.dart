import 'package:flutter/material.dart';
import 'package:lista_tarefas/entity/tarefas.dart';
import 'package:lista_tarefas/models/service_result.dart';

class FutureBuilderClass {
  FutureBuilder<dynamic> futureBuilder(Future<dynamic> function,
      Widget skeleton, Widget widgetBody, Widget widgetBodyEmpty) {
    return FutureBuilder<dynamic>(
      future: function,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting){
          return skeleton;
        }
        if (snapshot.hasError) {
          return Text('Erro: ${snapshot.error}');
        }

        if (snapshot.hasData) {
          var response = snapshot.data as ServiceResult;
          var result = response.result as List<Tarefa>;
          if (result.isEmpty){
            return widgetBodyEmpty;
          }        

          return widgetBody;
        }

        return widgetBodyEmpty;
      },
    );
  }
}
