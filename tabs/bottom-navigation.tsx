import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screen';
import TransactionScreen from '../screens/transaction';
import UserScreen from '../screens/user-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Ant from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RealEstateScreen from '../screens/rs-screen';
import ProjectsScreen from '../screens/pj-screen';

const Tab = createBottomTabNavigator();

export function Tabs() {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: '#ffb41f'
            }}
        >
            <Tab.Screen
                name="home-screen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color }) => (
                        <Ionicons 
                            name='home-outline' 
                            size={24} 
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="rs-screen"
                component={RealEstateScreen}
                options={{
                    tabBarLabel: "Bài đăng",
                    tabBarIcon: ({ color }) => (
                        <Ant 
                            name='isv' 
                            size={24} 
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="pj-screen"
                component={ProjectsScreen}
                options={{
                    tabBarLabel: 'Dự án',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome 
                            name='building-o' 
                            size={24} 
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="transaction-screen"
                component={TransactionScreen}
                options={{
                    tabBarLabel: 'Giao dịch',
                    tabBarIcon: ({ color }) => (
                        <Ant 
                            name='shoppingcart' 
                            size={24} 
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="user-screen"
                component={UserScreen}
                options={{
                    tabBarLabel: 'Người dùng',
                    tabBarIcon: ({ color }) => (
                        <Ionicons 
                            name='person-circle-outline' 
                            size={24} 
                            color={color}
                        />
                    )
                }}
            />

        </Tab.Navigator>
    );
}
