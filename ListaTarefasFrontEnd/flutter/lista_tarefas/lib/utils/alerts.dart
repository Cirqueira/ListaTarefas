
import 'package:flutter/material.dart';
import 'package:lista_tarefas/models/errors.dart';
import 'package:lista_tarefas/models/service_result.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Alerts {
  static Future<void> _alertPadrao(
    BuildContext context, {
    bool fecharClickFora = true,
    required String titleMessage,
    required Widget? content,
    double? width = 300,
    double? height,
    List<Widget>? actions,
    TextStyle? textStyle,
    MainAxisAlignment? actionsAlignment = MainAxisAlignment.start,
    EdgeInsetsGeometry? actionsPadding = const EdgeInsets.all(20),
    EdgeInsetsGeometry? titlePadding = const EdgeInsets.all(20),
    EdgeInsetsGeometry? contentPadding =
        const EdgeInsets.symmetric(horizontal: 20),
    AlignmentGeometry? alignment = Alignment.center,
  }) {
    return showDialog(
      context: context,
      barrierDismissible: fecharClickFora,
      builder: (BuildContext context) {
        return AlertDialog(
          alignment: alignment,
          elevation: 5,
          scrollable: true,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          titlePadding: titlePadding,
          contentPadding: contentPadding,
          actionsPadding: actionsPadding,
          actionsAlignment: actionsAlignment,
          insetPadding:
              const EdgeInsets.symmetric(horizontal: 40.0, vertical: 24.0),
          title: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text(
                titleMessage,
                textAlign: TextAlign.center,
                style: textStyle ??
                    const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
              ),
            ],
          ),
          actions: actions,
          content: SizedBox(
            height: height,
            width: width ?? 300,
            child: content,
          ),
        );
      },
    );
  }
  
  static Future<void> errors(
    BuildContext context,
    ServiceResult response, {
    void Function()? onConfirm,
    String titleMessage = "Erro",
    String botaoConfirmar = "Ok",
    bool fecharClickFora = true,
  }) {
    List<String> errorMessages = [];
    if (response.result != null && response.result is List<dynamic>) {    
      errorMessages = List<String>.from(
        (response.result as List<dynamic>).map((error) => error.toString()),
      );
    } else {
      errorMessages.add(Erros.erroInesperado);
    }

    return _alertPadrao(
      context,
      titleMessage: titleMessage,
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.max,
        children: errorMessages
            .map((String m) => Text(m,
                style: const TextStyle(
                  fontSize: 14,
                )))
            .toList(),
      ),
      actions: [
        botaoPrincipalAlert(
          context,
          semanticlabel: 'botaoFechar',
          text: botaoConfirmar,
          onPressed: onConfirm,
        ),
      ],
    );
  }

  static Widget botaoPrincipalAlert(
    BuildContext context, {
    required String semanticlabel,
    void Function()? onPressed,
    required String text,
    bool isExpanded = false,
    IconData? icon,
    FocusNode? focusNode,
  }) {
    var botao = Semantics(
      label: semanticlabel,
      child: ExcludeSemantics(
        child: TextButton(
          autofocus: true,
          style: TextButton.styleFrom(
            backgroundColor: Theme.of(context).colorScheme.background,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(5),
            ),
          ),
          onPressed: onPressed ?? () => Navigator.of(context).pop(),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (icon != null)
                Padding(
                  padding: const EdgeInsets.only(right: 10),
                  child: FaIcon(
                    icon,
                    color: Colors.white,
                    size: 16,
                  ),
                ),
              Text(
                text,
                style: const TextStyle(fontSize: 14, color: Colors.white),
              )
            ],
          ),
        ),
      ),
    );

    return isExpanded
        ? Expanded(
            child: Container(
                padding: const EdgeInsets.only(right: 2.5),
                height: 40,
                child: botao))
        : Container(
            padding: const EdgeInsets.only(right: 5),
            constraints: const BoxConstraints.expand(height: 40, width: 150),
            child: botao,
          );
  }

  static Future<void> erros(
    BuildContext context, {
    required List<dynamic> erros,
    void Function()? onConfirm,
    String titleMessage = "Ocorreu um erro",
    String botaoConfirmar = "Ok",
    bool fecharClickFora = true,
  }) {
    List<Widget> widgets = [];

    for (var erro in erros) {
      widgets.add(_alertContentMessage(erro));
      if (erros.indexOf(erro) != erros.length - 1) {
        widgets.add(const SizedBox(height: 15));
      }
    }

    return _alertPadrao(
      context,
      titleMessage: titleMessage,
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: widgets,
      ),
      actions: [
        botaoPrincipalAlert(
          context,
          semanticlabel: 'botaoFechar',
          text: botaoConfirmar,
          onPressed: onConfirm,
        ),
      ],
    );
  }

  static Text _alertContentMessage(String message) {
    return Text(
      message,
      style: const TextStyle(
        fontSize: 14,
      ),
    );
  }
}