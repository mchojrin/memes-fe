import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { useNavigate } from 'react-router-dom';

function Upload(props) {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const changeHandler = (event) => {
        setError(null);
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleUpload = () => {
        setError(null);
        setLoading(true);
        const formData = new FormData();

        console.log('Uploading the file "' + selectedFile.name + "'");

        formData.append('File', selectedFile);

        axios.post(
            'http://localhost:4000/memes/upload', formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }
        ).then(response => {
            setLoading(false);
            console.log('Upload succesful!');
            navigate('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response) {
                setError("Error found: " + error.response.data.message);
            } else if (error.request) {
                setError(error.request);
            } else {
                setError(error.message);
            }
        });
    }

    return <div>
        <p>Select an image to upload</p>
        <input type="file" name="newImage" id="newImage" onChange={changeHandler} />
        {isFilePicked ? (
            <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
            </div>
        ) : (
            <p>Select a file to show details</p>
        )}
        <input type="button" onClick={handleUpload} value="Upload image" name="upload" />
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
    </div>
}

export default Upload;