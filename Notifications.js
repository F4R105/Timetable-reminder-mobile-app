import * as Notifications from 'expo-notifications'

export async function schedulePushNotification(hour, minute, subject, room, lecturer) {
    const trigger = new Date()
    trigger.setHours(hour)
    trigger.setMinutes(minute)
    trigger.setSeconds(0)
  
    try{
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Timetable reminder",
          body: `Your ${subject} class by ${lecturer} starts soon at ${room}!..`,
        },
        // trigger: { 
        //   type:"weekly",
        //   hour: 22,
        //   minute: 5,
        //   seconds: 10,
        //   repeats: true 
        // },
        trigger
      });
    
      return notificationId
    }catch(error){console.log(error)}
  }
  
export async function cancelNotification(notificationId){
    try{
      await Notifications.cancelScheduledNotificationAsync(notificationId)
    }catch(error){console.log(error)}
  }