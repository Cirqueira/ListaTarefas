// ignore_for_file: use_build_context_synchronously

import 'dart:io';
import 'dart:js_interop';
import 'package:flutter/material.dart';
import 'package:lista_tarefas/entity/tarefas.dart';
import 'package:lista_tarefas/screens/task_form.dart';
import 'package:lista_tarefas/services/tarefa_service.dart';
import 'package:lista_tarefas/services/future_builder_service.dart';
import 'package:lista_tarefas/utils/alerts.dart';
import 'package:lista_tarefas/utils/extension.dart';
import 'package:lista_tarefas/widget/datepicker_widget.dart';
import 'package:lista_tarefas/widget/skeleton_filtros.dart';
import 'package:lista_tarefas/widget/skeleton_tarefas.dart';

class TaskList extends StatefulWidget {
  TaskList({super.key});

  @override
  State<TaskList> createState() => _TaskListState();
}

class _TaskListState extends State<TaskList> {
  final TextEditingController editingController = TextEditingController();
  final TextEditingController dataInicialController = TextEditingController();
  final TextEditingController dataFinalController = TextEditingController();

  final tarefaService = TarefaService();
  final futureBuilderService = FutureBuilderClass();

  late List<Tarefa> listatarefas;
  late Tarefa tarefa;
  late Future<dynamic> _futureData;

  bool isLoading = true;

  bool filterCompleta = false;
  bool filterIncompleta = false;
  DateTime? filterDataInicioVencimento;
  DateTime? filterDataFimVencimento;

  @override
  void initState() {
    super.initState();

    tarefa = Tarefa.getInstance();
    listatarefas = [];

    _futureData = _obterListaAsync(false, false, null, null);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de Tarefas'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 15.0),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: () {
                    _adicionarTarefa(context);
                  },
                ),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: <Widget>[
          _montarFiltros(),
          _montarLista(),
        ],
      ),
    );
  }

  Widget _montarFiltros() {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          border: Border.all(
              color: isLoading ? Colors.grey.shade400 : Colors.teal,
              width: 1,
              style: BorderStyle.solid),
          borderRadius: const BorderRadius.all(
            Radius.circular(10),
          ),
        ),
        child: futureBuilderService.futureBuilder(
          _futureData,
          const SkeletonFiltros(),
          _exibirFiltros(),
          _exibirFiltros(),
        ),
      ),
    );
  }

  Wrap _exibirFiltros() {
    return Wrap(
      alignment: WrapAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Checkbox(
              value: filterCompleta,
              onChanged: (bool? newValue) {
                setState(() {
                  filterCompleta = newValue!;
                });
              },
            ),
            const Text('Completas'),
            const SizedBox(width: 30),
            Checkbox(
              value: filterIncompleta,
              onChanged: (bool? newValue) {
                setState(() {
                  filterIncompleta = newValue!;
                });
              },
            ),
            const Text('Incompletas'),
          ],
        ),
        DatePickerWidget(
          labelText: 'Data Vencimento Inicial: ',
          initialDate: filterDataInicioVencimento,
          isEditing: false,
          isFiltered: true,
          onDateSelected: (date) {
            setState(() {
              filterDataInicioVencimento = date;
            });
          }, 
        ),
        DatePickerWidget(
          labelText: 'Data Vencimento Final:   ',
          initialDate: filterDataFimVencimento,
          isEditing: false,
          isFiltered: true,
          onDateSelected: (date) {
            setState(() {
              filterDataFimVencimento = date;
            });
          },
        ),
        const SizedBox(
          height: 15,
          width: 15,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            OutlinedButton(
              onPressed: () {
                filterCompleta = false;
                filterIncompleta = false;
                filterDataInicioVencimento = null;
                filterDataFimVencimento = null;              
                _atualizarListagem(filterCompleta, filterIncompleta,
                    filterDataInicioVencimento, filterDataFimVencimento);
              },
              child: const Text('Remover Filtros'),
            ),
            const SizedBox(width: 10),
            ElevatedButton(
              onPressed: () {
                _ehValidoFiltroPeriodo(
                        filterDataInicioVencimento, filterDataFimVencimento)
                    ? _atualizarListagem(
                        filterCompleta,
                        filterIncompleta,
                        filterDataInicioVencimento,
                        filterDataFimVencimento)
                    : null;
              },
              child: const Text('Filtrar'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _montarLista() {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: isLoading ? Colors.grey.shade400 : Colors.teal,
              width: 1,
            ),
            borderRadius: const BorderRadius.all(
              Radius.circular(10),
            ),
          ),
          child: futureBuilderService.futureBuilder(
            _futureData,
            const SkeletonTarefas(),
            _exibirLista(),
            _exibirListaVazia(),
          ),
        ),
      ),
    );
  }

  ListView _exibirLista() {
    return ListView.separated(
      shrinkWrap: true,
      itemCount: listatarefas.length,
      itemBuilder: (context, i) {
        var tarefa = listatarefas[i];
        return ListTile(
          leading: Checkbox(
            value: tarefa.completa,
            onChanged: (bool? newValue) async {
              setState(() {
                tarefa.completa = newValue!;
              });
              await _atualizarAsync(tarefa);
              _isWithFilter(filterCompleta, filterIncompleta,
                      filterDataInicioVencimento, filterDataFimVencimento)
                  ? await _atualizarListagem(
                      filterCompleta,
                      filterIncompleta,
                      filterDataInicioVencimento,
                      filterDataFimVencimento)
                  : null;
            },
          ),
          title: Text(
            style: TextStyle(
              decoration: tarefa.completa
                  ? TextDecoration.lineThrough
                  : TextDecoration.none,
              fontSize: 18,
              color: Colors.black,
              fontStyle: tarefa.completa ? FontStyle.italic : FontStyle.normal,
            ),
            tarefa.titulo!,
          ),
          subtitle: Stack(
            children: [
              Row(
                children: [
                  Column(
                    children: [
                      Container(
                        height: 18,
                        width: 100,
                        decoration: BoxDecoration(
                          color: tarefa.completa
                              ? Colors.green
                              : (tarefa.datavencimento != null &&
                                      tarefa.datavencimento!.isBefore(
                                          DateUtils.dateOnly(DateTime.now())))
                                  ? Colors.red
                                  : Colors.amber,
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Text(
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: Colors.white,
                            ),
                            tarefa.completa
                                ? 'Concluída'
                                : (tarefa.datavencimento != null &&
                                        tarefa.datavencimento!.isBefore(
                                            DateUtils.dateOnly(DateTime.now())))
                                    ? 'Em atraso'
                                    : 'Em andamento'),
                      ),
                    ],
                  ),
                  const SizedBox(width: 10),
                  Text(
                    style: TextStyle(
                      decoration: tarefa.completa
                          ? TextDecoration.lineThrough
                          : TextDecoration.none,
                      color: Colors.black,
                      fontStyle:
                          tarefa.completa ? FontStyle.italic : FontStyle.normal,
                    ),
                    tarefa.datavencimento != null
                        ? "Vencimento: ${tarefa.datavencimento.toDateBr()}"
                        : '',
                  ),
                ],
              ),
            ],
          ),
          trailing: SizedBox(
            width: 100,
            child: Row(
              children: [
                IconButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => TaskForm(
                          tarefaId: tarefa.id,
                          onClose: () {
                            _isWithFilter(
                                    filterCompleta,
                                    filterIncompleta,
                                    filterDataInicioVencimento,
                                    filterDataFimVencimento)
                                ? _obterListaAsync(
                                    filterCompleta,
                                    filterIncompleta,
                                    filterDataInicioVencimento,
                                    filterDataFimVencimento)
                                : _obterListaAsync(
                                    false, false, null, null);
                          },
                        ),
                      ),
                    );
                  },
                  icon: const Icon(
                    Icons.edit_outlined,
                    color: Colors.blueAccent,
                  ),
                ),
                IconButton(
                  onPressed: () {
                    _apagar(listatarefas[i].id!, listatarefas[i].titulo!, context);
                  },
                  icon: const Icon(
                    Icons.delete_outline,
                    color: Color.fromARGB(255, 141, 0, 0),
                  ),
                ),
              ],
            ),
          ),
        );
      },
      separatorBuilder: (context, i) {
        return const Padding(
          padding: EdgeInsets.only(left: 20.0, right: 20.0),
          child: Divider(
            color: Colors.grey,
            thickness: 0.5,
          ),
        );
      },
    );
  }

  Widget _exibirListaVazia() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Nenhum item encontrado',
            style: TextStyle(fontSize: 24),
          ),
          const SizedBox(height: 40),
          FloatingActionButton(
            onPressed: () => _adicionarTarefa(context),
            child: const Icon(Icons.add),
          ),
        ],
      ),
    );
  }

  void _adicionarTarefa(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TaskForm(
          onClose: () => _isWithFilter(filterCompleta, filterIncompleta,
                  filterDataInicioVencimento, filterDataFimVencimento)
              ? _obterListaAsync(filterCompleta, filterIncompleta,
                  filterDataInicioVencimento, filterDataFimVencimento)
              : _obterListaAsync(false, false, null, null),
        ),
      ),
    );
  }

  Future _atualizarAsync(Tarefa tarefa) async {
    var response = await tarefaService.atualizarAsync(tarefa: tarefa);
    isLoading = false;

    if (response.statusCode != HttpStatus.ok) {
      setState(() {
        tarefa.completa = !tarefa.completa;
      });

      await Alerts.errors(context, response);
    }

    return;
  }

  Future _obterListaAsync(bool? completa, bool? incompleta,
      DateTime? datainicio, DateTime? datafim) async {
    setState(() {
      isLoading = true;
    });

    var response = await tarefaService.obterListaAsync(
        completa, incompleta, datainicio, datafim);

    List<Tarefa> result = [];

    if (response.statusCode == HttpStatus.ok) {
      setState(() {
        isLoading = false;

        result = response.result as List<Tarefa>;
        listatarefas = result;
      });
      return response;
    }
    await Alerts.errors(context, response);
  }

  void _apagar(int id, String titulo, BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return AlertDialog(
          title: Text('Deseja remover a tarefa: $titulo?'),
          actions: [
            OutlinedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () {
                _apagarAsync(id);
              },
              child: const Text('Confirmar'),
            ),
          ],
        );
      },
    );
  }

  bool _isWithFilter(bool? completa, bool? incompleta, DateTime? dataincio,
      DateTime? datafim) {
    if ((completa != false) ||
        (incompleta != false) ||
        ((dataincio != null) && (datafim != null))) {
      return true;
    }
    return false;
  }

  bool _ehValidoFiltroPeriodo(DateTime? datainicio, DateTime? datafim) {
    if (datainicio != null || datafim != null) {
      if (datainicio.isNull) {
        Alerts.erros(context,
            titleMessage: 'Atenção', erros: ['Selecione o período inicial!']);
        return false;
      } else if (datafim.isNull) {
        Alerts.erros(context,
            titleMessage: 'Atenção', erros: ['Selecione o período final!']);
        return false;
      } else if (datainicio!.isAfter(datafim!)) {
        Alerts.erros(context, titleMessage: 'Atenção', erros: [
          'O periodo inicial não pode ser maior que o período final!'
        ]);

        return false;
      }
    }
    return true;
  }

  Future _apagarAsync(int id) async {
    var response = await tarefaService.apagarAsync(id: id);

    if (response.statusCode == HttpStatus.ok) {
      Navigator.of(context).pop();

      _isWithFilter(filterCompleta, filterIncompleta,
              filterDataInicioVencimento, filterDataFimVencimento)
          ? _obterListaAsync(filterCompleta, filterIncompleta,
              filterDataInicioVencimento, filterDataFimVencimento)
          : _obterListaAsync(false, false, null, null);

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Removido com sucesso!'),
        ),
      );
      return;
    }
    await Alerts.errors(context, response);
  }

  _atualizarListagem(bool filterCompleta, bool filterIncompleta,
      DateTime? filterDataInicioVencimento, DateTime? filterDataFimVencimento) {
    setState(() {
      _futureData = Future.value(
        _obterListaAsync(filterCompleta, filterIncompleta,
            filterDataInicioVencimento, filterDataFimVencimento),
      );
    });
  }

}
