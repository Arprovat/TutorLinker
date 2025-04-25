const url = `https://api.cloudinary.com/v1_1/dcbfbx8do/auto/upload`;
const UploadFile = async (file) => {

    try {
        const form = new FormData();
        form.append('file', file);
        form.append('upload_preset','Educonnect');

        const response = await fetch(url, {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export default UploadFile;