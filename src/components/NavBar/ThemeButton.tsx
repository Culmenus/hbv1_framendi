import {  Typography } from "@mui/material";


import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";

export function ThemeToggleButton( {setDarkMode}: {setDarkMode: Function}) {
  const [alignment, setAlignment] = React.useState('Dark');

  const handleChange = (event: any, newAlignment: React.SetStateAction<string>) => {
    setAlignment(newAlignment);
    setDarkMode(newAlignment === 'Dark');
  };

  return (
      <div
      style={{
        flex: 1,
      }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="Dark">
            <Typography
              sx= {{
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Dark
            </Typography>
          </ToggleButton>
          <ToggleButton value="Light">
            <Typography
                sx= {{
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                Light
            </Typography>
          </ToggleButton>

        </ToggleButtonGroup>
      </div>
  );
}

