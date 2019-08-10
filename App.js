import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { API_KEY } from 'react-native-dotenv';

import HelloWorldSceneAR from './js/HelloWorldSceneAR';
import HelloWorldScene from './js/HelloWorldScene';

const sharedProps = {
  apiKey: API_KEY,
}

const UNSET = "UNSET";
const VR_NAVIGATOR_TYPE = "VR";
const AR_NAVIGATOR_TYPE = "AR";

const defaultNavigatorType = UNSET;

export default class ViroSample extends Component {

  constructor() {
    super();
  }

  state = {
    navigatorType : defaultNavigatorType,
    sharedProps : sharedProps
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  _getExperienceSelector = () => {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>VR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _helloWorldSceneAR = () => {
    return <HelloWorldSceneAR />
  }

  _getARNavigator = () => {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: this._helloWorldSceneAR}} />
    );
  }

  _helloWorldScene = () => {
    return <HelloWorldScene />
  }
  
  _getVRNavigator = () => {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: this._helloWorldScene}} onExitViro={this._exitViro}/>
    );
  }

  _getExperienceButtonOnPress = (navigatorType) => {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  _exitViro = () => {
    this.setState({
      navigatorType : UNSET
    })
  }
}

const localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
