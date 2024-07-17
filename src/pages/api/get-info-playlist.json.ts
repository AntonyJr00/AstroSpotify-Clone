import { allPlaylists, songs as allsongs } from "@/lib/data";
import type { Playlist, Song } from "@/lib/data";

type Type = {
  params: string;
  request: any;
};

export async function GET({ params, request }: Type) {
  const { url } = request;

  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");
  const idSong = urlObject.searchParams.get("idSong");

  //todo---

  if (!id) {
    return new Response("ID not provided", { status: 400 });
  }

  const playlist = allPlaylists.find(
    (playlist: Playlist) => playlist.id === id
  );

  if (!playlist) {
    return new Response("Playlist not found", { status: 404 });
  }

  const songs = allsongs.filter(
    (song: Song) => song.albumId === playlist?.albumId
  );

  const song = idSong
    ? songs.find((song: Song) => song.id === parseInt(idSong))
    : id;

  return new Response(JSON.stringify({ playlist, songs, song }), {
    headers: { "content-type": "application/json" },
  });

  //todo---
}
