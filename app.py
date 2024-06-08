from flask import Flask, render_template, request, jsonify
import pickle
import time
from dotenv import load_dotenv
import re
import os
from threading import Thread
from sentiment_analysis import process_data_and_train_model
import platform

if platform.system() != 'Windows':
    import fcntl

load_dotenv()

app = Flask(__name__)
app.static_folder = 'public'

# Load the model
def load_model(selected_modal_name):
    if selected_modal_name:
        modal_name_to_predict = selected_modal_name
    else:
        modal_name_to_predict = "twitter_sentiment_Capstone_3_largeData"
    model_path = os.path.join('Modal', modal_name_to_predict + '.pkl')
    return pickle.load(open(model_path, 'rb'))

selected_modal_name_from_user = None

app.config['UPLOAD_FOLDER'] = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}
 
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/updateprogress', methods=['POST'])
def update_progress():
    processContent = ""
    print(modal_name_to_open)
    try:
        with open(modal_name_to_open + '.txt', 'r') as file:
            # Read the entire contents of the file
            contents = file.read()
            processContent = contents
    except FileNotFoundError:
        processContent = "Working..."
    
    if processContent == "":
        processContent = "Starting the process..."
    
    return jsonify({'processContent': processContent})


def load_model(selected_modal_name):
    if selected_modal_name:
        modal_name_to_predict = selected_modal_name
    else:
        modal_name_to_predict = "twitter_sentiment_Capstone_3_largeData"
    model_path = os.path.join('Modal', modal_name_to_predict + '.pkl')
    return pickle.load(open(model_path, 'rb'))

selected_modal_name_from_user = None

@app.route('/predict_tweets', methods=['GET', 'POST'])
def predict_tweets():
    global selected_modal_name_from_user
    
    if request.method == 'POST':
        tweet = request.form.get('tweet')
        selected_modal_name_from_user = request.form.get('selectedModalName')
        
        tweet = tweet.strip()
        tweet = re.sub(r'\W', ' ', tweet)
        
        if not tweet:
            return jsonify({'error': 'Please enter a tweet'}), 400

        try:
            start = time.time()
            model = load_model(selected_modal_name_from_user)   
            prediction = model.predict([tweet])
            end = time.time()
            prediction_time = round(end - start, 2)
            return jsonify({'prediction': prediction[0], 'prediction_time': prediction_time})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    files = os.listdir('Modal/')
    return render_template('predict_tweets.html', files=files)


@app.route('/generate_pkl', methods=['POST', 'GET'])
def generate_pkl():
    global modal_name_to_open
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        modal_name = request.form['modalName']
        modal_name_to_open = modal_name
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Check file size (less than 11MB)
        if file.content_length > 11000000:
            return jsonify({'error': 'File size should be below 11MB only'}), 400

        # Ensure the file is allowed and proceed with saving
        if file and allowed_file(file.filename):
            upload_folder = app.config.get('UPLOAD_FOLDER', None)
            if upload_folder is None:
                return jsonify({'error': 'UPLOAD_FOLDER is not configured'}), 500
            
            original_filename = file.filename
            sanitized_filename = re.sub(r'[^\w]', '', original_filename)
            modal_file_name_csv = f"{modal_name}_{len([f for f in os.listdir(upload_folder) if f.startswith(modal_name)]) + 1}_{sanitized_filename}.csv"
            file_path = os.path.join(upload_folder, modal_file_name_csv)
            
            file.save(file_path)
            
            # Start a thread to process the uploaded file
            process_thread = Thread(target=process_data_and_train_model, args=(file_path, modal_name))
            process_thread.start()

            return jsonify({'success': 'File uploaded successfully', 'file_path': file_path}), 200

        return jsonify({'error': 'File upload failed'}), 500

    return render_template('generate_pkl.html')


# if __name__ == '__main__':
#     app.run(debug=True)
    
if __name__ == '__main__':
    app.run()


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)