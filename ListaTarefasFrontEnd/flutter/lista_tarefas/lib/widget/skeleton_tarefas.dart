import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class SkeletonTarefas extends StatelessWidget {
  const SkeletonTarefas({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: 6,
      itemBuilder: (_, index){
        return Shimmer.fromColors(
          highlightColor: Colors.white,
          baseColor: Colors.grey.shade400,
          child: Container(
            margin: const EdgeInsets.all(7.5),
            child: Row(
              children: <Widget>[
                Container(
                  height: 20,
                  width: 20,
                  color: Colors.grey,
                ),
                const SizedBox(width: 15,),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      width: 280 * 0.70,
                      height: 15,
                      color: Colors.grey,
                    ),
                    const SizedBox(height: 5),
                    Container(
                      width: 280,
                      height: 10,
                      color: Colors.grey,
                    ),
                  ],
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
            thickness: 0.5, // Espessura do divisor
          ),
        );
      },            
    );
  }
}