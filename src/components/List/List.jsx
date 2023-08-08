import React, { useState, useEffect, createRef } from "react"
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core"

import PlaceInfo from "../PlaceInfo/PlaceInfo"
import useStyles from "./style"

const List = (props) => {
  const { places, childClicked, isLoading, type, setType, rating, setRating } =
    props
  const classes = useStyles()
  // const [type, setType] = useState("restaurants")
  // const [rating, setRating] = useState("")
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, index) => elRefs[index] || createRef())

    setElRefs(refs)
  }, [places])

  // const places = [
  //   { name: "Cool Place" },
  //   { name: "Best Beer" },
  //   { name: "Best Steak" },
  // ]

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels and Attractions near you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Ratings</InputLabel>
            <Select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={1}>Above 5</MenuItem>
              <MenuItem value={2}>Above 4</MenuItem>
              <MenuItem value={3}>Above 3</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, index) => (
              <Grid ref={elRefs[index]} item key={index} xs={12}>
                <PlaceInfo
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={elRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default List
