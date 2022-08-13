import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationInterface {
    notifications: Notifications.Notification[];
    updateNotificationState: (noti: Notifications.Notification[]) => void
    registerNotification: () => Promise<string | undefined>;
}


Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
        const notifications = JSON.parse(await AsyncStorage.getItem('notifications') || "[]")
        const latestNotification = [...notifications, notification]
        await AsyncStorage.setItem('notifications', JSON.stringify(latestNotification))

        return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }
    },
});

const NotificationContext = createContext<NotificationInterface>({} as NotificationInterface)

export function usePushNotification() {
    return useContext(NotificationContext)
}

export function NotificationProvider({ children }: { children: any }) {
    const [notifications, setNotifications] = useState<Notifications.Notification[]>([])

    const registerForPushNotificationsAsync = useCallback(async () => {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Quyền gửi thông báo chưa được cho phép!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Bạn phải dùng thiết bị di động để nhận thông báo');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }, [])

    const handleNotification = (notification: Notifications.Notification) => {
        setNotifications(s => [...s, notification]);
    }

    const handleNotificationResponse = (event: Notifications.NotificationResponse) => {
        setNotifications(s => [...s, event.notification]);
    }

    useEffect(() => {
        (async () => {
            const notifications = JSON.parse(await AsyncStorage.getItem('notifications') || "[]")
            setNotifications(s => [...s, ...notifications])
        })()
        Notifications.addNotificationReceivedListener(handleNotification)
        Notifications.addNotificationResponseReceivedListener(handleNotificationResponse)
    }, [])

    const updateNotificationState = useCallback(async (noti: Notifications.Notification[]) => {
        setNotifications(noti)
        await AsyncStorage.setItem('notifications', JSON.stringify(noti))
    }, [setNotifications, AsyncStorage])

    const memoedValue = useMemo(() => ({
        notifications,
        updateNotificationState,
        registerNotification: registerForPushNotificationsAsync
    }), [notifications, registerForPushNotificationsAsync, updateNotificationState])

    return (
        <NotificationContext.Provider value={memoedValue}>
            {children}
        </NotificationContext.Provider>
    )
}