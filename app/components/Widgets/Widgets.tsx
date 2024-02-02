import {WidgetsType} from '~/types/types';
import additionSearchPageNewsWidget from '../AdditionalNewsWidget/AdditionalNewsWidget';
import additionTagPageContentWidget from '../AdditionalTagsContentWidget/AdditionalTagsContentWidget';
import banerWidget from '../BanerWidget/BanerWidget';
import carouselPostWidget from '../CarouselPostWidget/CarouselPostWidget';
import carouselImageWidget from '../ImageCarouselWidget/ImageCarouselWidget';
import textWidget from '../TextWidget/TextWidget';

const widgets: WidgetsType = {
  TextWidget: textWidget,
  CarouselPostWidget: carouselPostWidget,
  CarouselImageWidget: carouselImageWidget,
  Baner: banerWidget,
  AdditionTagPageContent: additionTagPageContentWidget,
  AdditionalNews: additionSearchPageNewsWidget,
};

export default widgets;
