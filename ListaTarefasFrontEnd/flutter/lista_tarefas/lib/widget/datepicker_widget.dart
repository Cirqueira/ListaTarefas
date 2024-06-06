import 'package:flutter/material.dart';
import 'package:lista_tarefas/utils/components.dart';
import 'package:lista_tarefas/utils/extension.dart';

class DatePickerWidget extends StatefulWidget {
  const DatePickerWidget(
      {super.key,
      required this.labelText,
      required this.onDateSelected,
      this.initialDate,
      required this.isFiltered,
      required this.isEditing});
  final String? labelText;
  final Function(DateTime) onDateSelected;
  final DateTime? initialDate;
  final bool isFiltered;
  final bool isEditing;

  @override
  State<DatePickerWidget> createState() => DatePickerWidgetState();
}

class DatePickerWidgetState extends State<DatePickerWidget> {
  @override
  Widget build(BuildContext context) {
    return Components.inputWithLabelInRow(
      label: widget.labelText!,
      controller: TextEditingController(text: widget.initialDate.toDateBr()),
      onTap: () => _selectDate(),
      readOnly: true,
      icon: Icons.calendar_today,
    );
  }

  Future<void> _selectDate() async {
 

    DateTime? picked = await showDatePicker(
      context: context,
      initialDate: widget.initialDate ?? DateTime.now(),
      firstDate:  (widget.isFiltered || widget.isEditing)
          ? DateTime(DateTime.now().year - 1)
          : DateTime.now(),
      lastDate: DateTime(DateTime.now().year + 5),
    );

    if (picked != null) {
      widget.onDateSelected(picked);
    }
  }
}
