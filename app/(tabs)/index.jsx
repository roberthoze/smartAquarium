import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Link } from 'expo-router'
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import waterline from "@/assets/images/waterline.png"


const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={waterline}
        resizeMode="cover"
        style={styles.image}
      >
      {/* lighting button */}
        <TouchableOpacity style = {styles.buttonCircle} onPress={() => console.log("Lightbulb pressed!")}>
          <MaterialCommunityIcons name="lightbulb-outline" size={50} color="#fff"/>
        </TouchableOpacity>
      
        <Text style={styles.title}>Smart Aquarium</Text>

      <View style={styles.containerRow}>
        <Link href="/livestream" style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.buttonL}>
            <Text style={styles.buttonText}>Livestream</Text>
          </Pressable>
        </Link>

        <Link href="/feed" style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.buttonF}>
            <Text style={styles.buttonText}>Feed My Fish</Text>
          </Pressable>
        </Link>
      </View>
        

        <Link href="/stats" style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.buttonS}>
            <Text style={styles.buttonText}>Tank Stats</Text>
          </Pressable>
        </Link>

        <Link href="/settings" style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </Pressable>
        </Link>

      </ImageBackground>
    </View>
  )
}
export default app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // position: "center",
    // top: 60,
    // right: 40,
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    // position: "center",
    // top: 60,
    // right: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    top: 65,
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  buttonS: {
    top: -105,
    height: 155,
    width: 360,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  buttonL: {
    top: 185,
    height: 195,
    width: 165,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  buttonF: {
    top: 185,
    height: 195,
    width: 165,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  buttonCircle: {
    top: 60,
    width: 75,
    height: 75,
    borderRadius: 50,
    left: 300,
    backgroundColor: "#ffd700",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  }
})
