import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnai.js";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { GenerateContentConfig, GoogleGenAI } from "@google/genai";
import { request } from "http";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const stylePrompts = {
    "Bold & graphic":
        "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, dynamic composition",
    "Tech/Futuristic":
        "futuristic thumbnail, sleek design, metallic textures, neon accents, digital elements, high-tech vibe",
    Minimalist:
        "minimalist thumbnail, clean design, simple typography, limited color palette, negative space, modern aesthetic",
    Photorealistic:
        "photorealistic thumbnail, high detail, realistic lighting and shadows, natural colors",
    Illustrated:
        "illustrated thumbnail, hand-drawn style, vibrant colors, creative composition"
};

const colorSchemeDescriptions = {
    vibrant: "a vibrant color scheme with bold and lively colors",
    sunset: "a warm sunset palette with orange, pink, purple tones",
    forest: "earthy forest tones with green and brown shades",
    neon: "bright neon colors like electric blue and pink",
    purple: "various shades of purple",
    monochrome: "single color shades for a clean look",
    ocean: "cool ocean tones like blue and teal",
    pastel: "soft pastel tones"
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session as any;

        const {
            imageUrl,
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay
        } = req.body;

        // Step 1: Create DB entry
        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        });

        // Step 2: Build prompt
        let prompt = `Create a YouTube thumbnail for "${title}". `;

        if (style && stylePrompts[style as keyof typeof stylePrompts]) {
            prompt += stylePrompts[style as keyof typeof stylePrompts] + ". ";
        }

        if (color_scheme && colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]) {
            prompt += colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions] + ". ";
        }

        if (user_prompt) {
            prompt += `Additional details: ${user_prompt}. `;
        }

        prompt += `Make it bold, professional, visually stunning, and optimized for high CTR. Aspect ratio ${aspect_ratio || "16:9"}.`;

        // Step 3: AI config
        const config: GenerateContentConfig = {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
            responseModalities: ["Image"]
        };

        // Step 4: Generate image
        const response: any = await ai.models.generateContent({
            model: "gemini-3-pro-image-preview",
            contents: [prompt],
            config
        });

        const parts = response?.candidates?.[0]?.content?.parts;

        if (!parts) {
            throw new Error("Invalid AI response");
        }

        let finalBuffer: Buffer | null = null;

        for (const part of parts) {
            if (part.inlineData) {
                finalBuffer = Buffer.from(part.inlineData.data, "base64");
            }
        }

        if (!finalBuffer) {
            throw new Error("No image generated");
        }

        // Step 5: Save locally
        const filename = `thumbnail-${Date.now()}.png`;
        const filepath = path.join("images", filename);

        fs.mkdirSync("images", { recursive: true });
        fs.writeFileSync(filepath, finalBuffer);

        // Step 6: Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            resource_type: "image"
        });

        // Step 7: Update DB
        thumbnail.image_url = uploadResult.secure_url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        // Step 8: Cleanup
        fs.unlinkSync(filepath);

        return res.status(200).json({
            success: true,
            message: "Thumbnail generated successfully",
            data: thumbnail
        });

    } catch (error: any) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};
//controller for delete the thumbnail
export const DeleteThumbnail = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {userId} = req.session;
        await Thumbnail.findByIdAndDelete({_id:id,userId})
        return res.status(200).json({
            success: true,
            message: "Thumbnail deleted successfully",
        });


    }
    catch (error: any) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
}