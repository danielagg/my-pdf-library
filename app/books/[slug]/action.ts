"use server";

import axios from "axios";

export const downloadBook = async (accessToken: string, id: string) => {
  const url = new URL(
    `https://www.googleapis.com/drive/v3/files/${id}?supportsTeamDrives=true&alt=media`
  );
  const response = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    responseType: "arraybuffer",
  });

  const base64Data = Buffer.from(response.data, "binary").toString("base64");
  return base64Data;
};
