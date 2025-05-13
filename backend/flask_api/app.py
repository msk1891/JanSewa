from flask import Flask, request, jsonify
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Disable GPU
import tensorflow as tf

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for React Native

# Load pre-trained model
model = load_model("pole_damage_model.h5")

# Image processing parameters
image_size = (100, 100)

# Ensure uploads folder exists
upload_folder = './uploads'
os.makedirs(upload_folder, exist_ok=True)

@app.route('/predict', methods=['POST'])
def predict():
    # Check if a file is provided in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    # Get file from request
    file = request.files['file']
    
    # Save file to the 'uploads' folder
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)
    
    # Load and preprocess the image
    img = image.load_img(file_path, target_size=image_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    
    # Predict damage
    prediction = model.predict(img_array)
    result = "Undamaged" if prediction[0] > 0.5 else "Damaged"
    
    # Return the prediction result
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
