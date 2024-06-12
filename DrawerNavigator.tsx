import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import ItemList from './Components/List';
import Item from './Components/Item';
import CommentForm from './Components/CommentForm';
import ItemForm from './Components/ItemForm';
import profileForm from './Components/ProfileForm';
import CustomDrawerContent from './CustomDrawerContent';
import { CategoryContext } from './appContexts';
import I18n from './locales';
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  const currentCategory = useContext(CategoryContext).currentCategory;
  return (
    <Drawer.Navigator defaultStatus="closed" screenOptions={{ headerShown: true }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Group>
        <Drawer.Screen name="Home" options={{title: I18n.t(currentCategory+'.navTitle')}} component={ItemList}/>
        <Drawer.Screen name="Item" options={{title: I18n.t(currentCategory+'.navItem')}} component={Item}/>
        <Drawer.Screen name="CommentForm" options={{title: I18n.t(currentCategory+'.navNewComment')}} component={CommentForm}/>
        <Drawer.Screen name="ItemForm" options={{title: I18n.t(currentCategory+'.navNewItem')}} component={ItemForm}/>
        <Drawer.Screen name="Profile" options={{title: I18n.t('profileEditor')}} component={profileForm}/>
      </Drawer.Group>  
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;