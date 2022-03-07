import React, {useState} from 'react';
import {AppBar,Toolbar,Typography,InputBase,Box} from "@material-ui/core";
import useStyles from "./styles";
const Header = ({setCoordinate}) => {
    const classes=useStyles();
    const [autoComplete,setAutoComplete]=useState(null)
    const onLoad = (autoC) => setAutoComplete(autoC)
    const onPlaceChanged = () => {
      const lat=autoComplete.getPlace().geometry.location.lat();
      const lng=autoComplete.getPlace().geometry.location.lng();
      setCoordinate([lat,lng])
    }
    return (
        <h1>
        <AppBar position={"static"}>
            <Toolbar className={classes.toolbar}>
                <Typography variant={'h5'} className={classes.title}>
                    Travel Advisor
                </Typography>
              <Box display={'flex'} alignItems={'center'}>
                  <Typography variant={'h6'} className={classes.title}>
                      Explore new places
                  </Typography>
                  {/*/!*<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>*!/*/}
                  {/*    <div className={classes.search}>*/}
                  {/*        <div className={classes.searchIcon} >*/}
                  {/*            <SearchIcon/>*/}
                  {/*        </div>*/}
                  {/*        <InputBase placeholder={'Search ...'}*/}
                  {/*                   className={`${classes.inputInput} ${classes.inputRoot} `}/>*/}
                  {/*    </div>*/}
                  {/*/!*</Autocomplete>*!/*/}
              </Box>
            </Toolbar>
        </AppBar>
        </h1>
    );
};

export default Header;