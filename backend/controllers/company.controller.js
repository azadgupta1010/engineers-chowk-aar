/*
import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        };
        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "You can't add same company.",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) return res.status(404).json({ message: "company not found", success: false });
        return res.status(200).json({ companies });
    } catch (error) {
        console.log(error);
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) return res.status(404).json({ message: "Company not found!", success: false });
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompanyInformation = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        const updateData = { name, description, website, location , logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({ message: "Company not found!", success: false });
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating company information.",
            success: false
        });
    }
}
*/
import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        };

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "You can't add the same company.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error in registerCompany: ", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Get all companies for a user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({ message: "No companies found", success: false });
        }

        return res.status(200).json({ companies, success: true });
    } catch (error) {
        console.error("Error in getCompany: ", error);
        return res.status(500).json({ message: "Failed to fetch companies", success: false });
    }
};

// Get a specific company by its ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: "Company not found!", success: false });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error("Error in getCompanyById: ", error);
        return res.status(500).json({ message: "An error occurred", success: false });
    }
};

// Update company information (including logo)
export const updateCompanyInformation = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        // Check if a file was uploaded
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            const logo = cloudResponse.secure_url;

            const updateData = { name, description, website, location, logo };

            const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

            if (!company) {
                return res.status(404).json({ message: "Company not found!", success: false });
            }

            return res.status(200).json({
                message: "Company information updated.",
                success: true
            });
        } else {
            return res.status(400).json({
                message: "Logo file is required.",
                success: false
            });
        }
    } catch (error) {
        console.error("Error in updateCompanyInformation: ", error);
        return res.status(500).json({
            message: "An error occurred while updating company information.",
            success: false
        });
    }
};
