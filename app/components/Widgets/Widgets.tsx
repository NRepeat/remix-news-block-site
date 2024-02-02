import { WidgetsType } from "~/types/types";
import banerWidget from "../BanerWidget/BanerWidget";
import carouselPostWidget from "../CarouselPostWidget/CarouselPostWidget";
import carouselImageWidget from "../ImageCarouselWidget/ImageCarouselWidget";
import textWidget from "../TextWidget/TextWidget";


const widgets: WidgetsType = {
	TextWidget: textWidget,
	CarouselPostWidget: carouselPostWidget,
	CarouselImageWidget: carouselImageWidget,
	Baner: banerWidget
}

export default widgets