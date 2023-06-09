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
    
      const allnots = await Notifications.getAllScheduledNotificationsAsync()
      console.log('schedulling notification', notificationId)
      console.log('all notifications', allnots)
      return notificationId
    }catch(error){console.log('notifications file, while schedulling', error.message)}
  }
  
export async function cancelNotification(notificationId){
    try{
      await Notifications.cancelScheduledNotificationAsync(notificationId)

      const allnots = await Notifications.getAllScheduledNotificationsAsync()
      console.log('cancelling notification')
      console.log('all notifications', allnots)
    }catch(error){console.log('notification file, cancelling notificatin', error.message)}
  }