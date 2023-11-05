import React, { useState } from "react";
import "./App.css";
import "boxicons";


// Initial image data
const imagesData = [
  { id: 1, src: "./image/image-11.jpeg" },
  { id: 2, src: "./image/image-2.webp" },
  { id: 3, src: "./image/image-3.webp" },
  { id: 4, src: "./image/image-7.webp" },
  { id: 5, src: "./image/image-5.webp" },
  { id: 6, src: "./image/image-6.webp" },
  { id: 7, src: "./image/image-4.webp" },
  { id: 8, src: "./image/image-8.webp" },
  { id: 9, src: "./image/image-1.webp" },
  { id: 10, src: "./image/image-10.jpeg" },
  { id: 11, src: "./image/image-9.webp" }
];

export default function App() {
  const [images, setImages] = useState(imagesData); // The images state hold imageData
  const [selectedImages, setSelectedImages] = useState([]); // This state use for keep track of selected images .At first its empty array.

  // Function handleDragStart, is for the drag and drop functionality.
  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("imageId", image.id);
  };

  // Function handleDragOver is an event handler for the dragover
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImageId) => {
    const draggedImageId = parseInt(e.dataTransfer.getData("imageId"));
    const newImages = [...images];
    const draggedImageIndex = newImages.findIndex(
      (image) => image.id === draggedImageId
    );
    const targetImageIndex = newImages.findIndex(
      (image) => image.id === targetImageId
    );
    [newImages[draggedImageIndex], newImages[targetImageIndex]] = [
      newImages[targetImageIndex],
      newImages[draggedImageIndex]
    ];
    setImages(newImages);
  };

  // Function onSelectFile to handle selected image uopload in the gallery.
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return { id: Date.now(), src: URL.createObjectURL(file) };
    });
    setImages((previousImages) => [...previousImages, ...imagesArray]);
  };

  // Function SelectOneByOne to select or deselect individual images
  const SelectOneByOne = (e, imageId) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        imageId
      ]);
    } else {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((id) => id !== imageId)
      );
    }
  };

  // Function SelectAll to select or deselect all images
  function SelectAll() {
    if (images.length === selectedImages.length) {
      setSelectedImages([]);
    } else {
      const postid = images.map((item) => {
        return item.id;
      });
      setSelectedImages(postid);
    }
  }

  // Function deleteSelectedImages to delete the selected images
  const deleteSelectedImages = () => {
    const remainingImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

  return (
    <div className="App">
      <div className="topbar">
        <div className="nav">Gallery</div>
        <div className="totalimage">{images.length} Images</div>{/*totalimage class Count Total Images present in gallery*/}

        {/*Checkboxnavber class will only show when click on checkbox*/}
        {selectedImages.length > 0 && (
          <div className="Checkboxnavber">
            <p> 
              <box-icon
                id="box"
                color="blue"
                margin-top="410px"
                type="solid"
                name="select-multiple"
              ></box-icon>
              {selectedImages.length} File Selected
            </p>
            {/*Count number fo Selected image*/}
            <div>{/*This div maintains the space between the selected image and  counter the button (Select All,File Selected)*/}
              
              {/*The Select All button will select and deselect all images present in the gallery with one click
              Given two different id of buttons to separate them from designing in CSS*/}
              <button id="SelectAll" type="button" onClick={SelectAll}>
                {images.length === selectedImages.length
                  ? "Unselect All"
                  : "Select All"}
              </button>
              {/*The delete button will delete Selected Images from gallery*/}
              <button id="delete" onClick={deleteSelectedImages}>
                Delete file
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="image-grid">
        
        {/*displaying the images include The feature visually distinct from the other images.*/}
        {images.map((image) => (
          <div
            key={image.id}
            className="image-container"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, image)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, image.id)}
          >
            <img src={typeof image === "object" ? image.src : image} alt="" />
            {/*This checkbox selecting individual images*/}
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={(e) => SelectOneByOne(e, image.id)}
            />
            <div className="overlay"></div>{" "}
            {/*This overlay" is added for styling image hover*/}
          </div>
        ))}
        {/*This input for Upload images in gallery*/}
        <label>
          + Add Images
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            accept="image/png, image/jpeg, image/webp"
          />
        </label>
      </div>
    </div>
  );
}
