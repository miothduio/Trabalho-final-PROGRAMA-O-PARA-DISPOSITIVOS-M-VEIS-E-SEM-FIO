import React from "react";
import { Marker } from "react-native-maps";

export default function LocalMarker({

  coordinate,

  onDragEnd,

}) {

  if (!coordinate) return null;

  return (

    <Marker

      coordinate={coordinate}

      draggable

      onDragEnd={(e)=>{

        onDragEnd(

          e.nativeEvent.coordinate

        );

      }}

    />

  );

}