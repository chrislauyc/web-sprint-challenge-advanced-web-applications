import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`/colors/${editColor.id}`,editColor)
    .then((res)=>{
      setColors(colors.map(c=>{
        if(c.id===res.data.id){
          return res.data;
        }
        else{
          return c;
        }
      }));
    })
    .catch((err)=>{
      console.log({err});
    });
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/colors/${colorToDelete.id}`)
    .then((res)=>{
      console.log({res});
      setColors(colors.filter(c=>c.id!==parseInt(res.data)));
    })
    .catch((err)=>{
      console.log({err});
    });
  };
  const fetchColor = async()=>{
    const data = await fetchColorService();
    setColors(data);
  };
  useEffect(()=>{
    fetchColor();
  },[]);
  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
