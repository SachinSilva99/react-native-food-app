import React, {useReducer} from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {signUp, SignUpRequest} from "@/service/auth-service";


interface State {
  formData: SignUpRequest;
  errors: Partial<SignUpRequest>;
}

type Action =
  | { type: 'SET_FIELD'; field: keyof SignUpRequest; value: string }
  | { type: 'SET_ERRORS'; errors: Partial<SignUpRequest> }
  | { type: 'CLEAR_ERRORS' };

const initialState: State = {
  formData: {
    username: '',
    email: '',
    password: '',
    address: '',
    image: ''
  },
  errors: {}
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
};

const SignUp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (field: keyof SignUpRequest, value: string) => {
    dispatch({type: 'SET_FIELD', field, value});

  };

  const validate = (): boolean => {
    let valid = true;
    let newErrors: Partial<SignUpRequest> = {};

    if (!state.formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.formData.email || !emailPattern.test(state.formData.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!state.formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!state.formData.address) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    dispatch({type: 'SET_ERRORS', errors: newErrors});
    return valid;
  };

  const handleSubmit = async () => {

    if (validate()) {
      Alert.alert('Success', 'Form submitted successfully');
      console.log(state.formData);
      const resp = await signUp(state.formData);
      console.log(resp);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={state.formData.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />
      {state.errors.username && <Text style={styles.error}>{state.errors.username}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      {state.errors.email && <Text style={styles.error}>{state.errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />
      {state.errors.password && <Text style={styles.error}>{state.errors.password}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={state.formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      {state.errors.address && <Text style={styles.error}>{state.errors.address}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={state.formData.image}
        onChangeText={(text) => handleInputChange('image', text)}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.buttonContainer, styles.loginButton]}
      >
        <Text style={styles.signInText}>Sign Up</Text>
      </TouchableOpacity >
      <Text>Already have an Account?</Text>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  error: {
    color: 'red',
    marginBottom: 15,
    fontSize: 10,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
    textShadowColor: "red"
  },
  buttonContainer: {
    marginTop:10,

    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,

  }, signInText: {
    color: "white"
  }

});

export default SignUp;
