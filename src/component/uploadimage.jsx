import React, { useState } from 'react'
import './uploadimage.css'

function UploadImage() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })
  const [uploadedImages, setUploadedImages] = useState([])
  const [error, setError] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const API_BASE_URL = 'https://ngw9h44230.execute-api.ap-south-1.amazonaws.com/production'

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // Validate all files are images
      const invalidFiles = files.filter(file => !file.type.startsWith('image/'))
      if (invalidFiles.length > 0) {
        setError('Please select only image files')
        return
      }
      
      // Add new files to existing selection
      setSelectedFiles(prev => [...prev, ...files])
      setError(null)
      
      // Create previews for all files
      const previewPromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              file: file,
              preview: reader.result,
              name: file.name
            })
          }
          reader.readAsDataURL(file)
        })
      })
      
      Promise.all(previewPromises).then(newPreviews => {
        setPreviews(prev => [...prev, ...newPreviews])
      })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...imageFiles])
      setError(null)
      
      // Create previews for dropped files
      const previewPromises = imageFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              file: file,
              preview: reader.result,
              name: file.name
            })
          }
          reader.readAsDataURL(file)
        })
      })
      
      Promise.all(previewPromises).then(newPreviews => {
        setPreviews(prev => [...prev, ...newPreviews])
      })
    } else {
      setError('Please drop image files')
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image first')
      return
    }

    setUploading(true)
    setError(null)
    setUploadProgress({ current: 0, total: selectedFiles.length })
    const uploadedUrls = []

    try {
      // Loop through each file and upload one by one
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        setUploadProgress({ current: i + 1, total: selectedFiles.length })

        // Step 1: Get signed URL
        const fileName = file.name
        const fileType = file.type

        const response = await fetch(`${API_BASE_URL}/generate-signed-url`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: fileName,
            fileType: fileType,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to generate signed URL for ${fileName}`)
        }

        const data = await response.json()

        if (!data.success || !data.signedUrl) {
          throw new Error(`Invalid response from server for ${fileName}`)
        }

        // Step 2: Upload file to signed URL using PUT
        const uploadResponse = await fetch(data.signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType,
          },
          body: file,
        })

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${fileName}`)
        }

        // Step 3: Save the image URL locally
        uploadedUrls.push({
          url: data.fileUrl,
          fileName: fileName,
          fileType: fileType
        })
      }

      // Save all uploaded URLs to state
      setUploadedImages(uploadedUrls)
      setError(null)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload images. Please try again.')
      // Keep any successfully uploaded images
      if (uploadedUrls.length > 0) {
        setUploadedImages(uploadedUrls)
      }
    } finally {
      setUploading(false)
      setUploadProgress({ current: 0, total: 0 })
    }
  }

  const handleCopyUrl = (url, index) => {
    if (url) {
      navigator.clipboard.writeText(url)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
  }

  const handleReset = () => {
    setSelectedFiles([])
    setPreviews([])
    setUploadedImages([])
    setError(null)
    setCopiedIndex(null)
    setUploadProgress({ current: 0, total: 0 })
  }

  return (
    <div className="upload-image-container">
      <div className="upload-image-wrapper">
        <div className="upload-image-card">
          <h1 className="upload-image-title">
            Image Upload
          </h1>
          <p className="upload-image-subtitle">
            Upload multiple images and get shareable URLs
          </p>

          {uploadedImages.length === 0 ? (
            <>
              {/* File Selection Area */}
              <div
                className="file-drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="file-input"
                />
                
                {previews.length > 0 ? (
                  <div className="preview-grid">
                    {previews.map((previewItem, index) => (
                      <div key={index} className="preview-item">
                        <img
                          src={previewItem.preview}
                          alt={`Preview ${index + 1}`}
                          className="preview-image"
                        />
                        <p className="preview-filename">
                          {previewItem.name}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFile(index)
                          }}
                          className="remove-file-btn"
                          disabled={uploading}
                        >
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {/* Add More Images Button */}
                    <div
                      className="preview-item add-more-item"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById('file-input').click()
                      }}
                    >
                      <div className="add-more-icon">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <p className="add-more-text">Add More</p>
                    </div>
                  </div>
                ) : (
                  <div className="drop-zone-content">
                    <div className="drop-zone-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="drop-zone-text">
                        Click to select or drag and drop
                      </p>
                      <p className="drop-zone-hint">
                        PNG, JPG, GIF up to 10MB (Multiple files supported)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && uploadProgress.total > 0 && (
                <div className="upload-progress">
                  <p className="upload-progress-text">
                    Uploading {uploadProgress.current} of {uploadProgress.total} images...
                  </p>
                  <div className="upload-progress-bar">
                    <div
                      className="upload-progress-fill"
                      style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              {selectedFiles.length > 0 && (
                <div className="button-container">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="upload-btn"
                  >
                    {uploading ? (
                      <>
                        <svg
                          className="spinner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        Upload {selectedFiles.length} Image{selectedFiles.length !== 1 ? 's' : ''}
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={uploading}
                    className="reset-btn"
                  >
                    Reset
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="success-state">
              <div className="success-header">
                <div className="success-icon-container">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="success-title">
                  Upload Successful!
                </h2>
                <p className="success-message">
                  {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''} uploaded successfully
                </p>
              </div>

              {/* Uploaded Images List */}
              <div className="uploaded-images-list">
                {uploadedImages.map((imageData, index) => (
                  <div key={index} className="uploaded-image-item">
                    {/* Image Display */}
                    <div className="uploaded-image-container">
                      <img
                        src={imageData.url}
                        alt={`Uploaded ${index + 1}`}
                        className="uploaded-image"
                      />
                    </div>

                    {/* URL Display */}
                    <div className="url-section">
                      <label className="url-label">
                        Image {index + 1} URL ({imageData.fileName}):
                      </label>
                      <div className="url-input-container">
                        <input
                          type="text"
                          value={imageData.url}
                          readOnly
                          className="url-input"
                        />
                        <button
                          onClick={() => handleCopyUrl(imageData.url, index)}
                          className="copy-btn"
                        >
                          {copiedIndex === index ? (
                            <>
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Another Button */}
              <div>
                <button
                  onClick={handleReset}
                  className="upload-another-btn"
                >
                  Upload More Images
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImage