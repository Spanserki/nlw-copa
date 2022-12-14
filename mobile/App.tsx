import { NativeBaseProvider, VStack } from "native-base";

import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/Signin';
import { THEME } from './styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <VStack
        flex={1}
        bgColor='gray.900'
        alignItems='center'
        justifyContent='center'
      >
        {
          fontsLoaded ? <SignIn /> : <Loading />
        }
      </VStack>
    </NativeBaseProvider>
  );
}