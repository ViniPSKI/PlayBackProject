interface Album {
    id: number;
    title: string;
    cover_medium: string;
    type: string;
    nb_tracks: number;
    artist: {
      name: string;
    };
    tracklist: string;
  }