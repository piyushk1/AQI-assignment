import useUpdatingClock from 'hooks/useUpdatingClock'
import { useState } from 'react'
import React from 'react'
import CitySearch from './CitySearch'
export default function App() {
  const {hour, minutes, seconds, amPm} = useUpdatingClock()

  return (
   <div>
    <CitySearch/>
    
   </div>
  )
}
