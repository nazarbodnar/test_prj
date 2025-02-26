const surveyCtx = document.getElementById("surveyChart").getContext("2d");
new Chart(surveyCtx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    datasets: [
      {
        data: [4.5, 2, 2.5, 4.5, 1.5, 4.5, 4.5, 2, 2.5, 4.5, 1.5, 4.5],
        backgroundColor: "#F18C5C",
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Прибираємо заголовок "Scores"
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            family: "Inter",
            size: 12,
            color: "#616E85",
          },
        },
      },
      y: {
        beginAtZero: false,
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1, // Шкала 1,2,3,4,5
          font: {
            family: "Inter",
            size: 12,
            color: "#616E85",
          },
        },
        grid: {
          color: "#EFF2F5", // Горизонтальна сітка
          drawBorder: false,
        },
      },
    },
    barThickness: 15, // Фіксована ширина стовпчика
    categoryPercentage: 0.5, // Простір між стовпчиками
    barPercentage: 1, // Контроль відстані між стовпчиками
  },
});

const kpCtx = document.getElementById("kpChart").getContext("2d");
new Chart(kpCtx, {
  type: "bar",
  data: {
    labels: ["KP 1", "KP 2", "KP 3", "KP 4", "KP 5"],
    datasets: [
      {
        data: [90, 70, 25, 65, 25],
        backgroundColor: [
          "#5155C3",
          "#597DBE",
          "#5F99BB",
          "#65B8B7",
          "#6CDDB1",
        ],
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Inter",
            size: 12,
          },
          color: "#616E85",
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          font: {
            family: "Inter",
            size: 12,
          },
          color: "#616E85",
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          color: "#EFF2F5",
          drawBorder: false,
        },
      },
    },
    barThickness: 76,
    categoryPercentage: 0.6,
    barPercentage: 1,
  },
});
