const React = require("react-native");
const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
export default {

  metext:{
    fontSize:18,
    color: '#FFF'

  },
  myInput:{
    fontSize: 16,
    borderBottomWidth:1,
    borderColor:'gray',
    marginLeft: 15,
    paddingTop: 5,
    marginRight: 15,
  },
  container1: {
    backgroundColor: "white",
    paddingTop: 15,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    backgroundColor: "#FFF"
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 6,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 160 : 80,
    bottom:  10,
    height: 70,
    width: 70,
    //left: 50,

  },
  inputMask3:{
    borderBottomWidth: 1,
    borderColor:"#D9D5DC",
    lineHeight:24,
    marginLeft:15,
    marginRight:15,
    height: 50,
  },
  inputMask:{
    borderBottomWidth: 1,
    borderColor:"#D9D5DC",
    height: 50,
    lineHeight:24
  },

  inputMask1:{
    borderBottomWidth: 1,
    borderColor:"#D9D5DC",
    lineHeight:24,

    marginRight:10,
    height: 50,
  },
  inputMask2:{
    borderBottomWidth: 1,
    borderColor:"red",
    lineHeight:24,

    marginRight:10,
    height: 50,
  },
  myLabel1:{
    marginLeft: 15,
    position: null,
    top: 5,
    right:null,
    paddingTop: 5,
    fontSize:15,
    color: "grey"
  },
  myLabel:{
     marginTop: 15,
    position: null,
    top: 5,
    left:null,
    right:null,
    paddingTop: 5,
    fontSize:15,
    paddingLeft: null,
    color: "#575757"
  },
  myDatepicker: {
    heigth: 37,
    borderWidth:0,
    width: 100
  },
  mygreen:{
    borderWidth: "#5cb85c"
  },
  myLinks:{
    margin: -15,
    marginBottom: 3
  }
};
