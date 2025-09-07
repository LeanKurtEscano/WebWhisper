from PIL import Image
from dotenv import load_dotenv
import easyocr
from google import genai
from fastapi import UploadFile
load_dotenv()

class ReceiptParser:
    def __init__(self, file: UploadFile):
        self.reader = easyocr.Reader(['en'])
        self.model = genai.Client()
        self.file = file
        
    def extract_text(self):
        text = self.reader.readtext(self.file.file, detail=0, paragraph=True)
        raw_text = " ".join([text for (_, text, _) in text])
        return raw_text
    
    
    def extracted_to_json(self):
        
        
        text = self.extract_text()
        
        prompt = f"""
    Extract structured JSON from this receipt text:
    {text}

    JSON format:
    {{
      "vendor": "...",
      "date": "...",
      "items": [
        {{"name": "...", "price": ..., "category":...}}
      ],
      "total": ...
    }}
    """
        response = self.model.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
        )
        
        return response.text
