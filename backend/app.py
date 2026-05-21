from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import joblib

model = joblib.load("predict_demand_model.pkl")
app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#JSON structure
class UserInput(BaseModel):
    store: int
    product: int
    category: int
    region: int
    inventory: int
    units_ordered: int
    demand_forecast: int
    price: int
    disc: int
    weather: int
    holiday: int
    competitor_pricing: int
    seasonality: int

@app.post("/predict")
def predict(data: UserInput):

    now = datetime.now()

    features=[[
        data.store,
        data.product,
        data.category,
        data.region,
        data.inventory,
        data.units_ordered,
        data.demand_forecast,
        data.price,
        data.disc,
        data.weather,
        data.holiday,
        data.competitor_pricing,
        data.seasonality,
        now.year,
        now.month,
        now.day,
        now.weekday(),
        1 if data.disc>0 else 0,
        data.price - data.competitor_pricing
    ]]

    prediction = model.predict(features)
    print(float(prediction[0]))

    return{
        "prediction": float(prediction[0])
    }


