import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class SkeletonCadastros extends StatelessWidget {
  const SkeletonCadastros({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      highlightColor: Colors.white,
      baseColor: Colors.grey.shade400,
      child: Container(
        margin: const EdgeInsets.only(top: 40, left: 40, right: 40, bottom: 40),
        child: Column(
          children: [
            const SizedBox(
              height: 10,
            ),
            Container(
              height: 20,
              width: double.infinity,
              color: Colors.grey,
            ),
            const SizedBox(
              height: 30,
            ),
            Container(
              height: 20,
              width: double.infinity,
              color: Colors.grey,
            ),
            const SizedBox(
              height: 30,
            ),
            Container(
              height: 20,
              width: double.infinity,
              color: Colors.grey,
            ),
    
            const SizedBox(
              height: 50,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: Container(
                    height: 50,
                    width: 150,
                    color: Colors.grey,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Container(
                    height: 50,
                    width: 150,
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}