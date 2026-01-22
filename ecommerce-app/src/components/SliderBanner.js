import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function SliderBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box sx={{ width: "100%", mt: 2, mb: 3 }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide.id}>
            <Box
              sx={{
                height: { xs: 180, md: 400 },
                width: "100%",
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <img
                src={slide.image}
                alt="banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
