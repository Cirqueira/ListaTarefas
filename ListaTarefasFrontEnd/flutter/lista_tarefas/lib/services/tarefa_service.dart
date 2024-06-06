import 'package:lista_tarefas/models/service_result.dart';
import 'package:lista_tarefas/services/http_service_base.dart';
import 'package:lista_tarefas/services/service_base.dart';
import '../entity/tarefas.dart';

class TarefaService extends ServiceBase{
  final HttpServiceBase client = HttpServiceBase("Tarefa");

  Future<ServiceResult> adicionarAsync({required Tarefa tarefa}) async{
    var response = await client.post("/AdicionarAsync", body: tarefa);

    return getResult(Tarefa.getInstance(), response);
  }
  
  Future<ServiceResult> atualizarAsync({required Tarefa tarefa}) async{
    var response = await client.put("/AtualizarAsync", body: tarefa.toJson());

    return getResult(Tarefa.getInstance(), response);
  }
  
  Future<ServiceResult> apagarAsync({required int id}) async{
    var response = await client.put("/ApagarAsync/$id");
    
    return ServiceResult(statusCode: response.statusCode, result: true, messages: []);  
  }
  
  Future<ServiceResult> obterPorIdAsync({required int id}) async{
    var response = await client.get("/ObterPorIdAsync/$id");

    return getResult(Tarefa.getInstance(), response);
  }

  Future<ServiceResult> obterListaAsync(
    bool? completa, 
    bool? incompleta, 
    DateTime? dataincio, 
    DateTime? datafim) 
  async{
    var endpoint = "/ObterListaAsync"; 

    if ((completa != false) || (incompleta != false) || ((dataincio != null) && (datafim != null))){
      endpoint += "?"; 
    }

    if (completa != false) {
      if (endpoint.length == 17){
        endpoint += "completa=$completa";
      }      
    }  

    if (incompleta != false) {
      if (endpoint.length > 17){
        endpoint += "&incompleta=$incompleta";  
      } else {
        endpoint += "incompleta=$incompleta";
      }      
    }

    if ((dataincio != null) && (datafim != null)) {
      if (endpoint.length > 17) {
        endpoint += "&datainicio=$dataincio";
        endpoint += "&datafim=$datafim";
      } else {
        endpoint += "datainicio=$dataincio";
        endpoint += "&datafim=$datafim";
      }      
    }

    var response = await client.get(endpoint);

    return getListResult(Tarefa.getInstance(), response);    
  }
}