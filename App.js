import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./pages/home";
import DetailsScreen from "./pages/Details";
import AddScreen from "./pages/Add";
import EditScreen from "./pages/Edit";

const Stack = createNativeStackNavigator();
export const url = "http://172.20.10.4:8000/planets";

export default function App() {
  const [planets, setPlanets] = useState([]);

  async function fetchPlanets() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      return [];
    }
  }

  function getPlanetsAwait() {
    fetchPlanets()
      .then((data) => {
        if (data.length > 0) {
          setPlanets(data);
        } else {
          console.log("No planets found.");
        }
      })
      .catch((error) => console.error("Error fetching planets:", error));
  }

  useEffect(() => {
    getPlanetsAwait();
  }, []);

  async function createPlanet(newPlanet) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlanet),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error creating planet: ", error);
      return null;
    }
  }

  function createPlanetAwait(newPlanet) {
    createPlanet(newPlanet)
      .then((createdPlanet) => {
        if (createdPlanet) {
          setPlanets((prev) => [...prev, createdPlanet]);
        } else {
          console.log("Failed to create planet.");
        }
      })
      .catch((error) => console.error("Error creating planet:", error));
  }

  async function updatePlanet(id, updatedFields) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error updating planet: ", error);
      return null;
    }
  }

  function updatePlanetAwait(id, updatedFields) {
    updatePlanet(id, updatedFields)
      .then((updatedPlanet) => {
        if (updatedPlanet) {
          setPlanets((prev) =>
            prev.map((planet) =>
              planet.id === id ? { ...planet, ...updatedPlanet } : planet
            )
          );
        } else {
          console.log("Failed to update planet.");
        }
      })
      .catch((error) => console.error("Error updating planet:", error));
  }

  async function deletePlanet(id) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return true;
      } else {
        console.log(`Failed to delete planet with ID ${id}`);
        return false;
      }
    } catch (error) {
      console.log("Error deleting planet: ", error);
      return false;
    }
  }

  function deletePlanetAwait(id) {
    deletePlanet(id)
      .then((success) => {
        if (success) {
          setPlanets((prev) => prev.filter((planet) => planet.id !== id));
        } else {
          console.log(`Failed to delete planet with ID ${id}.`);
        }
      })
      .catch((error) => console.error("Error deleting planet:", error));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Planetario UCU">
          {(props) => <HomeScreen {...props} planets={planets} />}
        </Stack.Screen>
        <Stack.Screen name="Details">
            {(props) => (
                <DetailsScreen
                    {...props}
                    getPlanetsAwait={getPlanetsAwait}
                    deletePlanetAwait={deletePlanetAwait}
                />
            )}
        </Stack.Screen>
        <Stack.Screen name="Edit">
            {(props) => (
                <EditScreen
                    {...props}
                    updatePlanetAwait={updatePlanetAwait}
                    getPlanetsAwait={getPlanetsAwait}
                />
            )}
        </Stack.Screen>
        <Stack.Screen name="Add">
            {(props) => (
                <AddScreen
                    {...props}
                    createPlanetAwait={createPlanetAwait}
                    getPlanetsAwait={getPlanetsAwait}
                />
            )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
