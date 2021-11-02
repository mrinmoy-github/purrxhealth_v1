import { NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';

export const config =  [
      {
          width: '550px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          imageSize: NgxGalleryImageSize.Contain,
          thumbnailSize: NgxGalleryImageSize.Contain
      },
      // max-width 800
      {
          breakpoint: 995,
          width: '100%',
          height: '400px',
          imagePercent: 100,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          imageSize: NgxGalleryImageSize.Contain,
          thumbnailSize: NgxGalleryImageSize.Contain
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '400px',
        imagePercent: 100,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Contain
    },

      // max-width 400
      {
          breakpoint: 400,
          preview: true
      }
  ];
