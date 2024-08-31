import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View >
        <Text>Uber clone !</Text>
         <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
