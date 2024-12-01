import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeView({ navigation }) {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);

  const recommendations = [
    { id: '1', name: 'Pet', icon: '🐾', rating: 5 },
    { id: '2', name: 'Milk', icon: '🥛', rating: 4 },
    { id: '3', name: 'Alcohol', icon: '🍷', rating: 5 },
    { id: '4', name: 'Candy', icon: '🍬', rating: 4 },
    { id: '5', name: 'Food', icon: '🍽️', rating: 5 },
    { id: '6', name: 'Egg', icon: '🥚', rating: 4 },
    { id: '7', name: 'Electronic', icon: '💻', rating: 5 },
    { id: '8', name: 'Cereal', icon: '🥣', rating: 4 },
    { id: '9', name: 'Electrodomestics', icon: '📺', rating: 4 },
    { id: '10', name: 'Clean', icon: '🧹', rating: 5 },
    { id: '11', name: 'Fruit', icon: '🍎', rating: 5 },
    { id: '12', name: 'Bread', icon: '🍞', rating: 4 },
  ];

  // Cargar favoritos al iniciar la aplicación
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  // Guardar favoritos cuando cambian
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error al guardar favoritos:', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === item.id)) {
        // Si ya está en favoritos, lo quitamos
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        // Si no está, lo agregamos
        return [...prevFavorites, item];
      }
    });
  };

  const renderRecommendation = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id); // Verificar si el item está en favoritos

    return (
      <View style={styles.card}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.rating}>{"⭐".repeat(item.rating)}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)} // Alternar favorito
        >
          <Text style={styles.heart}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalized Recommendations</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.subtitle}>Based on your history</Text>
      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('OptionsView')}>
          <Text style={styles.navIcon}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E9',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  list: {
    alignItems: 'center',
  },
  card: {
    width: 100,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
    marginTop: 5,
    color: '#555',
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  heart: {
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcon: {
    fontSize: 24,
    color: '#fff',
  },
});
