from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

# Configure Gemini AI
genai.configure(api_key="AIzaSyBb7cc6Km8Mbc418Br7BMkpq6MbIZytw28")  # Ensure your API key is set in the environment

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    # Use correct Gemini model
    model = genai.GenerativeModel("gemini-1.5-pro-latest")  # Updated model name

    response = model.generate_content(user_message)  # Pass user message directly

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)
