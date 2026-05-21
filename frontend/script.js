function submitInput(){
    const form = document.getElementById("form")
    form.addEventListener("submit", async (e)=>{
        e.preventDefault()

        const store = document.getElementById("store").value
        const product = document.getElementById("product").value
        const category = document.getElementById("category").value
        const price = document.getElementById("price").value
        const competitor_pricing = document.getElementById("competitor_pricing").value
        const inventory = document.getElementById("inventory").value
        const units_ordered = document.getElementById("units_ordered").value
        const disc = document.getElementById("disc").value
        const demand_forecast = document.getElementById("demand_forecast").value
        const weather = document.getElementById("weather").value
        const region = document.getElementById("region").value
        const seasonality = document.getElementById("seasonality").value
        const holiday_or_promotion = document.querySelector('input[name="holiday_or_promotion"]:checked').value

        const data = {
            store: Number(store),
            product: Number(product),
            category: Number(category),
            region: Number(region),
            inventory: Number(inventory),
            units_ordered: Number(units_ordered),
            demand_forecast: Number(demand_forecast),
            price: Number(price),
            disc: Number(disc),
            weather: Number(weather),
            holiday: Number(holiday_or_promotion),
            competitor_pricing: Number(competitor_pricing),
            seasonality: Number(seasonality)
        }

        await fetchPrediction(data)
       
    })

}

async function fetchPrediction(data){
     const res = await axios.post(
            "http://127.0.0.1:8000/predict",
            data
        )
        
        console.log(res.data)

        document.getElementById("result_prediction").innerText = "Units Sold Prediciton: " + Math.ceil(res.data.prediction).toFixed(0)
}