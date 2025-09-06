from fastapi import APIRouter,File, UploadFile
from fastapi.responses import JSONResponse
from app.schemas.scrape import ScrapeInsightsRequest
from app.services.ai_models.summarizer import Summarizer 
from app.services.content_scrapers.static_scraper import WebScraper
from typing import List

router = APIRouter()

@router.post("/receipts")
async def scrape_insights(request: List[UploadFile] = File(...)):
    for file in request:
        url = file.url
      
    
    return JSONResponse(status_code=200, content={"message": "Scraping insights..."})