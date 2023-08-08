import React, { useState, useEffect } from "react"
import { CssBaseline, Grid } from "@material-ui/core"
import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"
import { getPlacesData } from "./apis"

const App = () => {
  const [places, setPlaces] = useState([])
  const [cordinates, setCordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState({})
  const [isLoading, setIsLoading] = useState({})
  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log("latitude" + latitude)
        setCordinates({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  useEffect(() => {
    console.log(cordinates, bounds)
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setFilteredPlaces([])
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0))
        setIsLoading(false)
      })
    }
  }, [bounds, type])

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces)
  }, [rating])

  return (
    <>
      <CssBaseline />
      <Header setCordinates={setCordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCordinates={setCordinates}
            setBounds={setBounds}
            cordinates={cordinates}
            places={filteredPlaces.length > 0 ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
