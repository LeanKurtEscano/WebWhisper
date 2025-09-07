from fastapi import APIRouter,File, UploadFile
from fastapi.responses import JSONResponse
from app.schemas.scrape import ScrapeInsightsRequest
from app.services.ai_models.summarizer import Summarizer 
from app.services.receipt_parser.parser import ReceiptParser

from concurrent.futures import ThreadPoolExecutor
from typing import List

router = APIRouter()

@router.post("/receipts")
async def scrape_insights(request: List[UploadFile] = File(...)):
    with ThreadPoolExecutor(max_workers=4) as executor:
        parsers = list(executor.map(ReceiptParser, request))
        json_results = list(executor.map(lambda p: p.extracted_to_json(), parsers))
        print(json_results)                      
    
    return JSONResponse(status_code=200, content={"message": "Scraping insights..."})