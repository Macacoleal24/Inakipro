import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí iría la lógica para el inicio de sesión
    console.log('Email:', email, 'Password:', password);
    navigation.navigate('Home'); // Redirige a Home (asegúrate de tener configurada la navegación)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>WELCOME BACK</Text>
      <Text style={styles.subtitle}>Log In to continue</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password</Text>
      </TouchableOpacity>

      <Text style={styles.noAccountText}>Don’t have an account</Text>
      <Text style={styles.createText}>Create one here</Text>

      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7E9', // Color de fondo similar al de la imagen
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: '5%',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '90%',
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#000',
    marginBottom: 20,
  },
  noAccountText: {
    fontSize: 14,
    marginBottom: 5,
  },
  createText: {
    fontSize: 14,
    marginBottom: 10,
  },
  createAccountButton: {
    width: '90%',
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
