import React, { useState } from "react"
import { Autocomplete } from "@react-google-maps/api"
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import useStyles from "./style"

const Header = ({ setCordinates }) => {
  const classes = useStyles()
  const [autoComplete, setAutocomplete] = useState(null)
  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autoComplete?.getPlace().gepmetry.location.lat()
    const lng = autoComplete?.getPlace().geometry.location.lng()

    setCordinates({ lat, lng })
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          TravelEats
        </Typography>
        <Box className={classes.box}>
          <Typography variant="h6" className={classes.title}>
            Lets Explore
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
