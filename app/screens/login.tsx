import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, Image } from 'react-native';
import { Stack, Link, router } from 'expo-router';
import Input from '@/components/forms/Input';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useThemeColors from '@/app/contexts/ThemeColors';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to home screen after successful login
        router.replace('/(drawer)/(tabs)/');
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary p-6" style={{paddingTop: insets.top}}>
      <View className="mt-8 items-center">
        <ThemedText
          className="text-4xl font-extrabold mb-4 text-center"
          style={{
            color: colors.text, // Couleur dynamique selon le thème
            textShadowColor: 'rgba(0,0,0,0.15)',
            textShadowOffset: { width: 1, height: 2 },
            textShadowRadius: 4,
            letterSpacing: 2,
            fontFamily: 'Montserrat-Bold',
          }}
        >
          Rayon vert
        </ThemedText>
        <Image
          source={require('../../assets/lrv.png')}
          style={{ width: 120, height: 120, marginBottom: 16, resizeMode: 'contain' }}
          accessibilityLabel="Logo Rayon Vert"
        />
        <ThemedText className="text-3xl font-bold mb-1 text-center">Bienvenue !</ThemedText>
        <ThemedText className="text-light-subtext dark:text-dark-subtext mb-14 text-center">Connexion à votre compte</ThemedText>
      </View>
      
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (emailError) validateEmail(text);
        }}
        error={emailError}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (passwordError) validatePassword(text);
        }}
        error={passwordError}
        isPassword={true}
        autoCapitalize="none"
      />
      
      <Link className='underline text-black dark:text-white text-sm mb-4' href="/screens/forgot-password">
        Mot de passe oublié ?
      </Link>
      
      <Button 
        title="Connexion" 
        onPress={handleLogin} 
        loading={isLoading}
        size="large"
        className="mb-6"
      />
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  googleIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#22d12bff',
    borderRadius: 2,
  },
});