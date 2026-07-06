import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import Colors from "../theme/colors";

export default function StatsCard({

  total,

  pendentes,

  concluidas,

}){

return(

<Card style={styles.card}>

<Card.Content>

<View style={styles.row}>

<View style={styles.item}>

<Text variant="headlineMedium">

{total}

</Text>

<Text>Total</Text>

</View>

<View style={styles.item}>

<Text
variant="headlineMedium"
style={{
color:Colors.warning
}}
>

{pendentes}

</Text>

<Text>Pendentes</Text>

</View>

<View style={styles.item}>

<Text
variant="headlineMedium"
style={{
color:Colors.success
}}
>

{concluidas}

</Text>

<Text>Concluídas</Text>

</View>

</View>

</Card.Content>

</Card>

)

}

const styles=StyleSheet.create({

card:{

borderRadius:18,

marginBottom:20

},

row:{

flexDirection:"row",

justifyContent:"space-around"

},

item:{

alignItems:"center"

}

})