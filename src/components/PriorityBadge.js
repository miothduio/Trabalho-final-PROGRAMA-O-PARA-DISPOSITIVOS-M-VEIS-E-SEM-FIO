import React from "react";

import {

Chip

} from "react-native-paper";

import Colors from "../theme/colors";

export default function PriorityBadge({

prioridade

}){

let color=Colors.media;

switch(prioridade){

case"alta":

color=Colors.alta;

break;

case"baixa":

color=Colors.baixa;

break;

}

return(

<Chip

compact

style={{

backgroundColor:color,

}}

textStyle={{

color:"#FFF",

fontWeight:"bold"

}}

>

{prioridade.toUpperCase()}

</Chip>

)

}