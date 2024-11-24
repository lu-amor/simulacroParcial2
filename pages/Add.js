import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddScreen = ({ createPlanetAwait, getPlanetsAwait }) => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            createPlanetAwait,
            getPlanetsAwait,
        });
    }, []);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [moons, setMoons] = useState("");
    const [moonNames, setMoonNames] = useState("");
    const [image, setImage] = useState("");

    const handleCreatePlanet = () => {
        if (!name || !description || !moons || !image) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newPlanet = {
            name,
            description,
            moons: parseInt(moons) || 0,
            moon_names: moonNames.split(",").map((moon) => moon.trim()),
            image,
        };

        createPlanetAwait(newPlanet);
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.headerText}>Nuevo Planeta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del planeta"
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
            <TouchableOpacity style={styles.button} onPress={handleCreatePlanet}>
                <Text style={styles.buttonText}>Crear Planeta</Text>
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
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
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
    cancelButton: {
        backgroundColor: "#555555",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    cancelButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddScreen;