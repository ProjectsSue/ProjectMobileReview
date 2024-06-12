import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useContext } from 'react';
import { Image } from 'react-native';
import { CategoryContext, UserContext } from './appContexts';
import Ionicons from '@expo/vector-icons/Ionicons';
import I18n from './locales';
import cssConsts from './cssConsts';
import baseStyles from './baseStyles';

function CustomDrawerContent(props) {
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  const user = useContext(UserContext);
  
  const loadItemChange = (item) => {
    setCurrentCategory(item);
    props.navigation.navigate('Home');
  }

  const itemCategories = ['book', 'movie', 'game'];
  const iconMap = { 'book': 'book', 'movie': 'tv', 'game': 'game-controller' };
  const loadIcon = (itemCategory, focused) => {
    return focused ? iconMap[itemCategory] : iconMap[itemCategory] + '-outline';
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        focused={false}
        label={I18n.t('editProfile')}
        onPress={() => props.navigation.navigate('Profile')}
        style={[baseStyles.marginBottom10]}
        icon={({ focused, color, size }) => (
          size = 45,
          <Image
            source={{ uri: 'https://media.licdn.com/dms/image/C5603AQFbSDxrJfdN_A/profile-displayphoto-shrink_400_400/0/1527881412699?e=1723680000&v=beta&t=B78ZSz4QJWzqR_k3I6QeWidXbnC59a60Xvq1EF-chSM' }}
            style={{ height: size, width: size, borderRadius: size/2}}
            resizeMode="contain"/>
        )}
      />
      {
        itemCategories.map((itemCategory) => {
         return <DrawerItem
            key={itemCategory}
            focused={currentCategory === itemCategory}
            activeTintColor={cssConsts[itemCategory+'Color']}
            label={I18n.t(itemCategory+'.navbar')}
            onPress={() => loadItemChange(itemCategory)}
            icon={({ focused, color, size }) => <Ionicons color={color} size={size} name={loadIcon(itemCategory, focused)} /> }
          />
        })
      }
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;