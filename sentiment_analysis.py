import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import pickle
from nltk.corpus import stopwords
import re
import time
from sklearn.metrics import accuracy_score


def update_txt_file(file_name, data):
    try:
        # Open the file in append mode if it exists, or create a new one if it doesn't exist
        with open(file_name, 'a+') as file:
            # Move the cursor to the beginning of the file
            file.seek(0)
            # Read the content of the file
            content = file.read()
            # Write the new data along with the existing content
            file.write(data + '\n')  # Adding a newline for separation if needed
    except Exception as e:
        print("Error updating file:", str(e))
    else:
        print("File updated successfully")


def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    text = text.lower() 
    text = re.sub(r'http\S+', '', text)  
    text = re.sub(r'<.*?>', '', text)  
    text = re.sub(r'\W', ' ', text)  
    text = re.sub(r'\s+', ' ', text) 
    text = ' '.join(word for word in text.split() if word not in stop_words)  # Remove stopwords
    
    # Additional data cleaning steps
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = re.sub(r'\b\w{1,2}\b', '', text)  # Remove words with less than or equal to 2 characters
    text = re.sub(r'\s+', ' ', text)  # Remove extra whitespaces
    
    return text


def process_data_and_train_model(dataset_path, model_save_path):
    print("Loading dataset...")
    update_txt_file(model_save_path + '.txt', 'Loading dataset...')
    try:
        # Load the dataset and prepare it
        df = pd.read_csv(dataset_path, header=None, index_col=[0])
        df = df[[2, 3]].reset_index(drop=True)
        df.columns = ['sentiment', 'text']
        df.dropna(inplace=True)
        df = df[df['text'].apply(len) > 1]

        total_texts = len(df)
        print("Total texts:", total_texts , "Positive:", len(df[df['sentiment'] == 4]), "Negative:", len(df[df['sentiment'] == 0]))

        print("Data Cleaning in progress...")
        update_txt_file(model_save_path + '.txt', 'Data Cleaning in progress...')
        start_time = time.time()
        df['text'] = df['text'].apply(preprocess_text)
        print("Data Cleaning completed. Time elapsed:", round(time.time() - start_time, 2), "seconds")

        # Train-test split
        print("Train-test split in progress...")
        update_txt_file(model_save_path + '.txt', 'Train-test split in progress...')
        start_time = time.time()
        X_train, X_test, y_train, y_test = train_test_split(df['text'], df['sentiment'], test_size=0.2, random_state=42)
        print("Train-test split completed. Time elapsed:", round(time.time() - start_time, 2), "seconds")

        # Model building
        print("Model building in progress...")
        update_txt_file(model_save_path + '.txt', 'Model building in progress...')
        start_time = time.time()
        tfidf = TfidfVectorizer(stop_words=list(stopwords.words('english')))
        clf = Pipeline([('tfidf', tfidf), ('clf', RandomForestClassifier(n_estimators=100, n_jobs=-1))])
        clf.fit(X_train, y_train)
        print("Model building completed. Time elapsed:", round(time.time() - start_time, 2), "seconds")

        predictions = clf.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        print(" :", accuracy)
        update_txt_file(model_save_path + '.txt', 'Accuracy: ' + str(accuracy))

        # Save model
        print("Saving model...")
        update_txt_file(model_save_path + '.txt', 'Saving model...')
        pickle.dump(clf, open("Modal/" + model_save_path + ".pkl", 'wb'))
        print("Model saved successfully")
        update_txt_file(model_save_path + '.txt', 'Model saved successfully')

        return model_save_path

    except Exception as e:
        print("Error:", str(e))
        return None