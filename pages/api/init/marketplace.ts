import type { NextApiRequest, NextApiResponse } from "next";
import { createCollection } from "@/lib/db/createMarketPlace";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const result = await createCollection();

    if (result.success) {
        return res.status(200).json({ message: "Collection created." });
    } else {
        return res.status(500).json({
            message: "Failed to create collection",
            error: result.error?.message || "Unknown error",
        });
    }
}
