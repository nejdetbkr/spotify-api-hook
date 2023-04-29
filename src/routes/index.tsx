import React from "react";
import Discover from "./Discover";

import { useSpotify } from "../hooks/spotify";

export default function Routes() {
  // Here you'd return an array of routes

  const { newReleases, playlists, categories } = useSpotify();

  return (
    <Discover
      newReleases={newReleases}
      playlists={playlists}
      categories={categories}
    />
  );
}
