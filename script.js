const chart = document.querySelector(".chart");

const xhr = new XMLHttpRequest();

xhr.open("GET", "data.json", true);

xhr.onload = function (e) {
  const data = JSON.parse(e.target.responseText);
  const highest = data.reduce((prev, cur) =>
    cur.amount > prev.amount ? cur : prev
  );

  data.forEach(({ amount, day }) => {
    const hight = (amount / highest.amount) * 100;
    chart.insertAdjacentHTML(
      "beforeend",
      `
            <div class="bar-group">
            <div data-percent="${amount}" class="bar ${
              day === highest.day ? "important" : ""
            }" style="height: ${hight}%;"></div>

            <small class="bar-name">${day}</small>
            </div>
        `
    );
  });
};


xhr.send();
