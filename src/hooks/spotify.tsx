import axios from "axios";
import { useEffect, useState } from "react";

export interface ISpotify {
  images: Image[];
  icons: Image[];
  name: string;
  [key: string]: Image[] | string;
}

interface Image {
  url: string;
}

export const useSpotify = () => {
  const [token, setToken] = useState<string>();
  const [newReleases, setNewReleases] = useState<ISpotify[]>([]);
  const [playlists, setPlaylists] = useState<ISpotify[]>([]);
  const [categories, setCategories] = useState<ISpotify[]>([]);

  useEffect(() => {
    if (token) {
      // API Services
      const api = async (url: string) => {
        axios
          .create({
            baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .request({
            method: "GET",
            url: url,
          })
          .then((response) => {
            switch (url) {
              case "/new-releases":
                setNewReleases(response.data.albums.items);
                console.log("newReleases", response.data.albums.items);
                break;
              case "/featured-playlists":
                setPlaylists(response.data.playlists.items);
                console.log("playlists", response.data.playlists.items);
                break;
              default:
                setCategories(response.data.categories.items);
                console.log("categories", response.data.categories.items);
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      api("/new-releases");
      api("/featured-playlists");
      api("/categories");
    } else {
      // API Access Token

      axios
        .create({
          baseURL: process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .request({
          method: "POST",
          url: "/token",
          data:
            "grant_type=client_credentials&client_id=" +
            process.env.REACT_APP_SPOTIFY_CLIENT_ID +
            "&client_secret=" +
            process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
        })
        .then((response) => {
          setToken(response.data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return {
    newReleases,
    playlists,
    categories,
  };
};
