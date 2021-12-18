import React, { useState } from "react";
import getMovies from "../apis/getMovies";
import { Grid } from "@mui/material";

const ImageRow = () => {
  const [hovering, setHovering] = useState(-1);
  const images = getMovies();
  const movieImages = (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      wrap="nowrap"
      sx={{
        overflow: "auto",
      }}
      spacing={1}
      marginLeft="3.5%"
    >
      {images.map((image, index) => (
        <Grid
          key={image.id}
          item
          sx={[
            {
              flex: "0 0 15%",
              transition: "transform 300ms ease 100ms",
            },
            hovering === index && {
              transform: "scale(1.25)",
            },
          ]}
          onMouseEnter={() => {
            setHovering(index);
          }}
          onMouseLeave={() => {
            setHovering(-1);
          }}
        >
          <img
            src={`${image.image}`}
            srcSet={`${image.image}`}
            alt={"Not Found"}
            loading="lazy"
          />
        </Grid>
      ))}
      ;
    </Grid>
  );

  return <div>{movieImages}</div>;
};

export default ImageRow;
