import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screens/HomeScreen";
import OrderScreen from "@/screens/OrderScreen";
import CustomersScreen from "@/screens/CustomersScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import BottomTabBar from "@/components/BottomTabBar";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="TabHome" component={HomeScreen} />
      <Tab.Screen name="TabOrder" component={OrderScreen} />
      <Tab.Screen name="TabCustomers" component={CustomersScreen} />
      <Tab.Screen name="TabProfile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
