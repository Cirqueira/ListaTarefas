import 'package:flutter/material.dart';

class Components {
  static Text titleMedium({required String text}) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 25,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  static Widget inputWithLabelInRow({
    required String label,
    TextEditingController? controller,
    String? hint,
    void Function(String)? onChanged,
    bool autofocus = false,
    void Function()? onTap,
    bool readOnly = false,
    IconData? icon,
  }) {
    return Row(
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,            
          ),
        ),
        const SizedBox(
          width: 17,
        ),
        Expanded(
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: hint,
              prefixIcon: icon != null ? Icon(icon) : null,
            ),            
            autofocus: autofocus,
            onChanged: onChanged,
            onTap: onTap,
            readOnly: readOnly,
          ),
        ),
      ],
    );
  }
}
