// StackNavigator.js

import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailsScreen from "./ProductDetailsScreen";
import HomePage from "./HomePage";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
