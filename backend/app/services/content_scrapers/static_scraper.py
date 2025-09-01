
import requests
from bs4 import BeautifulSoup

from services.data.semantic_chunker import Chunking
class WebScraper:
    
    
    def __init__(self, url:str):
        self.url = url
        self.headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/115.0 Safari/537.36"
    )
}
        self.soup = self._get_soup()
    
    def _get_soup(self):
        response = requests.get(self.url, headers=self.headers, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, "html.parser")
    
    def scrape(self) -> str:
        tags_to_extract = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "article"]
        extracted_content = []
        
        for tags in tags_to_extract:
            elements = self.soup.find_all(tags)
            for element in elements:
                extracted_content.append(element.get_text(strip=True))
        return "\n".join(extracted_content)
