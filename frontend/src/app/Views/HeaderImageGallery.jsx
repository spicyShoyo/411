import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import ImageGallery from 'react-image-gallery'

let images = [
  {original: 'http://gethdpic.com/wp-content/uploads/2013/10/Lime-Cocktail-Hd-Widescreen-Wallpapers-.jpg'},
  {original: 'http://wallpoper.com/images/00/24/69/34/alcohol-cocktail_00246934.jpg'},
  {original: 'http://www.mrwallpaper.com/wallpapers/beach-party-cocktail.jpg'},
  {original: 'https://images5.alphacoders.com/358/358132.jpg'},
];

const style = {
  height: 100
}

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
         style={style}
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
