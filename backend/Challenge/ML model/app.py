import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from fastapi import FastAPI, File, UploadFile
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from fastapi.responses import JSONResponse
import io
from PIL import Image
from keras.models import model_from_json
from fastapi.middleware.cors import CORSMiddleware


with open("model_architecture.json", "r") as json_file:
    model_json = json_file.read()
    model = model_from_json(model_json)

# Load model weights from HDF5
model.load_weights("attraction_model.h5")

img_height, img_width = 224, 224  # Change this to your model's input size

dataset_path = "CHALLNGE_DATA-SET/"

# Parameters
img_height, img_width = 224, 224  # Consistent size for all images
batch_size = 32

# Data augmentation and normalization
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,  # Split data into training and validation sets
    horizontal_flip=True,
    zoom_range=0.2,
    shear_range=0.2
)

train_generator = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'
)
# Initialize FastAPI app
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# class_indices = {0: 'class1', 1: 'class2', 2: 'class3', 3: 'class4', 4: 'class5', 5: 'class6', 6: 'class7'}
class_indices1 = train_generator.class_indices
class_indices = {v: k for k, v in class_indices1.items()}
# print(class_labels)
def predict_image(img, model):
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    prediction = model.predict(img_array)
    class_idx = np.argmax(prediction, axis=1)[0]
    
    if class_idx in class_indices:
        class_label = class_indices[class_idx]
    else:
        class_label = "Unknown"

    return class_label

# import requests

# url = "http://127.0.0.1:8000/predict/"
# image_path = "/path/to/your/image.jpg"

# with open(image_path, "rb") as img_file:
#     files = {"file": img_file}
#     response = requests.post(url, files=files)
    
# print(response.json())

@app.post("/api/predict/")
async def predict(file: UploadFile = File(...)):
    # Read the image file
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    # print(contents)
    img = img.resize((img_height, img_width))

    # Predict the class
    predicted_class = predict_image(img, model)

    return JSONResponse(content={"predicted_class": predicted_class})

@app.get("/api/test/")
async def test():
    return "Connection is established successfuly!"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5555)