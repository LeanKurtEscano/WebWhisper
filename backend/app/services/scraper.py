
import requests
from bs4 import BeautifulSoup
class WebScraper:
    def __init__(self, url:str):
        self.url = url
        self.soup = self._get_soup()
    
    
    def _get_soup(self):
        response = requests.get(self.url, timeout=10)
        response.raise_for_status() 
        return BeautifulSoup(response.text, "html.parser")
    
    def scrape(self) -> str:
        return f"Scraped content from {self.url}"
