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
    text: "Link between Indian High Commission and Industry",
  },
  {
    id: "1",
    text: "Linking Indian and Nigerian Professionals",
  },

  {
    id: "2",
    text:
      "Projecting a clear perspective of India, its achievements, successes, potential and stature and the relevance of this to Nigeria.",
  },
  {
    id: "3",
    text: "Highlight contributions made by Indian Professionals in Nigeria",
  },

  {
    id: "4",
    text: "Present positive perspective of India's role in International Forum",
  },
  {
    id: "8",
    text: "Enhance the role of Indian Professionals across the globe.",
  },
];
const LandingContent = () => {
  return (
    <LandingContentContainer>
      <ContentSectionA>
        <h4>Our Purpose</h4>
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
