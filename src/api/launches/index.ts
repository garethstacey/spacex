import axios from "axios";

export const getLatestLaunches = async (limit: number): Promise<Launch[]> => {
  const response = await axios.get(
    "https://api.spacexdata.com/v3/launches?limit=50&sort=launch_date_utc&order=desc"
  );
  return response.data;
};
