import {Item, HeaderButtons} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

export const createHeaderButtonNavigation = (onPress = () => {}, title = 'Toggle Drawer', iconName = 'ios-menu') => {
    return (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title={title} iconName={iconName} onPress={onPress} />
        </HeaderButtons>
    );
};
