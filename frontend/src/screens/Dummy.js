import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const X_API_KEY = 'mn7qnMmoWkvzhTTT38K5Vyap'; // Replace with your actual key
const X_API_SECRET = 'K1qMLTdf4iAPR2xRJvRuX1j7xvh5mnyJZcbt9f8QVr9bcABiln'; // Replace with your actual secret
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: X_API_KEY,
      redirectUri: REDIRECT_URI,
      scopes: ['users.read', 'tweet.read', 'offline.access'], // Add necessary scopes
      extraParams: {
        code_challenge: 'challenge',
        code_challenge_method: 'plain',
      },
    },
    {
      authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
      tokenEndpoint: 'https://api.twitter.com/2/oauth2/token',
    }
  );

  const fetchUserData = async (accessToken) => {
    try {
      const userResponse = await fetch('https://api.twitter.com/2/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await userResponse.json();
      setUserData(userData.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data.');
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('x_access_token');
        if (storedToken) {
          setAccessToken(storedToken);
          fetchUserData(storedToken);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    getToken();
  },);

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      const exchangeCodeForToken = async () => {
        try {
          const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa(`${X_API_KEY}:${X_API_SECRET}`),
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
              REDIRECT_URI
            )}&code_verifier=challenge`,
          });
          const tokenData = await tokenResponse.json();
          setAccessToken(tokenData.access_token);
          SecureStore.setItemAsync('x_access_token', tokenData.access_token);
          fetchUserData(tokenData.access_token);
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          Alert.alert('Error', 'Failed to log in.');
        }
      };
      exchangeCodeForToken();
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert('Error', 'Failed to initiate login.');
    }
  };

  const handleLogout = async () => {
    try {
      setAccessToken(null);
      setUserData(null);
      await SecureStore.deleteItemAsync('x_access_token');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          <Text style={styles.header}>Welcome, {userData.name}!</Text>
          {/* Display other user data as needed */}
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Button title="Login with X" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});