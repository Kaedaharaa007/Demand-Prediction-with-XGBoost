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

        const result = await fetchPrediction(data)
        addPredictionResults(product,store,category,inventory,units_ordered,price,disc,holiday_or_promotion,Math.ceil(result.prediction).toFixed(0),result.stock_ratio.toFixed(2),result.status)

    })

}

async function fetchPrediction(data){
    const res = await axios.post(
            "http://127.0.0.1:8000/predict",
            data
        )
        
    console.log(res.data)
    
    document.getElementById("result_prediction").innerText = "Units Sold Prediciton: " + Math.ceil(res.data.prediction).toFixed(0)
    document.getElementById("stock_ratio").classList.remove(
        "RED","GREEN","ORANGE"
    )

    if(res.data.status == "Overstock") document.getElementById("stock_ratio").classList.add("ORANGE")
    else if(res.data.status == "Understock") document.getElementById("stock_ratio").classList.add("RED")
    else if(res.data.status == "Balance") document.getElementById("stock_ratio").classList.add("GREEN")

    document.getElementById("stock_ratio").innerText = res.data.status

    return res.data
}

function addPredictionResults(product,store,category,inventory,units_ordered,price,disc,holiday_or_promotion,prediction,stock_ratio,status){

    const history = JSON.parse(localStorage.getItem("predictions")) || []

    const record = {
        product_id: product,
        store_id: store,
        product_category: category,
        inventory_level: inventory,

        units_ordered: units_ordered,
        price: price,
        discount: disc,
        holiday_promotion: holiday_or_promotion,

        predicted_demand: prediction,
        stock_ratio: stock_ratio,
        status: status,
    }

    history.push(record)
    localStorage.setItem("predictions",JSON.stringify(history))

    console.log("Saved to predictions " + record)
}
window.addEventListener("DOMContentLoaded", updateUI);
function updateUI(){
    const history = JSON.parse(localStorage.getItem("predictions")) || []

    const table = document.getElementById("table")
    //prevent another pages, only for results
    if(!table) return
    if(history[0]==null){
        table.innerHTML = "No predictions yet"
        return
    }
    
    table.innerHTML = ""
    history.forEach(h =>{

        //store_id
        if(h.store_id==0) h.store_id="S001"
        else if(h.store_id==1) h.store_id="S002"
        else if(h.store_id==2) h.store_id="S003"
        else if(h.store_id==3) h.store_id="S004"
        else if(h.store_id==4) h.store_id="S005"

        //product_id
        if(h.product_id==0) h.product_id="P0001"
        else if(h.product_id==1) h.product_id="P0002"
        else if(h.product_id==2) h.product_id="P0003"
        else if(h.product_id==3) h.product_id="P0004"
        else if(h.product_id==4) h.product_id="P0005"
        else if(h.product_id==5) h.product_id="P0006"
        else if(h.product_id==6) h.product_id="P0007"
        else if(h.product_id==7) h.product_id="P0008"
        else if(h.product_id==8) h.product_id="P0009"
        else if(h.product_id==9) h.product_id="P00010"
        else if(h.product_id==10) h.product_id="P00011"
        else if(h.product_id==11) h.product_id="P00012"
        else if(h.product_id==12) h.product_id="P00013"
        else if(h.product_id==13) h.product_id="P00014"
        else if(h.product_id==14) h.product_id="P00015"
        else if(h.product_id==15) h.product_id="P00016"
        else if(h.product_id==16) h.product_id="P00017"
        else if(h.product_id==17) h.product_id="P00018"
        else if(h.product_id==18) h.product_id="P00019"
        else if(h.product_id==19) h.product_id="P00020"

        //category
        if(h.product_category==0) h.product_category="Clothing"
        else if(h.product_category==1) h.product_category="Electronics"
        else if(h.product_category==2) h.product_category="Furniture"
        else if(h.product_category==3) h.product_category="Groceries"
        else if(h.product_category==4) h.product_category="Toys"

        table.innerHTML+=
        `
            <tr>
                <td>${h.product_id}</td>
                <td>${h.store_id}</td>
                <td>${h.product_category}</td>
                <td>${h.inventory_level}</td>
                <td>${h.units_ordered}</td>
                <td>${h.price}</td>
                <td>${h.discount}%</td>
                <td>${h.holiday_promotion}</td>
                <td>${h.predicted_demand}</td>
                <td>${h.stock_ratio}</td>
                <td>${h.status}</td>
            </tr>
        `
    })

}