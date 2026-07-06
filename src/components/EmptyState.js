import React from "react";

import {

View,

Text,

StyleSheet

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../theme/colors";

export default function EmptyState() {

return(

<View style={styles.container}>

<Ionicons

name="clipboard-outline"

size={90}

color={Colors.subtitle}

/>

<Text style={styles.title}>

Nenhuma tarefa

</Text>

<Text style={styles.subtitle}>

Crie sua primeira tarefa

</Text>

</View>

)

}

const styles=StyleSheet.create({

container:{

alignItems:"center",

justifyContent:"center",

padding:40

},

title:{

fontSize:22,

fontWeight:"bold",

marginTop:20,

color:Colors.text

},

subtitle:{

marginTop:10,

fontSize:16,

color:Colors.subtitle

}

})