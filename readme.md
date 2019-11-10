# Node JS Google Cloud Storage

![](https://img.shields.io/github/stars/Chaisser/node-google-cloud-storage) ![](https://img.shields.io/github/forks/Chaisser/node-google-cloud-storage) ![](https://img.shields.io/github/tag/Chaisser/node-google-cloud-storage) ![](https://img.shields.io/github/release/Chaisser/node-google-cloud-storage) ![](https://img.shields.io/github/issues/Chaisser/node-google-cloud-storage)

### Features & Usage

Create or edit your env. file to adjust Google Cloud Storage API.

- Upload files using Node JS and Express API to Google Cloud Storage
- List files in bucket
- Download file from bucket
- Upload buffer withour saving the file
- Multiple upload supported

##### API Requests

#### List all files
`GET /files` : <http://localhost:3001/files>

#### Download File
`GET /downlad/:fileName` : <http://localhost:3001/download/file>

#### Upload File
`POST /upload` : <http://localhost:3001/upload>

#### Make File Public
`POST /makePublic/:fileName` : <http://localhost:3001/makePublic/file>

### Responses

##### List all files

    {
    "status": "success",
    "totalFiles": 2,
    "items": [
        {
            "name": "1572783488203-433953-972.jpg",
            "size": "3462979",
            "contentType": "image/png"
        },
        {
            "name": "1572783627737-433953-2333.pdf",
            "size": "5151811",
            "contentType": "image/png"
        }
    }

##### Download File

    {
    "status": "success",
    "fileName": "1572783488203-433953-972"
    }

##### Upload File(s)

    {
    "status": "success",
    "message": "2 file(s) uploaded and 0 file(s) not uploaded",
    "uploadedFiles": [
        {
            "fileName": "1573180633948-file2.jpg",
            "fileType": "image/jpeg",
            "fileSize": 119971
        },
        {
            "fileName": "1573180633941-file.jpg",
            "fileType": "image/jpeg",
            "fileSize": 606140
        }
    ],
    "errors": []
    }

##### Make file public

    {
    "status": "success",
    "message": "1573180633948-file.jpg is now public access"
    }
