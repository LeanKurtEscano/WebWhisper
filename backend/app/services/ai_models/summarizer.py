from concurrent.futures import ThreadPoolExecutor
from google import genai
from langchain_ollama import OllamaLLM
from app.services.data.semantic_chunker import Chunking
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from transformers import pipeline
load_dotenv()

class Summarizer:
    
    def __init__(self, max_workers=4):
        self.summarizer_model = genai.Client()
        
        self.model = OllamaLLM(
            model="llama3.2",
        )

        self.max_workers = max_workers
    
    def summarize_chunks(self, text: str) -> str:
        prompt_template = PromptTemplate.from_template( """
        You are a helpful summarization assistant.
        Please summarize the following text clearly,short and concisely,
        focusing on the main points and ignoring redundancies:
        
        {text}
        """
        )
        formatted_prompt = prompt_template.format(text=text)
        response = self.model.invoke(formatted_prompt)
        print(response)
        return response
    
    def get_summary(self, text: str) -> str:
     
        chunks = Chunking.parallel_chunking(text)
        texts = [c["text"] for c in chunks]

        summarize_texts = []
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
           
            results = list(executor.map(self.summarize_chunks, texts))
            summarize_texts.extend(results)
            
        final_prompt = f"""
        You are an expert summarizer.
        Combine the following partial summaries into one clear, 
        coherent, and concise summary:

        {" ".join(summarize_texts)}
        """
        response = self.summarizer_model.models.generate_content(
            model="gemini-2.5-flash", 
            contents=final_prompt
        )
        return response.text
