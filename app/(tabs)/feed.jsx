import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DropDown from '@/components/DropDown';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import waterline from "@/assets/images/waterline.png";
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2'
})

export default function TabTwoScreen() {
  const[jsonData, setJsonData] = useState(null);

  // communication from AWS to Phone
  const fetchJson = async () => {
    try {
      // const timestamp = new Date().getTime(); // Unique per request
      // const response = await fetch(`https://week4demo.s3.us-east-2.amazonaws.com/config.json?nocache=${timestamp}`);
  
      const response = await fetch('https://week4demo.s3.us-east-2.amazonaws.com/config.json', {
        cache: 'no-store'
      });
      const text = await response.text();
      console.log('Raw Response:', text);
      
      const data = JSON.parse(text);
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching JSON:', error);
    }
  };
  

  // useEffect(() => {
  //   fetchJson();

  //   // const interval = setInterval(() => {
  //   //   fetchJson();
  //   // }, 3000);

  //   // return () => clearInterval(interval);
  // }, []);

  const sendToAWS = async (selectedOption) => {

    console.log("Sending data to AWS:", selectedOption); //debug

    try {
      const response = await fetch('https://ufz27d8hhb.execute-api.us-east-2.amazonaws.com/appweek4demo', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOption })
      });
      
      const data = await response.json();
      console.log("AWS Response:", data); //debug
      Alert.alert("Success", "Option saved: " + selectedOption);

      setTimeout(() => {
        fetchJson();
      }, 3000);

    } catch (error) {
      console.error("AWS Error:", error);
      Alert.alert("Error", "Failed to save option!");
    }
  };
  
  //not sure why this is here but it's for communication from aws to app
  // const JsonDisplayScreen = () => {
  //   const [jsonData, setJsonData] = useState(null);

  //   useEffect(() => {
  //     // communication from AWS to Phone
  //     const fetchJsonFromS3 = async () => {
  //       try {
  //         const response = await fetch('https://week4demo.s3.amazonaws.com/config.json');
  //         const data = await response.json();
  //         console.log('Fetched JSON:', data);
  //         setJsonData(data);
  //         // return data;
  //       } catch (error) {
  //         console.error('Error fetching JSON:', error);
  //       }
  //     };

  //     festJson();
  //   }, []);

  // }


  

  return (
    <View style={styles.container}>
      <ImageBackground
              source={waterline}
              resizeMode="cover"
              style={styles.image}
            >
      <TouchableOpacity style = {styles.buttonCircle} onPress={() => console.log("Lightbulb pressed!")}>
                <MaterialCommunityIcons name="lightbulb-outline" size={50} color="#fff"/>
      </TouchableOpacity>

      <ThemedView style={styles.titleContainer}>
        <Text style={styles.title}>Feed your fish! 🐟</Text>
      </ThemedView>

      <ThemedText style={{
        top: -200,
      }}>This is where users can select how much food to feed their fish.</ThemedText>

      {/* DropDown for selecting food amount */}
      <DropDown onSelectOption={sendToAWS} />

      {/* Display JSON Data from S3 */}
      <View style={styles.jsonContainer}>
        <Text style={styles.jsonTitle}>Fetched JSON Data:</Text>
        {jsonData ? (
          <Text style={styles.jsonText}>{JSON.stringify(jsonData, null, 2)}</Text>
        ) : (
          <Text style={styles.loadingText}>Select an Option</Text>
        )}
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  jsonContainer: {
    top: -100,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  jsonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jsonText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  loadingText: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  title: {
    top: -200,
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonCircle: {
    top: -186,
    width: 75,
    height: 75,
    borderRadius: 50,
    left: 280,
    backgroundColor: "#ffd700",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});





// //from gpt when asked to display fetched data
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView } from 'react-native';

// const JsonDisplayScreen = () => {
//   const [jsonData, setJsonData] = useState(null);

//   useEffect(() => {
//     const fetchJson = async () => {
//       try {
//         const response = await fetch('https://your-bucket-name.s3.amazonaws.com/path-to-your-file.json');
//         const data = await response.json();
//         setJsonData(data);
//       } catch (error) {
//         console.error('Error fetching JSON:', error);
//       }
//     };

//     fetchJson();
//   }, []);

//   return (
//     <ScrollView style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>JSON Data:</Text>
//       {jsonData ? <Text>{JSON.stringify(jsonData, null, 2)}</Text> : <Text>Loading...</Text>}
//     </ScrollView>
//   );
// };

// export default JsonDisplayScreen;



// import {StatusBar} from "expo-status-bar";
// import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
// import { Link } from 'expo-router'

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import  DropDown  from '@/components/DropDown';
// import React, { useState } from 'react';

// export default function TabTwoScreen() {
//   return (
//     <View
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="chevron.left.forwardslash.chevron.right"
//           style={styles.headerImage}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Feed your fish!🐟</ThemedText>
//       </ThemedView>
//       <ThemedText>This is where users can select how much food to feed their fish.</ThemedText>
      
//       {/* drop down */}
//       <DropDown/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });
