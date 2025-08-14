
import type { NextApiRequest, NextApiResponse } from "next";
import mockData from "@/data/mockKYCData.json"; // adjust path

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("KYC API called"); // for debugging
  res.status(200).json(mockData);
}
