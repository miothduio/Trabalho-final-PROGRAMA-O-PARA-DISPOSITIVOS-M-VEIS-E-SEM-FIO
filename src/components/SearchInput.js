import React from "react";

import {

Searchbar

} from "react-native-paper";

export default function SearchInput({

value,

onChangeText,

}){

return(

<Searchbar

placeholder="Pesquisar tarefas"

value={value}

onChangeText={onChangeText}

/>

)

}