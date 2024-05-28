import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useSelector } from 'react-redux';

const VideoCallRoom = () => {
    const {userId, roomId} =useParams();
    console.log(userId, roomId);

    const {user}=useSelector((store)=>store.profile);

    const myMeeting=async (element) => {
        const appID =1472349780
 const serverSecret = "596217288f8050e05be0f5d1713269bf"
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), (user?.firstName +" " +user?.lastName))
//creating instacce of kit token
 const zp = ZegoUIKitPrebuilt.create(kitToken);

 zp.joinRoom({
    container: element,
    sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname 
           
        },
        
      ],
      videoResolutionList: [
        ZegoUIKitPrebuilt.VideoResolution_360P,
        ZegoUIKitPrebuilt.VideoResolution_180P,
        ZegoUIKitPrebuilt.VideoResolution_480P,
        ZegoUIKitPrebuilt.VideoResolution_720P,
      ],
   videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P, 
   onUserAvatarSetter:(userList) => {
    userList.forEach(user => {
        user.setUserAvatar("https://xxx.xxx.xx/xx.png")
    })
}, 

      showRequestToCohostButton:true,
      showLeaveRoomConfirmDialog:true,
      showPreJoinView:true,
    scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
       },
 
});
};
    


  return (
    <div  className="myCallContainer flex flex-col "
    ref={myMeeting}
    style={{ width: '100vw', height: '100vh' }}>

    </div>
  )
}

export default VideoCallRoom