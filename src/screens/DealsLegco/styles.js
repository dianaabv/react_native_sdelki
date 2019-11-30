const React = require("react-native");
const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
export default {
  myInputBorder:{
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: '#D9D5DC',
    backgroundColor: 'transparent',
   marginLeft:10,
   opacity:1,
   alignItems: 'center',
   fontSize: 16,
   paddingTop: 5,
     paddingBottom: 5,
  },
  center:{justifyContent: "center"},
  myInput:{
    fontSize: 16,
    borderBottomWidth:1,
    borderColor:'#D9D5DC',
    marginLeft: 10,
    paddingTop: 5,
      paddingBottom: 5,
    marginRight: 10,
  },
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginLeft: -10
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 6,
    marginBottom: 30
  },
  myFontH:{
    textAlign: 'center',
    marginBottom: 5,
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 200,
    height: 80
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  myFont:{
    fontWeight: '600'
  },
  myFont2:{
      fontWeight: '600',
    fontSize: 20
  },
  myFont1:{
      fontWeight: '600',
    fontSize: 20,
    marginLeft: 8
  },
  myMarg:{
    marginBottom:15
  },

  list: {
    flex: 1,
    marginTop:20,
  },
  myPadding:{
    marginBottom: 10
  }
};
