import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    loading: false,
  },
  reducers: {
    // Set the list of videos
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { setVideos } = videosSlice.actions;
export default videosSlice.reducer;
