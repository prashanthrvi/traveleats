import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
// import LocationOutlinedIcon from "@material-ui/icons/LocationOutlined"
import Rating from "@material-ui/lab/Rating"

import useStyles from "./style"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"

const Map = ({ setCordinates, setBounds, cordinates, places }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery("(min-width:600px)")

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAj00nJ-PrSbTlUVsHqc0pdStnfACkEGVw" }}
        defaultCenter={cordinates}
        center={cordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(event) => {
          console.log(event)
          setCordinates({ lat: event.center.lat, lng: event.center.lng })
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw })
        }}
        onChildClick={""}
      >
        {places?.map((place, index) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            {isMobile ? (
              <LocationOnOutlinedIcon color="secondary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
