import React, { useEffect, useState, useRef } from 'react';
import { View, Button, Alert } from 'react-native';
import Video from 'react-native-video';

const VideoStreamScreen = () => {
    const [hlsUrl, setHlsUrl] = useState('');
    const videoRef = useRef(null);

    // Function to fetch HLS URL from API Gateway
    const fetchHlsUrl = async () => {
        try {
            const response = await fetch('https://your-api-gateway-url.com/getHlsUrl');
            const data = await response.json();
            setHlsUrl(data.hlsUrl);
        } catch (error) {
            Alert.alert('Error', 'Failed to load video stream.');
        }
    };

    useEffect(() => {
        fetchHlsUrl();

        // Periodically refresh HLS URL (e.g., every 4 minutes)
        const interval = setInterval(fetchHlsUrl, 4 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {hlsUrl ? (
                <Video
                    ref={videoRef}
                    source={{ uri: hlsUrl }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    controls
                    onError={() => {
                        Alert.alert('Error', 'Stream expired. Refreshing...');
                        fetchHlsUrl();
                    }}
                />
            ) : (
                <Button title="Load Stream" onPress={fetchHlsUrl} />
            )}
        </View>
    );
};

export default VideoStreamScreen;
