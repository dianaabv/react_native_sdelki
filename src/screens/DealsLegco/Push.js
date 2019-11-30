// import React, { Component } from 'react';
// import PushNotification from 'react-native-push-notification';
// import {AsyncStorage, Platform, PushNotificationIOS, ToastAndroid,} from 'react-native';
// export default class PushController extends Component {
//   componentDidMount() {
//     PushNotification.configure({
//       onNotification: function(notification) {
//         setTimeout(() => {
//           if(!notification['foreground']){
//             ToastAndroid.show("You've clicked!", ToastAndroid.SHORT);
//           }
//         }, 1);
//
//         console.log( 'NOTIFICATION:', notification );
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },
//     });
//   }
//
//   render() {
//     return null;
//   }
// }
