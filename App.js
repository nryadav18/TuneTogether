import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';


// Stack Screens
import Launch from './screens/launch/launch';
import Welcome from './screens/launch/welcome';
import Login from './screens/login/login';
import Signup from './screens/signup/signup';
import Forgot from './screens/signup/fotp';
import Confirm from './screens/signup/Confirm'
import AI_Intro from './screens/ai/ai_intro/ai_intro';
import AI_Support from './screens/ai/ai_support/ai_support';
import Genre from './screens/profile/genre'
import OtpPage from './screens/signup/otp'
import SingupLogin from './screens/signup/signupLogin'
import Search from './screens/home/homeComponents/search';
import MoreOptions from './screens/home/MusicPlay/MoreOptions';
import MusicPlayerCard from './screens/home/MusicPlay/MusicPlay';


// Bottom Tab Screens
import Home from './screens/home/home';
import TuneTogther from './screens/tune/tune'
import Favourites from './screens/fav/fav'
import Friends from './screens/friends/friends';
import Profile from './screens/profile/profile'
import Create from './screens/tune/room/create';
import Join from './screens/tune/room/join';
import SelectRoom from './screens/tune/room/select';
import Header from './screens/header/header';
import Setting from './screens/profile/setting';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('screen')

const StackArray = [
  { name: 'Launch', component: Launch, headerShown: false, },
  { name: 'Welcome', component: Welcome, headerShown: false, },
  { name: 'Login', component: Login, headerShown: false, },
  { name: 'Signup', component: Signup, headerShown: false, },
  { name: 'OtpPage', component: OtpPage, headerShown: false, },
  { name: 'SignupLogin', component: SingupLogin, headerShown: false, },
  { name: 'Forgot', component: Forgot, headerShown: false, },
  { name: 'Confirm', component: Confirm, headerShown: false, },
  { name: 'EditProfile', component: Profile, headerShown: false },
  { name: 'Genre', component: Genre, headerShown: false },
  { name: 'Create', component: Create, headerShown: true, },
  { name: 'Join', component: Join, headerShown: true, },
  { name: 'SelectRoom', component: SelectRoom, headerShown: true, },
  { name: 'AI_Intro', component: AI_Intro, headerShown: true, },
  { name: 'AI_Support', component: AI_Support, headerShown: true, },
  { name: 'Search', component: Search, headerShown: false },
  { name: 'MoreOptions', component: MoreOptions, headerShown: false },
  { name: 'MusicPlayerCard', component: MusicPlayerCard, headerShown: false },
]

const TabArray = [
  { name: 'Home', component: Home, nonFocusIcon: 'home', onFocusIcon: 'home-outline', label: 'Play' },
  { name: 'TuneTogther', component: TuneTogther, nonFocusIcon: 'music-circle', onFocusIcon: 'music-circle-outline', label: 'Tune' },
  { name: 'Friends', component: Friends, nonFocusIcon: 'account-group', onFocusIcon: 'account-group-outline', label: 'Friends' },
  { name: 'Favourites', component: Favourites, nonFocusIcon: 'heart', onFocusIcon: 'heart-outline', label: 'Favourites' },
  { name: 'Profile', component: Setting, nonFocusIcon: 'account', onFocusIcon: 'account-outline', label: 'Profile' },
]

const TabScreen = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const { icon } = route.params;
          return <Icon name={focused ? icon.active : icon.inactive} size={size} color={color} />
        },
        tabBarActiveTintColor: styles.tabBar.activeTintColor,
        tabBarInactiveTintColor: styles.tabBar.inactiveTintColor,
        tabBarStyle: styles.tabBar.container,
        tabBarLabelStyle: styles.tabBar.label,
      })}
    >
      {
        TabArray && TabArray.map((item, index) => {
          return (
            <Tab.Screen name={item.name} component={item.component} key={index}
              initialParams={{
                icon: { active: item.onFocusIcon, inactive: item.nonFocusIcon, size: 80, color: 'white' }
              }}
              options={{
                header: () => <Header />
              }}
            ></Tab.Screen>
          )
        })
      }
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Genre'>
        {
          StackArray.map((item, index) => {
            if (item.name === "Launch") {
              const LaunchWithNavigation = (props) => {
                useEffect(() => {
                  const timer = setTimeout(() => {
                    props.navigation.replace("Welcome");
                  }, 2000);
                  return () => clearTimeout(timer);
                }, [props.navigation]);
                return <item.component {...props} />;
              };
              return (
                <Stack.Screen key={index} name={item.name} component={LaunchWithNavigation}
                  options={{ headerShown: false }}
                />
              );
            }
            return (
              <Stack.Screen key={index} name={item.name} component={item.component}
                options={{
                  header: item.name === "Welcome" || item.name === "Login" || item.name === "Setting" || item.name === "Login"
                    || item.name === "EditProfile" || item.name === "Genre" ? undefined : () => <Header />,
                  headerShown: item.headerShown
                }}
              />
            );
          })
        }
        <Stack.Screen name='TabScreen' component={TabScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    container: {
      borderTopWidth: 0,
      elevation: 23,
      height: 60,
    },
    activeTintColor: '#41C3D6',
    inactiveTintColor: '#A9A9A9',
    label: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 5,
    },
  },
})