import React, { useEffect, useState, useMemo } from "react";
import getMovies from "../apis/getMovies";
import { Grid, Typography } from "@mui/material";

const calculateNumberOfElements = () => {
  let numberOfElements;
  if (window.innerWidth < 600) {
    numberOfElements = 3;
  } else if (window.innerWidth < 900) {
    numberOfElements = 4;
  } else if (window.innerWidth < 1200) {
    numberOfElements = 5;
  } else {
    numberOfElements = 6;
  }

  console.log(numberOfElements);
  return numberOfElements;
};

const ImageRow = () => {
  const [hovering, setHovering] = useState(-1);
  const [transform, setTransform] = useState("");
  const numberOfElements = useMemo(calculateNumberOfElements, [
    window.innerWidth,
  ]);
  const images = getMovies();
  useEffect(() => {
    let str = "";
    if (hovering !== -1) {
      str = "scale(1.25)";
      if (hovering === 0) {
        str = str + "translateX(15%) ";
      } else if (hovering === numberOfElements - 1) {
        str = str + "translateX(-15%) ";
      }
    }
    setTransform(str);
  }, [hovering, numberOfElements]);
  const movieImages = (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      wrap="nowrap"
      sx={{
        overflowX: "clip",
        overflowY: "visible",
      }}
      spacing={1}
      marginLeft="3.5%"
      marginRight="3.5%"
      maxWidth="93%"
    >
      {images.map((image, index) => (
        <Grid
          key={image.id}
          item
          sx={[
            {
              flex: {
                xs: "0 0 33.3%",
                sm: "0 0 25%",
                md: "0 0 20%",
                lg: "0 0 16.6%",
              },
              transition: "transform 300ms ease 100ms",
            },
            hovering === index && {
              transform: `${transform}`,
            },
          ]}
          onMouseEnter={() => {
            setHovering(index);
          }}
          onMouseLeave={() => {
            setHovering(-1);
          }}
        >
          <img src={`${image.image}`} alt={"Not Found"} loading="lazy" />
          {hovering === index ? (
            <Typography variant="body1" color="white">
              {image.title}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
      ))}
      ;
    </Grid>
  );

  return <div>{movieImages}</div>;
};

export default ImageRow;
