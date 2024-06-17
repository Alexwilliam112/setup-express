import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import { fetchAlltemp } from "../features/Temp";

export default function Template({ url }) {

  const { temp, loading, error } = useSelector((state) => state.temp);
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate()



  useEffect(() => {
    dispatch(fetchAlltemp())
  }, []);

  useEffect(() => {
    if (error) {
      Toastify({
        text: error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold"
        }
      }).showToast();
    }
  }, [error]);

  return (
    <>
      
    </>
  )
}