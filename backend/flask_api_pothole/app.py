import os
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS

# Set environment variable to use CPU instead of GPU
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Use CPU

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for React Native

# Load pre-trained model (cnn.h5)
model = load_model("cnn.h5")

# Image processing parameters
image_size = (64, 64)  # The input size for your model

# Ensure uploads folder exists
upload_folder = './uploads'
os.makedirs(upload_folder, exist_ok=True)

@app.route('/predict_pothole', methods=['POST'])
def predict_pothole():
    # Check if a file is provided in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    # Get the file from request
    file = request.files['file']

    # Save the file to the uploads folder
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    # Load and preprocess the image
    img = image.load_img(file_path, target_size=image_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Rescale the image

    # Predict pothole
    prediction = model.predict(img_array)
    result = "Pothole" if prediction[0][0] == 1 else "Normal"

    # Return the prediction result
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
