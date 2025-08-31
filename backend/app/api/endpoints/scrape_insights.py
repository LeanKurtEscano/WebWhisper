from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.schemas.scrape import ScrapeInsightsRequest
router = APIRouter()

@router.post("/insights")
async def scrape_insights(request: ScrapeInsightsRequest):
    url = request.url
    print(url)
    
    return JSONResponse(status_code=200, content={"message": "Scraping insights..."})