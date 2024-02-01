import { WidgetsType } from "~/types/types";
import carouselPostWidget from "../CarouselPostWidget/CarouselPostWidget";
import CarouselImageWidget from "../ImageCarouselWidget/ImageCarouselWidget";
import textWidget from "../TextWidget/TextWidget";


const widgets: WidgetsType = {
	TextWidget: textWidget,
	CarouselPostWidget: carouselPostWidget,
	CarouselImageWidget: CarouselImageWidget
}

export default widgets