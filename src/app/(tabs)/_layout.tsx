// import { useAuth } from "@clerk/expo";
// import { Redirect, Tabs } from "expo-router";
// import { FontAwesome } from "@expo/vector-icons";

// export default function TabsLayout() {
//   const { isSignedIn, isLoaded } = useAuth();

//   if (!isLoaded) {
//     return null;
//   }

//   if (!isSignedIn) {
//     return <Redirect href="/(auth)/sign-in" />;
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#1a8a3c",
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="planner"
//         options={{
//           title: "Planner",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="plus-circle" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="insights"
//         options={{
//           title: "Insights",
//           tabBarIcon: ({ color }) => (
//             <FontAwesome name="bar-chart" size={24} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Icon sf="plus.circle" md="add" />
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Icon sf="chart.bar" md="bar_chart" />
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
