// ignore_for_file: use_build_context_synchronously
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:lista_tarefas/utils/alerts.dart';
import 'package:lista_tarefas/utils/components.dart';
import 'package:lista_tarefas/widget/datepicker_widget.dart';
import 'package:lista_tarefas/widget/skeleton_cadastros.dart';
import '../entity/tarefas.dart';
import 'package:lista_tarefas/services/tarefa_service.dart';

class TaskForm extends StatefulWidget {
  const TaskForm({super.key, this.tarefaId, this.onClose});
  final int? tarefaId;
  final void Function()? onClose;

  @override
  State<TaskForm> createState() => _TaskFormState();
}

class _TaskFormState extends State<TaskForm> {
  final tarefaService = TarefaService();

  late Tarefa tarefa;

  bool isLoading = true;

  @override
  void initState() {
    super.initState();

    tarefa = Tarefa.getInstance();
    _formInitState();
  }

  bool get _ehEdicao {
    return widget.tarefaId != null;
  }

  _formInitState() async {
    if (_ehEdicao) {
      await _obterPorIdAsync(widget.tarefaId!);
    }

    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:
            _ehEdicao ? const Text('Editar Tarefa') : const Text('Nova Tarefa'),
        leading: BackButton(onPressed: _fecharTela),
      ),
      body: isLoading
          ? const SkeletonCadastros()
          : Padding(
              padding: const EdgeInsets.only(
                  top: 20, left: 40, right: 40, bottom: 40),
              child: Column(
                children: [
                  const SizedBox(
                    height: 10,
                  ),
                  Components.inputWithLabelInRow(
                      label: 'Título',
                      hint: 'Digite o título da tarefa',
                      autofocus: true,
                      controller: TextEditingController(text: tarefa.titulo),
                      onChanged: (text) {
                        tarefa.titulo = text;
                      }),
                  const SizedBox(
                    height: 15,
                  ),
                  Components.inputWithLabelInRow(
                      label: 'Descrição',
                      hint: 'Digite a descrição da tarefa',
                      controller: TextEditingController(text: tarefa.descricao),
                      onChanged: (text) {
                        tarefa.descricao = text;
                      }),
                  const SizedBox(
                    height: 15,
                  ),
                  DatePickerWidget(
                    labelText: 'Data Vencimento',
                    isFiltered: _ehEdicao,
                    isEditing: _ehEdicao,
                    initialDate: tarefa.datavencimento,
                    onDateSelected: (date) {
                      setState(() {
                        tarefa.datavencimento = date;
                      });
                    },
                  ),
                  const SizedBox(
                    height: 35,
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 50,
                          child: OutlinedButton(
                            onPressed: _fecharTela,
                            child: const Text("Cancelar"),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.only(left: 8.0),
                          height: 50,
                          child: ElevatedButton(
                            onPressed: () {
                              _ehEdicao
                                  ? _atualizarAsync(tarefa)
                                  : _adicionarAsync(tarefa);
                            },
                            child: _ehEdicao
                                ? const Text("Salvar")
                                : const Text("Adicionar"),
                          ),
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
    );
  }

  void _fecharTela() {
    if (widget.onClose != null) {
      widget.onClose!();
    }
    Navigator.of(context).pop();
  }

  Future _obterPorIdAsync(int tarefaId) async {
    var response = await tarefaService.obterPorIdAsync(id: tarefaId);

    if (response.statusCode == HttpStatus.ok) {
      tarefa = response.result as Tarefa;

      return;
    }
    await Alerts.errors(context, response);
  }

  Future _atualizarAsync(Tarefa tarefa) async {
    var response = await tarefaService.atualizarAsync(tarefa: tarefa);

    isLoading = false;

    if (response.statusCode == HttpStatus.ok) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Alterado com sucesso!'),
        ),
      );
      return;
    }
    await Alerts.errors(context, response);
  }

  Future _adicionarAsync(Tarefa tarefa) async {    
    var response = await tarefaService.adicionarAsync(tarefa: tarefa);

    if (response.statusCode == HttpStatus.ok) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Registro criado com sucesso.'),
        ),
      );
      return;
    }
    await Alerts.errors(context, response);    
  }
}
