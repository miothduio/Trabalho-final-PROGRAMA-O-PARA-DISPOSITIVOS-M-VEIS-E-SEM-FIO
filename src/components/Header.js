import React from "react";

import {

View,

Text,

StyleSheet

} from "react-native";

import Colors from "../theme/colors";

export default function Header({

titulo,

subtitulo

}){

return(

<View style={styles.container}>

<Text style={styles.title}>

{titulo}

</Text>

{subtitulo&&(

<Text style={styles.subtitle}>

{subtitulo}

</Text>

)}

</View>

)

}

const styles=StyleSheet.create({

container:{

marginBottom:20

},

title:{

fontSize:30,

fontWeight:"bold",

color:Colors.text

},

subtitle:{

fontSize:16,

color:Colors.subtitle,

marginTop:4

}

})