import React from 'react';
import AdbIcon from '@material-ui/icons/Adb';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExtensionIcon from '@material-ui/icons/Extension';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PetsIcon from '@material-ui/icons/Pets';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const ICONS_MAP = {
    1: AdbIcon,
    2: AirplanemodeActiveIcon,
    3: BeachAccessIcon,
    4: BrightnessLowIcon,
    5: ChildFriendlyIcon,
    6: ColorLensIcon,
    7: DirectionsBusIcon,
    8: DirectionsRunIcon,
    9: EmojiEmotionsIcon,
    10: FavoriteIcon,
    11: ExtensionIcon,
    12: FilterVintageIcon,
    13: FreeBreakfastIcon,
    14: GitHubIcon,
    15: HomeIcon,
    16: NotificationsIcon,
    17: PetsIcon,
    18: RestaurantIcon
}

const COLORS_MAP = {
    1: "#C71585",
    2 : "#228B22",
    3 : "#FFFF00",
    4 : "#778899",
    5 : "#A0522D",
    6 : "#0000CD",
    7 : "#BDB76B",
    8 : "#00CED1",
    9 : "#FF8C00",
    10 : "#9400D3",
    11 : "#00FF7F",
    12 : "#FF0000",
    13 : "#ADFF2F",
    14 : "#DDA0DD",
    15 : "#FA8072",
    16 : "#FF8C00",
    17 : "#6495ED",
    18 : "#2F4F4F"
};

export const CardIcon = ({iconId}) => {
    const CardIcon = ICONS_MAP[iconId];
    const cardColor = COLORS_MAP[iconId];
    return <CardIcon style={{ fontSize: 64, marginTop: "5px", color: cardColor }}/>;
};

export default CardIcon;