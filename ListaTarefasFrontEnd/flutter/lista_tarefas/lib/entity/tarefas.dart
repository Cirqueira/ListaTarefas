import 'dart:js_interop';
import 'package:lista_tarefas/services/model_base.dart';

class Tarefa extends ModelBase {
  int? id;
  String? titulo;
  String? descricao;
  DateTime? datavencimento;
  bool completa;

  Tarefa(
      {required this.id,
      required this.titulo,
      required this.descricao,
      required this.datavencimento,
      required this.completa});

  Map<String, dynamic> toJson() {
    return {
      "id": id ?? 0,
      "titulo": titulo ?? '',
      "descricao": descricao ?? '',
      "dataVencimento": datavencimento.isNull ? null : datavencimento!.toIso8601String(),
      "completa": completa,
    };
  }

  factory Tarefa.fromMap(Map<String, dynamic> map) {
    return Tarefa(
      id: map['id'],
      titulo: map['titulo'],
      descricao: map['descricao'],
      datavencimento: map['datavencimento'],
      completa: map['completa'],
    );
  }

  factory Tarefa.getInstance() {
    return Tarefa(
        id: 0,
        titulo: '',
        descricao: '',
        datavencimento: null,
        completa: false);
  }
  
  @override
  ModelBase fromJson(Map<String, dynamic> json) {
    return Tarefa(
      id: json["id"],
      titulo: json["titulo"],
      descricao: json["descricao"],
      datavencimento: json['dataVencimento'] == null
          ? null
          : DateTime.parse(json['dataVencimento']),
      completa: json["completa"],
    );
  }

  @override
  List<Tarefa> fromJsonToList(Iterable list) {
    return List<Tarefa>.from(list.map((model) => fromJson(model)));
  }
}
