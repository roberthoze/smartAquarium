import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from 'expo-av';

const KinesisLiveStream = () => {
  const [status, setStatus] = useState({});
  const video = useRef(null);

  const handlePlayPause = async () => {
    try {
      if (status.isPlaying) {
        await video.current.pauseAsync();
      } else {
        await video.current.playAsync();
      }
    } catch (error) {
      console.log("Video playback error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{ 
          uri: 'https://b-ba4a413e.kinesisvideo.us-east-1.amazonaws.com/hls/v1/getHLSMasterPlaylist.m3u8?SessionToken=CiD0xzaGp_4MaZKpp9HFIk3B3ZeFnUoXe_bQovI8SkmVsRIQMaoy0eHZ1L-InUkqKlhxRxoZ9ZVpe8oe1Jq5nYlN2NAjtpG03iyzkZd6eSIg4bxgBFjT843h5XcmjbfkcnfAYx8xGdH-2y3gj_UuoKw~'
        }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        onError={(error) => console.log("Stream error:", error)}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePlayPause}
        >
          <Text style={styles.buttonText}>
            {status.isPlaying ? 'Stop Stream' : 'Start Stream'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        {status.isPlaying ? 'Stream is active' : 'Stream is inactive'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 300,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  text: {
    color: "white",
    marginTop: 20,
  }
});

export default KinesisLiveStream;


//black screen with play button that doesn't work
// import React, { useState, useRef } from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { Video, ResizeMode } from 'expo-av';

// const KinesisLiveStream = () => {
//   const [status, setStatus] = useState({});
//   const video = useRef(null);

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={video}
//         source={{ 
//           uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
//         }}
//         style={styles.video}
//         useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//       <View style={styles.buttons}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
//         >
//           <Text style={styles.buttonText}>
//             {status.isPlaying ? 'Pause' : 'Play'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.text}>
//         {status.isPlaying ? 'Video is playing' : 'Video is paused'}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   video: {
//     width: "100%",
//     height: 300,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#000',
//     fontSize: 16,
//   },
//   text: {
//     color: "white",
//     marginTop: 20,
//   }
// });

// export default KinesisLiveStream;
// black screen with play button that doesn't work

//SECOND TRY
// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { KinesisVideoClient, GetMediaCommand } from "@aws-sdk/client-kinesis-video";
// import Video from 'react-native-video';

// const STREAM_ARN = "arn:aws:kinesisvideo:us-east-1:741448957683:stream/Mermaidz_stream1/1739164958102"; // Kinesis Stream ARN
// const REGION = "us-east-1"; // AWS region
// // const AWS_ACCESS_KEY_ID = "YOUR_AWS_ACCESS_KEY_ID";
// // const AWS_SECRET_ACCESS_KEY = "YOUR_AWS_SECRET_ACCESS_KEY";

// const StreamVideo = () => {
//   const [streamUrl, setStreamUrl] = useState(null);

//   useEffect(() => {
//     // Fetch the stream URL or raw video data from Kinesis
//     const fetchStream = async () => {
//       const kinesisClient = new KinesisVideoClient({
//         region: REGION,
//         // credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
//       });

//       // Use GetMedia command to fetch stream data (in raw format)
//       const command = new GetMediaCommand({
//         StreamARN: STREAM_ARN,
//       });

//       try {
//         const response = await kinesisClient.send(command);
//         // Handle the response to get the stream URL or the raw video data
//         // In case of raw data, you might need to process it into a playable video format

//         // Assuming HLS stream URL is returned
//         setStreamUrl("https://your-kinesis-hls-stream-url.m3u8");
//       } catch (error) {
//         console.error("Error fetching stream:", error);
//       }
//     };

//     fetchStream();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {streamUrl ? (
//         <Video
//           source={{ uri: streamUrl }} // URL of the Kinesis Video Stream (HLS)
//           style={{ width: "100%", height: "100%" }}
//           controls
//           resizeMode="contain"
//         />
//       ) : (
//         <Text>Loading video...</Text>
//       )}
//     </View>
//   );
// };

// export default StreamVideo;
//^ SECOND TRY


// import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
// import { Link } from 'expo-router'

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';

// import React, {useState, useEffect} from 'react';
// import {
//   Button,
//   SafeAreaView,
//   View,
// } from 'react-native';
// import { mediaDevices, RTCView, RTCPeerConnection } from 'react-native-webrtc';
// import AWS from 'aws-sdk';

// AWS.config.update({
//   region: 'us-east-1'
// })

// const kinesisVideo = new AWS.KinesisVideo();
// const kinesisSignaling = new AWS.KinesisVideoSignalingChannels();


// export default function TabTwoScreen() {
//   const [stream, setStream] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);

//   const startStreaming = async () => {
//     try {
//       // Get signaling channel endpoint
//       const channelARN = 'arn:aws:kinesisvideo:us-east-1:YOUR_ACCOUNT_ID:channelnpm/YOUR_CHANNEL_NAME/123456789';
//       const { ResourceEndpointList } = await kinesisVideo.getSignalingChannelEndpoint({
//         ChannelARN: channelARN,
//         SingleMasterChannelEndpointConfiguration: { Protocols: ['WSS'], Role: 'VIEWER' },
//       }).promise();

//       const wssEndpoint = ResourceEndpointList.find(endpoint => endpoint.Protocol === 'WSS').ResourceEndpoint;

//       // Create WebRTC connection
//       const peerConnection = new RTCPeerConnection({
//         iceServers: [{ urls: ['stun:stun.kinesisvideo.us-east-1.amazonaws.com:443'] }],
//       });

//       setPeerConnection(peerConnection);

//       peerConnection.ontrack = (event) => {
//         setStream(event.streams[0]);
//       };

//       // Get ICE servers from AWS Kinesis
//       const iceResponse = await kinesisSignaling.getIceServerConfig({ ChannelARN: channelARN }).promise();
//       const iceServers = iceResponse.IceServerList.map(server => ({
//         urls: server.Uris,
//         username: server.Username,
//         credential: server.Password,
//       }));

//       peerConnection.setConfiguration({ iceServers });

//       // Connect as a viewer
//       const signalingClient = new WebSocket(wssEndpoint);
//       signalingClient.onopen = async () => {
//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer);

//         signalingClient.send(JSON.stringify({
//           action: 'SDP_OFFER',
//           messagePayload: offer.sdp,
//         }));
//       };

//       signalingClient.onmessage = async (message) => {
//         const parsed = JSON.parse(message.data);
//         if (parsed.action === 'SDP_ANSWER') {
//           await peerConnection.setRemoteDescription({ type: 'answer', sdp: parsed.messagePayload });
//         }
//       };

//     } catch (error) {
//       console.error('Error starting Kinesis stream:', error);
//     }
//   };
//   return (
//       <SafeAreaView>
//       {
//         stream &&
//           <RTCView
//             streamURL={stream.toURL()}
// 					/>
//       }
//       <View>
//           <Button
//             title = "Start"
//             onPress = {startStreaming} />
//         </View>
//       </SafeAreaView>
//     // <View style={styles.titleContainer}>
//     //     {/* <ThemedText style={styles.title}>Livestream🎥</ThemedText> */}

//     //   <ThemedText style={styles.placeholder}>Placeholder for livestream</ThemedText>

//     //   <Link href="/ID" style={{marginHorizontal: 'auto'}} asChild>
//     //     <Pressable style={styles.button}>
//     //       <Text style={styles.buttonText}>ID fish</Text>
//     //     </Pressable>
//     //   </Link>

//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     height: 100,
//     top: 200,
//     color: 'white',
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   titleContainer: {
//     backgroundColor: 'rgba(117, 199, 239, 0.75)',
//     flex: 1,
//     // flexDirection: 'row',
//     // gap: 8,
//   },
//   button: {
//     top: 300,
//     height: 60,
//     borderRadius: 20,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(147,250,165,0.75)',
//     padding: 6,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 4,
//   },
//   placeholder: {
//     top: 225,
//     height: 250,
//     justifyContent: 'center',
//     backgroundColor: 'black',
//     font: 50,
//     color: 'white',
//   }
// });
