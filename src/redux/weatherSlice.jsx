import { createSlice} from '@reduxjs/toolkit';





const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
   cityname:"İzmir",

  },
  reducers: {
  updateCity : (state,action) => {
state.cityname = action.payload
  }
  },

});

 export const { updateCity} = weatherSlice.actions;
export default weatherSlice.reducer;
