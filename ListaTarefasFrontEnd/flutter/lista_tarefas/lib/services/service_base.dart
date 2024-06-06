import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart';
import 'package:lista_tarefas/models/service_result.dart';
import 'package:lista_tarefas/services/model_base.dart';

abstract class ServiceBase {
  ServiceResult getListResult(ModelBase model, Response response) {
    if (response.statusCode == HttpStatus.ok) {
      return ServiceResult.success(
        response.statusCode,
        model.fromJsonToList(jsonDecode(response.body)),
      );
    }
    return _getErrorResult(response);
  }

  ServiceResult getResult(ModelBase model, Response response) {
    if (response.statusCode == HttpStatus.ok) {
      return ServiceResult.success(
        response.statusCode,
        model.fromJson(jsonDecode(response.body)),
      );
    }

    return _getErrorResult(response);
  }

  ServiceResult _getErrorResult(Response response) {
    return ServiceResult(
      statusCode: response.statusCode,
      result: response.body.isEmpty ? null : jsonDecode(response.body),
      messages: (jsonDecode(response.body) as List<dynamic>).cast<String>(),
    );
  }
}
