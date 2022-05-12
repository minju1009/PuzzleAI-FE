import React, {useEffect, useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {RTCView, mediaDevices, MediaStream} from 'react-native-webrtc';
import styled from 'styled-components/native';
import audioOffImg from 'assets/images/audio_off_btn.png';
import audioOffIcon from 'assets/images/audio_off_icon.png';
import audioOnImg from 'assets/images/audio_on_btn.png';
import cameraReverse from 'assets/images/camera_revers_btn.png';
import humanIcon from 'assets/images/human_icon.png';
import videoOffImg from 'assets/images/video_off_btn.png';
import videoOnImg from 'assets/images/video_on_btn.png';
import {io} from 'socket.io-client';

const Video = () => {
  const WEBSOCKET_URL = 'ws://localhost:8080/ws';
  const socket = io(WEBSOCKET_URL);
  const [isFront, setIsFront] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const handleAudio = () => {
    setAudioOn(!audioOn);
    localStream &&
      localStream
        .getAudioTracks()
        .forEach(
          (track: {enabled: boolean}) => (track.enabled = !track.enabled),
        );
  };

  const handleVideo = () => {
    setVideoOn(!videoOn);
    localStream &&
      localStream
        .getVideoTracks()
        .forEach(
          (track: {enabled: boolean}) => (track.enabled = !track.enabled),
        );
  };

  const hangUpCall = () => {
    console.log('hangUp');
  };

  const connectSocket = () => {
    socket.on('connect', () => {
      console.log('connected');
    });
  };

  const getUserMedia = async () => {
    if (localStream) {
      const tracks = localStream.getTracks();
      tracks.forEach((track: {stop: () => void}) => track.stop());
    }
    const constraints = {
      audio: true,
      video: {facingMode: isFront ? 'user' : 'environment'},
    };
    const myStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(myStream);
  };

  useEffect(() => {
    getUserMedia();
  }, [isFront]);

  useEffect(() => {
    connectSocket();
  }, []);

  //TODO : remote stream부분의 streamURL 추후 수정하기
  return (
    <ScreenContainer>
      <RTCView
        objectFit="cover"
        style={styles.remoteVideo}
        streamURL={localStream && localStream.toURL()}
      />
      <VideoView>
        <CloseCallBtn onPress={() => hangUpCall()}>
          <BtnText>나가기</BtnText>
        </CloseCallBtn>
        <RemoteCallerName>
          <BtnText>김퍼즐</BtnText>
        </RemoteCallerName>

        <MyVideoView>
          {videoOn ? (
            <RTCView
              objectFit="cover"
              streamURL={localStream && localStream.toURL()}
              style={styles.myVideo}
            />
          ) : (
            <HumanIconContainer>
              <HumanIcon source={humanIcon} />
            </HumanIconContainer>
          )}

          <MyName>
            <BtnText>조나온</BtnText>
            <AudioOffIconContainer>
              {!audioOn && (
                <IconOrImg source={audioOffIcon} resizeMode="contain" />
              )}
            </AudioOffIconContainer>
          </MyName>
        </MyVideoView>
      </VideoView>

      <ControllerView>
        <ControllerBtn
          onPress={() => {
            setIsFront(prev => !prev);
          }}>
          <IconOrImg source={cameraReverse} />
        </ControllerBtn>
        <ControllerBtn
          onPress={() => {
            handleAudio();
          }}>
          <IconOrImg source={audioOn ? audioOnImg : audioOffImg} />
        </ControllerBtn>
        <ControllerBtn
          onPress={() => {
            handleVideo();
          }}>
          <IconOrImg source={videoOn ? videoOnImg : videoOffImg} />
        </ControllerBtn>
      </ControllerView>
    </ScreenContainer>
  );
};

export default Video;

interface Styles {
  remoteVideo: ViewStyle;
  myVideo: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  remoteVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  myVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

const ScreenContainer = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: white;
  position: relative;
  z-index: -1;
`;

const VideoView = styled.View`
  flex: 4.5;
  position: relative;
  justify-content: flex-end;
`;

const CloseCallBtn = styled.TouchableOpacity`
  position: absolute;
  top: 47px;
  right: 15px;
  width: 76px;
  height: 32px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.redTwo};
`;

const BtnText = styled.Text`
  margin: 0 auto;
  padding: 2px 0px;
  text-align: center;
  color: white;
  line-height: 27px;
  font-size: ${({theme}) => theme.fontRegular};
  font-family: 'NotoSansKR-Regular';
`;

const RemoteCallerName = styled.View`
  width: 76px;
  height: 32px;
  margin: 21px auto;
  background-color: black;
  opacity: 0.65;
  border-radius: 8px;
`;

const ControllerView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 45px 64px;
  background-color: black;
  opacity: 0.8;
`;

const ControllerBtn = styled.TouchableOpacity`
  width: 57px;
  height: 57px;
`;

const IconOrImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const MyVideoView = styled.View`
  position: absolute;
  bottom: 22px;
  right: 15px;
  width: 100px;
  height: 140px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 3;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
`;

const HumanIconContainer = styled.View`
  background-color: ${({theme}) => theme.grayTwo};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const HumanIcon = styled.Image`
  width: 66px;
  height: 66px;
  margin: 26px auto;
`;

const MyName = styled.View`
  position: absolute;
  bottom: 0px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 32px;
  background-color: black;
  opacity: 0.65;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const AudioOffIconContainer = styled.View`
  position: absolute;
  right: 10px;
  width: 9px;
  height: 13.7px;
`;
