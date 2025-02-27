import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native'
import * as VideoThumbnails from 'expo-video-thumbnails';
import s3bucket from '../Utils/S3BucketConfig';

// console.log(s3bucket);
// if (typeof s3bucket.upload === 'function') {
//   console.log('upload method exists');
// } else {
//   console.log('upload method does not exist');
// }
export default function stats() {

  const navigation=useNavigation();
  //
  // used to select video file from phone
  //
  const SelectVideoFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      GenerateVideoThumbnail(result.assets[0].uri)
    }
  };

  //use to generate thumbnail
  const GenerateVideoThumbnail=async(videoUri)=>{
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoUri,
        {
          time: 10000,
        }
      );
      console.log("Thumbnail", uri)
        // navigation.navigate('preview-screen', {
        //   video: videoUri,
        //   thumbnail:uri
        // })
        // UploadFileToAws(videoUri, 'video'); this is THE thing
    } catch (e) {
      console.warn(e);
    }
  }

  // const publishHandler=()=> {
  //   UploadFileToAws()
  // }

  const UploadFileToAws=async(file, type)=>{
    const fileType=file.split('.').pop(); //ex: .mp4, .png
    const params={
      Bucket: 'smartaquarium',
      Key:`mermaidz-${Date.now()}.${fileType}`, 
      Body: await fetch(file).then(resp=>resp.blob()),
      ACL: 'public-read',
      ContentType: type =='video'?`video/${fileType}` :`image/${fileType}`
    }
    try{
      const data=await s3bucket.upload(params)
      .promise().then(resp=> {
        console.log("File Upload..");
        console.log("RESP:", resp);
      })
    }catch(e) {
      console.log(e)
    }
  }
  

  return (
    <View style={{
      padding: 20,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flex: 1
    }}>
      <Image source={require('./../../assets/images/upload.png')}
        style={{
          width: 140,
          height: 140
        }}
      />
      <Text style={{
        fonstSize: 22,
        color: 'black',
        marginTop:20
      }}>Start Uploading Video</Text>

      <TouchableOpacity
        onPress={SelectVideoFile}
        style={{
          backgroundColor: 'black',
          padding: 10,
          paddingHorizontal: 25,
          borderRadius:99,
          marginTop: 20
        }}>
        <Text style={{color: 'white'}}>Select Video File</Text>
      </TouchableOpacity>
    </View>
  )
}