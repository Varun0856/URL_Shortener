import { nanoid } from "nanoid";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Url from "../models/url.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { urlValidator } from "../utils/UrlValidator.js";

const shortenUrl = asyncHandler(async (req, res) => {
    const { originalUrl, customAlias } = req.body;
    if(!originalUrl) {
        throw new ApiError(400, "Original Url is required");
    };

    if(!urlValidator(originalUrl)){
        throw new ApiError(400, "Invalid URL format");
    };

    let shortId;
    if(customAlias){
        if(!/^[a-zA-z0-9]{3,8}$/.test(customAlias)){
            throw new ApiError(400, "Custom Alias must be 3 - 8 alphanumeric characters");
        }
        const existingUrl = await Url.findOne({shortId: customAlias});
        if(existingUrl) {
            throw new ApiError(409, "Custom Alias is already taken");
        };
        shortId = customAlias;
    } else {
        shortId = nanoid(8);
    }
    const newUrl = await Url.create({
        originalUrl,
        shortId,
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) 
    })
    return res.status(201).json(
        new ApiResponse(201, newUrl, "shortId created successfully")
    )
});

const redirectToOriginalUrl = asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const urlDocs = await Url.findOne({shortId});
    if(!urlDocs) {
        throw new ApiError(404, 'Original Url for the shortId was not found');
    }

    if(urlDocs.isExpired()){
        throw new ApiError(410, 'shortId for the URL is expired');
    }
    await urlDocs.incrementClicks(); // custom method 

    res.redirect(urlDocs.originalUrl);
})

const getAnalytics = asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const urlDocs = await Url.findOne({shortId: shortId});
    if(!urlDocs){
        throw new ApiError(404, "Original Url for the shortId was not found");
    }
    const analytics = {
        originalUrl: urlDocs.originalUrl,
        shortId: urlDocs.shortId,
        clicks: urlDocs.clicks,
        createdAt: urlDocs.createdAt,
        lastUsed: urlDocs.updatedAt,
        expiresAt: urlDocs.expiresAt
    }

    res.status(200).json(
        new ApiResponse(200, analytics, "Analytics retrieved successfully")
    )
})

export {shortenUrl, redirectToOriginalUrl, getAnalytics};
