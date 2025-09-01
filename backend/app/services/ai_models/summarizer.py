from concurrent.futures import ThreadPoolExecutor

class Summarizer:
    
    def __init__(self,max_workers=4):
        self.model = ""
        self.max_workers = max_workers
        
        
    def summarize_chunk(self,text: str) -> str:
        
        summarize_text = []
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            future = executor.submit()
            return f"Summary of: {future.result()}"
