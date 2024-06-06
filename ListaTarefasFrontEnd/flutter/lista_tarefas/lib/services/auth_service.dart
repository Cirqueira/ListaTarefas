import 'dart:convert';
import 'dart:io';
import 'package:lista_tarefas/models/service_result.dart';
import 'package:lista_tarefas/services/http_service_base.dart';
import 'package:lista_tarefas/utils/utils.dart';
import '../entity/usuario.dart';

class AuthService {
  final HttpServiceBase client = HttpServiceBase("Auth");

  Future<ServiceResult> logarAsync({required Usuario usuario}) async {
    var response = await client.post("/Logar", body: usuario, authorization: false);

    if (response.statusCode == HttpStatus.ok) {
      var map = jsonDecode(response.body) as Map<String, dynamic>;
   
      Utils.salvarToken(map['acessToken']);

      return ServiceResult(statusCode: response.statusCode, result: true, messages: []);  
    }        
    
    var stringList = convertListDynamicToString(response.body);
    
    return ServiceResult(statusCode: response.statusCode, result: stringList, messages: []);
  }  

  List<String> convertListDynamicToString(String body){
    List<dynamic> dynamicList = json.decode(body);
    return dynamicList.cast<String>();
  }
}