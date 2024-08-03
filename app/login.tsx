import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import {login, LoginRequest} from "@/service/auth-service";
import {AsyncStorageKeys, getDataFromAsyncStorage, setDataToAsyncStorage} from "@/util/AsyncStorageUtil";
import {router} from "expo-router";


export default function Login() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  let showAlert = (viewId: string) => Alert.alert('Alert', 'Button pressed ' + viewId)

  async function loginOnClick() {
    if (email && password) {
      const loginRequest: LoginRequest = {
        email: email,
        password: password
      }
      const response = await login(loginRequest);
      const accessToken = response.data?.accessToken;
      if (accessToken) {
        await setDataToAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN, accessToken);
        console.log('access token', getDataFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN));
        Alert.alert('Alert', 'login successfully');
        router.replace('/menu');
      }
    }
  }
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png'}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => setEmail(email)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/ios-glyphs/512/key.png'}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => setPassword(password)}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => loginOnClick()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity*/}
        {/*  style={styles.buttonContainer}*/}
        {/*  onPress={() => showAlert('forgot password')}>*/}
        {/*  <Text>Forgot your password?</Text>*/}
        {/*</TouchableOpacity>*/}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => loginOnClick()}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  }
})
