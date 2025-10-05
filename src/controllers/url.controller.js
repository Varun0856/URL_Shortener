import { nanoid } from "nanoid";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Url from "../models/url.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const shortenUrl = asyncHandler(async (req, res) => {
    const {originalUrl} = req.body;
    if(!originalUrl) {
        throw new ApiError(400, "Original Url is required");
    };
    const shortId = nanoid(8);
    const newUrl = await Url.create({
        originalUrl, shortId
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

    res.redirect(urlDocs.originalUrl);
})

export {shortenUrl, redirectToOriginalUrl};
