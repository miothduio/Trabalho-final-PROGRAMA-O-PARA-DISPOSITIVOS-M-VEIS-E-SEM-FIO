import React, { forwardRef } from "react";
import MapView from "react-native-maps";

const MapaView = forwardRef(({

  region,

  children,

  onPress,

  onRegionChangeComplete,

},ref)=>{

return(

<MapView

ref={ref}

style={{flex:1}}

region={region}

showsUserLocation

showsMyLocationButton={false}

loadingEnabled

onPress={onPress}

onRegionChangeComplete={onRegionChangeComplete}

>

{children}

</MapView>

);

});

export default MapaView;