import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import * as Permission from "expo-Permission";
import{BarCodeScanner} from "expo-BarCode-Scanner";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      domState: "normal",
      hasCameraPermissions:null,
      scanned:false,
      scannedData:""
    };
  }

  getCameraPermissions = async domState =>{
    const {status} = await Permissions .askAsync(Permission.CAMERA);


    this.setState({
      hasCameraPermissions:status === "granted",
      domState: domState,
      scanned:false
    });
};

handleBarCodeScanned = async ({type,data}) => {
  this.setState({
    scannedData: data,
    domState:"normal",
    scanned:true
  });
};

  render() {
    const {domState,hasCameraPermissions,scannedData,scanned} = this.state;
    if(domState === "scanner"){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
        {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
          </Text>
          <TouchableOpacity
          style = {[styles.button,{marginTop:25}]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
        <Text style = {styles.buttonText}>Scan QR Code</Text>   
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
