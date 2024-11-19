
import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}

export default getDataUri;
/*
import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file input. File must have 'originalname' and 'buffer' properties.");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    if (!extName) {
        throw new Error("File does not have a valid extension.");
    }

    return parser.format(extName, file.buffer);
}

export default getDataUri;
*/
