"use client";

import { setupNotificationListenersRedux } from "@/socket/listener/notificationListener";
import { connectSocket, disconnectSocket, selectIsConnected, selectSocketInstance } from "@/stores/slices/socketSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function SocketLayout() {
  const dispatch = useDispatch();
  const isSocketConnected = useSelector(selectIsConnected)
  const socket = useSelector(selectSocketInstance)

  useEffect(() => {
    dispatch(connectSocket());
  

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSocketConnected) {
      setupNotificationListenersRedux(socket, dispatch);
    }
  }, [isSocketConnected, dispatch, socket]);


  return <Outlet />;
}
