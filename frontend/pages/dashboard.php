<?php
    include 'db.php';

    //overall data
    $sql_landing_data = "SELECT SUM(demand_forecast) AS total_forecast, SUM(units_sold) AS total_sold, SUM(units_ordered) as total_ordered FROM orders";
    $result = $conn->query($sql_landing_data);
    $data = $result->fetch_assoc();

    //rank by demand_forecast
    $sql_rank = "
        SELECT store_id, SUM(demand_forecast) AS total_forecast
        FROM orders 
        GROUP BY store_id
        ORDER BY total_forecast DESC
    ";
    $result_rank = $conn->query($sql_rank);

    //rank by product_categories
    $sql_rank2="
    SELECT category, SUM(demand_forecast) AS total_forecast 
    FROM orders 
    GROUP BY category 
    ORDER BY total_forecast DESC;
    ";

    $result_rank2 = $conn->query($sql_rank2);

    //rank by region
    $sql_filter = "
        SELECT region, SUM(demand_forecast) AS total_forecast
        FROM orders 
        GROUP BY region
        ORDER BY total_forecast DESC
    ";
    $result_rank3 = $conn->query($sql_filter);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Predict Demand</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <header>
        <h1 style="color: rgb(32, 4, 244);">StockSense</h1>
        <p style=" color: rgb(141, 139, 139);">Inventory intelligence for retail demanding forecast</p>
        <nav>
            <a href="dashboard.php" class="nav-active">Dashboard</a>
            <a href="predict.html">Predict</a>
            <a href="results.html">Results</a>
        </nav>
        <hr>  
    <header>

    <section id="landing-data">
        <div class="container-dashboard">
            <h2>Total forecast demand</h2>
            <h1><?= number_format($data['total_forecast'])?></h1>
        </div>
        <div class="container-dashboard">
            <h2>Total units sold</h2>
            <h1><?= number_format($data['total_sold'])?></h1>
        </div>
        <div class="container-dashboard">
            <h2>Total units ordered</h2>
            <h1><?= number_format($data['total_ordered'])?></h1>
        </div>
    </section>
    
    <section id="rank">
        <div class="rank-column">
            <h1>Top stores by total demand forecast</h1>
            <?php while($row——1 = $result_rank->fetch_assoc()) : ?>
                <?php $width = $row——1['total_forecast']/$data['total_forecast']*100?>
                <div class="store-rank">
                    <h2><?= $row——1['store_id'] ?></h2>
                    <div class="store-rank-container">
                        <div class="store-rank-bar" style="width: <?= $width?>%;">
                            <h2 style="color: white;"><?= number_format($width,2) ?>%</h2>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <div class="rank-column">
            <h1>Top product demand by categories</h1>
            <?php while($row——2 = $result_rank2->fetch_assoc()): ?>
                <?php $width = $row——2['total_forecast']/$data['total_forecast']*100 ?>
                <div class="store-rank">
                    <h2><?= $row——2['category'] ?></h2>
                    <div class="store-rank-container">
                        <div class="store-rank-bar" style="width: <?= $width?>%;">
                            <h2 style="color: white;"><?= number_format($width,2) ?>%</h2>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <div class="rank-column">
            <h1>Top product demand by region</h1>
            <?php while($row——2 = $result_rank3->fetch_assoc()): ?>
                <?php $width = $row——2['total_forecast']/$data['total_forecast']*100 ?>
                <div class="store-rank">
                    <h2><?= $row——2['region'] ?></h2>
                    <div class="store-rank-container">
                        <div class="store-rank-bar" style="width: <?= $width?>%;">
                            <h2 style="color: white;"><?= number_format($width,2) ?>%</h2>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="../script.js"></script>
</body>
</html>