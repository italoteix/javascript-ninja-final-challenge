(function($) {
  "use strict";

  var app = (function() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },
      initEvents: function initEvents() {
        $('[data-js="form-register"]').on("submit", this.handleSubmit);
      },
      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },
      createNewCar: function createNewCar() {
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

        $image.src = $("#image").get().value;
        $tdImage.appendChild($image);

        $remove.addEventListener("click", this.handleRemove);
        $tdRemove.appendChild($remove);

        $tdBrand.textContent = $("#brand").get().value;
        $tdYear.textContent = $("#year").get().value;
        $tdPlate.textContent = $("#plate").get().value;
        $tdColor.textContent = $("#color").get().value;
        $remove.textContent = "X";

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove);

        return $fragment.appendChild($tr);
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
