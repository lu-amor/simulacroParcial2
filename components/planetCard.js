import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlanetCard = ({ planet }) => {
    const navigation = useNavigation();
    const id = planet.id;

    const handleNavigation = () => {
        navigation.navigate("Details", { id });
    };

    return (
        <TouchableOpacity onPress={handleNavigation} style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.text}>{planet.name}</Text>
                <Image source={{ uri: planet.image }} style={{ width: 100, height: 100, alignSelf: "center"}} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 170,
        width: "80%",
        minWidth: 250,
        margin: 10,
        alignSelf: "center",
        marginBottom: 0,
        paddingBottom: 0,
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,
    },
    container: {
        backgroundColor: "#000000",
        padding: 15,
        margin: 0,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ffffff",
        alignSelf: "center",
    },
});

export default PlanetCard;