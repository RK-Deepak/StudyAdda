import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function turnOffCameraOnUnload() {
    window.addEventListener('beforeunload', () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                mediaStream.getTracks().forEach(track => {
                    track.stop();
                });
            })
            .catch(error => {
                console.error('Error stopping media tracks:', error);
            });
    });
}

const VideoCallPage = () => {
    useEffect(() => {
        turnOffCameraOnUnload(); // Call the function to turn off the camera on page unload
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default VideoCallPage;
