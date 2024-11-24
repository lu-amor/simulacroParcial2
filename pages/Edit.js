import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

export const url = "http://172.20.10.4:8000/planets";

const EditScreen = ({ route, navigation, updatePlanetAwait }) => {
    const { id } = route.params;
    const [planeta, setPlaneta] = useState(null);

    useEffect(() => {
        const fetchPlaneta = async () => {
            try {
                const response = await fetch(`${url}/${id}`);
                const data = await response.json();
                setPlaneta(data);
            } catch (error) {
                console.error("Error fetching planet: ", error);
            }
        };

        fetchPlaneta();
    }, [id]);

    useEffect(() => {
        if (planeta) {
            setName(planeta.name);
            setDescription(planeta.description);
            setMoons(planeta.moons.toString());
            setMoonNames(planeta.moon_names.join(", "));
            setImage(planeta.image);
        }
    }, [planeta]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [moons, setMoons] = useState("");
    const [moonNames, setMoonNames] = useState("");
    const [image, setImage] = useState("");

    const handleUpdatePlanet = () => {
        if (!name || !description || !moons || !image) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const updatedPlanet = {
            name,
            description,
            moons: parseInt(moons) || 0,
            moon_names: moonNames.split(",").map((moon) => moon.trim()),
            image,
        };

        updatePlanetAwait(id, updatedPlanet);
        navigation.navigate("Planetario UCU");
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.headerText}>Editar Planeta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor="#aaa"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de lunas"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={moons}
                onChangeText={setMoons}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombres de lunas (separados por comas)"
                placeholderTextColor="#aaa"
                value={moonNames}
                onChangeText={setMoonNames}
            />
            <TextInput
                style={styles.input}
                placeholder="URL de la imagen"
                placeholderTextColor="#aaa"
                value={image}
                onChangeText={setImage}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdatePlanet}>
                <Text style={styles.buttonText}>Actualizar Planeta</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#000000",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#222222",
        color: "#ffffff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#f0a6ca",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EditScreen;