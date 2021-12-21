import React, { useEffect, useState, useMemo } from "react";
import getMovies from "../apis/getMovies";
import { Button, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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

  return numberOfElements;
};

const ImageRow = () => {
  const [hovering, setHovering] = useState(-1);
  const [transform, setTransform] = useState("");
  const numberOfElements = useMemo(calculateNumberOfElements, [
    window.innerWidth,
  ]);
  const images = getMovies();

  const [viewImages, setViewImages] = useState(images.slice(numberOfElements));
  const [viewIndex, setViewIndex] = useState(0);

  const canMoveRow = (pos) => {
    let newPos = viewIndex + pos;
    while (newPos < 0 || newPos + numberOfElements > images.length) {
      if (newPos < 0) {
        newPos++;
      } else {
        newPos--;
      }
    }

    if (viewIndex !== newPos) {
      return [true, newPos];
    }

    return [false, viewIndex];
  };

  const moveRow = (pos) => {
    const [canMove, newPos] = canMoveRow(pos);
    if (canMove === true) {
      setViewIndex(newPos);
    }
  };

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

  useEffect(() => {
    setViewImages(images.slice(viewIndex, viewIndex + numberOfElements));
  }, [numberOfElements, images, viewIndex]);

  const movieImages = (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      sx={{
        overflowX: "clip",
        overflowY: "visible",
      }}
      maxWidth="92%"
    >
      {viewImages.map((image, index) => (
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
        </Grid>
      ))}
      ;
    </Grid>
  );

  return (
    <div>
      <Grid container maxWidth="100%" direction="row" wrap="nowrap">
        <Grid
          item
          key="BackwardIcon"
          sx={{
            flex: "0 0 4%",
          }}
        >
          <Button
            sx={{
              height: "100%",
            }}
            onClick={() => moveRow(-numberOfElements)}
          >
            <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
          </Button>
        </Grid>
        {movieImages}
        <Grid
          item
          key="ForwardIcon"
          sx={{
            flex: "0 0 4%",
          }}
        >
          <Button
            sx={{
              height: "100%",
            }}
            onClick={() => moveRow(numberOfElements)}
          >
            <ArrowForwardIosIcon fontSize="large"></ArrowForwardIosIcon>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageRow;
