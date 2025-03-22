import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
from datetime import datetime
from io import StringIO
from sklearn.preprocessing import LabelEncoder

# Configure logging
logging.basicConfig(
    filename='flask_app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)

app = Flask(__name__)
CORS(app)  # Enable CORS so your React app can communicate

# Ensure directories exist
os.makedirs('src/input', exist_ok=True)
os.makedirs('src/output', exist_ok=True)

# Load model and scaler (adjust paths as needed)
try:
    model = joblib.load('src/weight/xgb_model.pkl')
    scaler = joblib.load('src/weight/scaler_sota.pkl')
    logging.info("Model and scaler loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model/scaler: {e}")

def json_to_csv_dataframe(json_data):
    """
    Converts JSON data to a CSV DataFrame and saves it.
    """
    try:
        df = pd.DataFrame(json_data)
        # Save CSV to disk in src/input with timestamp
        input_csv_path = f"src/input/input_converted_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        df.to_csv(input_csv_path, index=False)
        logging.info(f"JSON converted to CSV and saved at {input_csv_path}")
        return df, input_csv_path
    except Exception as e:
        logging.error(f"Error converting JSON to CSV: {e}")
        raise

def preprocess_dataframe(df):
    """
    Preprocess the DataFrame to match the training pipeline.
    Extracts time features, imputes missing values, encodes categoricals.
    """
    try:
        # Process 'transaction_date' if available
        if 'transaction_date' in df.columns:
            df['transaction_date'] = pd.to_datetime(df['transaction_date'], errors='coerce')
            df['year']  = df['transaction_date'].dt.year
            df['month'] = df['transaction_date'].dt.month
            df['day']   = df['transaction_date'].dt.day
            df['hour']  = df['transaction_date'].dt.hour
            df.drop(columns=['transaction_date'], inplace=True)
        
        expected_features = [
            'transaction_amount',
            'transaction_channel',
            'transaction_payment_mode_anonymous',
            'payment_gateway_bank_anonymous',
            'payer_browser_anonymous',
            'payer_email_anonymous',
            'payee_ip_anonymous',
            'payer_mobile_anonymous',
            'year',
            'month',
            'day',
            'hour'
        ]
        
        # Ensure expected features exist; add as NaN if missing
        for col in expected_features:
            if col not in df.columns:
                df[col] = np.nan
        
        # Impute missing values
        for col in expected_features:
            if df[col].dtype == 'object':
                df[col] = df[col].fillna('missing')
            else:
                df[col] = df[col].fillna(df[col].mean())
        
        # Encode categorical features
        categorical_cols = df[expected_features].select_dtypes(include=['object']).columns
        for col in categorical_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
        
        logging.info("Preprocessing completed successfully.")
        return df, expected_features
    except Exception as e:
        logging.error(f"Error in preprocessing: {e}")
        raise

def run_inference(df, expected_features):
    """
    Scales the data, runs model prediction, and appends results.
    """
    try:
        # Scale the features
        X_input = scaler.transform(df[expected_features])
        # Predict probabilities (assuming class 1 is fraud)
        fraud_probs = model.predict_proba(X_input)[:, 1]
        
        # Append scores to the DataFrame
        df['fraud_score'] = fraud_probs
        df['confidence_score'] = 1 - fraud_probs
        df['is_fraud_predicted'] = fraud_probs >= 0.5
        
        logging.info("Inference completed successfully.")
        return df
    except Exception as e:
        logging.error(f"Error during inference: {e}")
        raise

@app.route('/analyze-json', methods=['POST'])
def analyze_json():
    try:
        json_data = request.json.get('data')
        if not json_data:
            logging.error("No data provided in JSON.")
            return jsonify({"error": "No data provided"}), 400
        
        # Step 1: Convert JSON to CSV and save file
        df_csv, input_csv_path = json_to_csv_dataframe(json_data)
        
        # Step 2: Preprocess the CSV DataFrame
        df_processed, expected_features = preprocess_dataframe(df_csv)
        
        # Step 3: Run Inference
        df_results = run_inference(df_processed, expected_features)
        
        # Step 4: Save the output CSV with predictions
        output_csv_path = f"src/output/output_with_predictions_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        df_results.to_csv(output_csv_path, index=False)
        logging.info(f"Output CSV saved at {output_csv_path}")
        
        # Return file paths and results summary
        return jsonify({
            "input_csv": input_csv_path,
            "output_csv": output_csv_path,
            "results": df_results.to_dict(orient='records')
        })
    except Exception as e:
        logging.error(f"Error in /analyze-json endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        file = request.files.get('file')
        if not file:
            logging.error("No file uploaded.")
            return jsonify({"error": "No file uploaded"}), 400
        
        # Read file content as JSON
        try:
            data = pd.read_json(file)
        except Exception as ex:
            logging.error(f"Error reading JSON file: {ex}")
            return jsonify({"error": "Invalid JSON file"}), 400
        
        # Convert DataFrame to CSV in memory (simulate conversion)
        csv_buffer = StringIO()
        data.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        df_csv = pd.read_csv(csv_buffer)
        
        # Preprocess the DataFrame
        df_processed, expected_features = preprocess_dataframe(df_csv)
        # Run inference
        df_results = run_inference(df_processed, expected_features)
        
        # Save output CSV
        output_csv_path = f"src/output/output_with_predictions_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        df_results.to_csv(output_csv_path, index=False)
        logging.info(f"Output CSV saved at {output_csv_path}")
        
        return jsonify({
            "input_csv": "File upload processed",  # Not saving file for input here\n            "output_csv": output_csv_path,
            "results": df_results.to_dict(orient='records')
        })
    except Exception as e:
        logging.error(f"Error in /upload endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
