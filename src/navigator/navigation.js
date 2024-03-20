import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function Navigation() {
  const appCtx = useAuthContext();
console.log("appCtx.values.type: ",appCtx.values.activeAccountType)
  return (
    <NavigationContainer>
     
    </NavigationContainer>
  );
}
