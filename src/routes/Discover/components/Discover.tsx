import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

import { ISpotify } from "../../../hooks/spotify";

//TODO: Fix `any` types here

interface IDiscoverProps {
  newReleases: ISpotify[];
  playlists: ISpotify[];
  categories: ISpotify[];
}

interface IDiscoverState {}

export default class Discover extends Component<
  IDiscoverProps,
  IDiscoverState
> {
  constructor(props: IDiscoverProps) {
    super(props);
  }

  //TODO: Handle APIs

  render() {
    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={this.props.newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={this.props.playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={this.props.categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
