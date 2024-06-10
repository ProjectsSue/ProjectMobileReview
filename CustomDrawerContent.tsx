import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useContext } from 'react';
import { CategoryContext } from './appContexts';
import Ionicons from '@expo/vector-icons/Ionicons';
import I18n from './locales';
import cssConsts from './cssConsts';

function CustomDrawerContent(props) {
  const { currentCategory, setCurrentCategory } = useContext(CategoryContext);
  
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