import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import images from "../../assets/images";
import {
  CarouselSection,
  ContentOffset,
  ContentSectionA,
  LandingContentContainer,
  LI,
  UL,
} from "./styles";

const data = [
  {
    id: "5",
    text: "To project a positive image of the Indian community in Nigeria.",
  },
  {
    id: "1",
    text:
      "Projecting and highlighting the many important contributions made by Indian Professionals in Nigeria.",
  },

  {
    id: "2",
    text:
      "Projecting a clear perspective of India, its achievements, successes, potential and stature and the relevance of this to Nigeria.",
  },
  {
    id: "3",
    text:
      "To encourage more frequent business and social links between opinion makers in Nigeria and Indian Professionals.",
  },

  {
    id: "4",
    text:
      "To emphasise the professionalism of the average Indian expatriate working in Nigeria.",
  },
];
const LandingContent = () => {
  return (
    <LandingContentContainer>
      <ContentSectionA>
        <h4>About IPF</h4>
        <ContentOffset>
          <UL>
            {data.map((item) => {
              return (
                <LI key={item.id}>
                  <p style={{ opacity: 1 }}>{item.text}</p>
                </LI>
              );
            })}
          </UL>
        </ContentOffset>
      </ContentSectionA>

      <CarouselSection>
        <Carousel
          showArrows={false}
          infiniteLoop={true}
          autoPlay
          showThumbs={false}
        >
          <div>
            <img src={images.slide1} alt="img" />
          </div>
          <div>
            <img src={images.slide2} alt="ipf" />
          </div>
          <div>
            <img src={images.slide3} alt="img" />
          </div>

          <div>
            <img src={images.slide4} alt="img" />
          </div>
        </Carousel>
      </CarouselSection>
    </LandingContentContainer>
  );
};

export default LandingContent;
