import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ImageGallery from 'react-image-gallery'

let images = [
  {original: 'http://gethdpic.com/wp-content/uploads/2013/10/Lime-Cocktail-Hd-Widescreen-Wallpapers-.jpg'},
  {original: 'http://wallpoper.com/images/00/24/69/34/alcohol-cocktail_00246934.jpg'},
  {original: 'https://images8.alphacoders.com/371/371404.jpg'},
  {original: 'http://vladi-room.ru/uploads/vladi/2015/07/kokteyl_stol_bar_alkogol_napitok_43.jpg'},
];

class HeaderImageGallery extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  handleSlide(index) {
    console.log('Slid to ' + index);
  }

  render() {
    return (
       <ImageGallery
         items={images}
         autoPlay={true}
         showBullets={true}
         showThumbnails={false}
         showNav={false}
         slideInterval={4000}
         onSlide={this.handleSlide}/>
     );
  }
}

export default HeaderImageGallery;
