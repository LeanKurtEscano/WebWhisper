from pydantic import BaseModel

class ScrapeInsightsRequest(BaseModel):
    url: str
