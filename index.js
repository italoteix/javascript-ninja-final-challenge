(function($) {
  "use strict";

  var app = (function() {
    return {
      init: function init() {
        this.companyInfo();
        this.getCars();
        this.initEvents();
      },
      initEvents: function initEvents() {
        $('[data-js="form-register"]').on("submit", this.handleSubmit);
      },
      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        app.saveCar(app.getFormData());
        app.getCars();
      },
      getFormData: function getFormData() {
        var data = {
          image: $("#image").get().value,
          brand: $("#brand").get().value,
          year: $("#year").get().value,
          plate: $("#plate").get().value,
          color: $("#color").get().value
        };
        return data;
      },
      createNewCar: function createNewCar(data) {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement("tr");
        var $tdImage = document.createElement("td");
        var $image = document.createElement("img");
        var $tdBrand = document.createElement("td");
        var $tdYear = document.createElement("td");
        var $tdPlate = document.createElement("td");
        var $tdColor = document.createElement("td");
        var $tdRemove = document.createElement("td");
        var $remove = document.createElement("button");

        $image.src = data.image;
        $tdImage.appendChild($image);

        $remove.addEventListener("click", this.handleRemove);
        $tdRemove.appendChild($remove);

        $tdBrand.textContent = data.brand;
        $tdYear.textContent = data.year;
        $tdPlate.textContent = data.plate;
        $tdColor.textContent = data.color;
        $remove.textContent = "X";

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove);

        return $fragment.appendChild($tr);
      },
      saveCar: function saveCar(data) {
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/car", true);
        ajax.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        ajax.send(
          "image=" +
            data.image +
            "&" +
            "brand=" +
            data.brand +
            "&" +
            "year=" +
            data.year +
            "&" +
            "plate=" +
            data.plate +
            "&" +
            "color=" +
            data.color
        );
      },
      getCars: function getCars() {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/car", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCarsInfo, false);
      },
      getCarsInfo: function getCarsInfo() {
        if (!app.isReady.call(this)) return;
        var data = JSON.parse(this.responseText);
        var $tableCar = $('[data-js="table-car"]').get();
        data.forEach(function(car) {
          $tableCar.appendChild(app.createNewCar(car));
        });
      },
      handleRemove: function handleRemove(e) {
        e.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.removeChild(e.target.parentElement.parentElement);
      },
      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "company.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCompanyInfo, false);
      },
      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this)) return;
        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },
      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();

  app.init();
})(window.DOM);
