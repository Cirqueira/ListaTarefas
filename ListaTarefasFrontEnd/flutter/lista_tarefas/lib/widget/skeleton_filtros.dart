import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class SkeletonFiltros extends StatelessWidget {
  const SkeletonFiltros({super.key});

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      highlightColor: Colors.white,
      baseColor: Colors.grey.shade400,
      child: Container(
        margin: const EdgeInsets.all(7.5),
        child: Wrap(
          alignment: WrapAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: 20,
                  width: 20,
                  color: Colors.grey,
                ),
                const SizedBox(width: 5,),
                Container(
                  width: 40,
                  height: 10,
                  color: Colors.grey,
                ),
                const SizedBox(width: 30,),
                Container(
                  height: 20,
                  width: 20,
                  color: Colors.grey,
                ),
                const SizedBox(width: 5,),
                Container(
                  width: 40,
                  height: 10,
                  color: Colors.grey,
                ),
              ],
            ),
            const SizedBox(height: 35,),
            Container(
              height: 20,
              width: double.infinity,
              color: Colors.grey,
            ), 
            const SizedBox(height: 35,),
            Container(
              height: 20,
              width: double.infinity,
              color: Colors.grey,
            ), 
            const SizedBox(height: 35,),
            Row( 
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  height: 20,
                  width: 80,
                  color: Colors.grey,
                ),
                const SizedBox(width: 10),
                Container(
                  height: 20,
                  width: 80,
                  color: Colors.grey,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}