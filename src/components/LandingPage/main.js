import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import images from "../../assets/images";
import {
  CarouselSection,
  ContentSectionA,
  ContentSectionBackground,
  LandingContentContainer,
  LI,
} from "./styles";

const C = [
  {
    imge: images.slide1,
  },
  {
    imge: images.slide2,
  },
  {
    imge: images.slide3,
  },
  {
    imge: images.slide4,
  },

  {
    imge: images.slide5,
  },
  {
    imge: images.slide6,
  },
  {
    imge: images.slide7,
  },
  {
    imge: images.slide8,
  },
  {
    imge: images.slide9,
  },
  {
    imge: images.slide10,
  },
  {
    imge: images.slide11,
  },
  {
    imge: images.slide12,
  },
  {
    imge: images.slide13,
  },
];

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
    text: "Highlight contributions made by Indian Professionals in Nigeria",
  },
  {
    id: "3",
    text:
      "Present positive perspective of India’s role in the International Forum",
  },

  {
    id: "4",
    text: "Enhance the role of Indian Professionals across the globe",
  },
];
const LandingContent = () => {
  return (
    <LandingContentContainer>
      <ContentSectionA>
        <ContentSectionBackground />
        <h4>IPF Aim and Purpose</h4>
        <ul style={{ marginTop: 20 }}>
          {data.map((item) => {
            return (
              <li className="li-item" key={item.id}>
                {item.text}
              </li>
            );
          })}
        </ul>
      </ContentSectionA>

      <CarouselSection>
        <Carousel
          showArrows={false}
          infiniteLoop={true}
          autoPlay
          showThumbs={false}
        >
          {C.map((item) => {
            return (
              <div key={item.image}>
                <img src={item.imge} alt="img" />
              </div>
            );
          })}

          {/* <div>
            <img src={images.slide2} alt="ipf" />
          </div>
          <div>
            <img src={images.slide3} alt="img" />
          </div>

          <div>
            <img src={images.slide4} alt="img" />
          </div> */}
        </Carousel>
      </CarouselSection>
    </LandingContentContainer>
  );
};

export default LandingContent;
