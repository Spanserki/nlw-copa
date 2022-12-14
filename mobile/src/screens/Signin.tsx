import { StatusBar } from "expo-status-bar";
import { Button, Center, Text } from "native-base";

export function SignIn() {
    return (
        <Center flex={1} bgColor='gray.900'>
            <Text
                color='white'
                fontSize={25}
            >
                Ola Guilherme!
            </Text>

            <StatusBar style="auto" />
        </Center>

    )
}