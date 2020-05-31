import React from 'react';
import './App.css';
import CenteredGrid from './components/CenteredGrid';
import { Typography, CardContent } from '@material-ui/core';

function App() {
  return (
    <div className="App">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Warehouse log parser
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <CenteredGrid />
          </Typography>
        </CardContent>
    </div>
  );
}

export default App;
