<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Courriers</h4>

            <div class="container p-5">
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Requêtes de fonds</h4>

            <div class="container p-5">
              <canvas id="doughnutChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Chart from 'chart.js/auto';

export default {
  mounted () {
  
    var doughnutPieOptions = {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true
      }
    };

    if ($("#doughnutChart").length) {
      var dataRequestsFund = {
        datasets: [{
          data: [30, 40, 30, 25, 10, 5],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(149, 241, 149, 0.5)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255,99,132,1)',
            'rgba(149, 241, 149, 1)'
          ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Initiées : 30',
          'Conformes : 40',
          'Non conformes : 30',
          'Approuvées : 25',
          'Rejetées : 10',
          'Exécutées : 5'
        ]
      };

      var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
      new Chart(doughnutChartCanvas, {
        type: 'doughnut',
        data: dataRequestsFund,
        options: doughnutPieOptions
      });
    }

    if ($("#pieChart").length) {
      var doughnutPieData = {
        datasets: [{
          data: [30, 40, 30],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255,99,132,1)',
            'rgba(255, 159, 64, 1)'
          ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Reçus : 30',
          'Envoyés : 40',
          'Nouveaux : 30',
        ]
      };

      var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
      new Chart(pieChartCanvas, {
        type: 'pie',
        data: doughnutPieData,
        options: doughnutPieOptions
      });
    }
  }
}
</script>
